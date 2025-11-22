from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import re
from nltk.stem import WordNetLemmatizer
import numpy as np
import pandas as pd
from scipy import sparse
from scipy.sparse import hstack
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import nltk
nltk.download('wordnet')
nltk.download('omw-1.4')
import os

load_dotenv()

# ---------- configuration ----------
MODEL_PATH = os.getenv("MODEL_PATH")
VECTORIZER_PATH = os.getenv("VECTORIZER_PATH")
LE_PATH = os.getenv("LE_PATH")
# ---------- startup / load artifacts ----------
app = FastAPI(title="Emotion Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load artifacts
try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    le = joblib.load(LE_PATH)
except Exception as e:
    # If starting without artifacts, raise a clear error
    raise RuntimeError(f"Failed to load model artifacts: {e}")

lemmatizer = WordNetLemmatizer()

# ---------- preprocessing / feature building (same as training) ----------

def preprocess(s: str) -> str:
    s = str(s).lower()
    s = re.sub(r"http\S+", " ", s)
    s = re.sub(r"@\w+", " ", s)
    s = re.sub(r'(.)\1{2,}', r'\1\1', s)           # soooo -> soo
    # keep emojis in range U0001F600-U0001F64F and keep lowercase letters and spaces
    s = re.sub(r"[^a-z\s\U0001F600-\U0001F64F]", " ", s)
    tokens = s.split()
    tokens = [lemmatizer.lemmatize(t) for t in tokens]
    return " ".join(tokens)


def build_features_from_texts(series):
    # series: iterable of strings
    s = pd.Series(series).fillna("").astype(str)
    df_f = pd.DataFrame()
    df_f["char_len"] = s.str.len()
    df_f["word_count"] = s.str.split().apply(lambda x: len(x) if isinstance(x, list) else 0)
    df_f["exclaim"] = s.str.count("!")
    df_f["question"] = s.str.count(r"\?")
    df_f["upper_ratio"] = s.apply(lambda x: sum(w.isupper() for w in x.split()) / (len(x.split()) + 1))
    return df_f

# ---------- request/response models ----------
class PredictRequest(BaseModel):
    text: str

class PredictResponse(BaseModel):
    label: str
    label_id: int
    probabilities: dict

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        text = req.text
        clean = preprocess(text)
        # TF-IDF
        tfidf_vec = vectorizer.transform([clean])  # sparse
        # extra features
        extra = build_features_from_texts([text])
        extra_sparse = sparse.csr_matrix(extra.values)
        X = hstack([tfidf_vec, extra_sparse])

        # predict
        pred_id = int(model.predict(X)[0])
        # some xgboost objects have predict_proba, others require .predict_proba
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(X)[0]
        else:
            # fallback: likelihood from margin — not ideal but included defensively
            probs = np.zeros(len(le.classes_)).tolist()

        # map to labels
        label = le.inverse_transform([pred_id])[0]
        prob_dict = {str(int(i)): float(probs[i]) for i in range(len(probs))}

        return {
            "label": label,
            "label_id": pred_id,
            "probabilities": prob_dict
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

