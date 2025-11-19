import React, { useState, useEffect } from 'react';
import { 
  Smile, Frown, Zap, AlertCircle, ThumbsDown, 
  Gift, Meh, Sparkles, Activity, MessageCircle,
  Moon, Sun
} from 'lucide-react';

// =========================================================
// 🌠 METEORS COMPONENT
// =========================================================
const Meteors = ({ number = 20 }) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className="pointer-events-none absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor-effect rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={style}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
};

// =========================================================
// 💬 CONFIGURATION & DATA
// =========================================================

const friendlyMessages = {
  happy: [
    "You seem happy — keep shining!",
    "Your joy is contagious — stay blessed!",
    "You sound cheerful — hope your day stays bright!"
  ],
  sad: [
    "You seem sad — don't worry, everything will be alright.",
    "It's okay to feel sad — you're stronger than you think.",
    "Tough times don’t last — you’ve got this."
  ],
  angry: [
    "You seem upset — take a deep breath, it's okay.",
    "Anger happens — try calming your thoughts a bit.",
    "You sound frustrated — it’s okay to pause and reset."
  ],
  fear: [
    "You seem worried — you're stronger than you think.",
    "It's okay to be afraid — you are not alone.",
    "Fear is natural — but you are capable of overcoming it."
  ],
  disgust: [
    "You sound disgusted — it's okay to take a step back.",
    "That reaction shows disgust — breathe, let it pass.",
    "You seem uncomfortable — it's alright, not everything feels pleasant."
  ],
  surprise: [
    "You seem surprised — hope it's a good one!",
    "Wow! That sounded unexpected — hope it’s exciting!",
    "A surprise moment — enjoy the thrill!"
  ],
  neutral: [
    "You sound calm — wishing you peace.",
    "Neutral tone — hope your day goes smoothly!",
    "Steady and balanced — keep going."
  ]
};

// --- Themes (Updated for Dark Mode Support) ---
// Added 'darkColor' to ensure text is visible/vibrant against dark backgrounds
const emotionThemes = {
  happy: {
    color: 'text-yellow-600',
    darkColor: 'text-yellow-400',
    bg: 'bg-yellow-50',
    darkBg: 'bg-yellow-950/30',
    border: 'border-yellow-200',
    darkBorder: 'border-yellow-700/50',
    gradient: 'from-yellow-100 via-orange-50 to-yellow-100',
    button: 'bg-yellow-500 hover:bg-yellow-600',
    icon: Smile
  },
  sad: {
    color: 'text-blue-600',
    darkColor: 'text-blue-400',
    bg: 'bg-blue-50',
    darkBg: 'bg-blue-950/30',
    border: 'border-blue-200',
    darkBorder: 'border-blue-700/50',
    gradient: 'from-blue-100 via-indigo-50 to-blue-200',
    button: 'bg-blue-500 hover:bg-blue-600',
    icon: Frown
  },
  angry: {
    color: 'text-red-600',
    darkColor: 'text-red-400',
    bg: 'bg-red-50',
    darkBg: 'bg-red-950/30',
    border: 'border-red-200',
    darkBorder: 'border-red-700/50',
    gradient: 'from-red-100 via-orange-100 to-red-200',
    button: 'bg-red-600 hover:bg-red-700',
    icon: Zap
  },
  fear: {
    color: 'text-purple-600',
    darkColor: 'text-purple-400',
    bg: 'bg-purple-50',
    darkBg: 'bg-purple-950/30',
    border: 'border-purple-200',
    darkBorder: 'border-purple-700/50',
    gradient: 'from-purple-100 via-indigo-100 to-purple-200',
    button: 'bg-purple-600 hover:bg-purple-700',
    icon: AlertCircle
  },
  disgust: {
    color: 'text-green-600',
    darkColor: 'text-green-400',
    bg: 'bg-green-50',
    darkBg: 'bg-green-950/30',
    border: 'border-green-200',
    darkBorder: 'border-green-700/50',
    gradient: 'from-green-100 via-emerald-100 to-teal-100',
    button: 'bg-green-600 hover:bg-green-700',
    icon: ThumbsDown
  },
  surprise: {
    color: 'text-pink-600',
    darkColor: 'text-pink-400',
    bg: 'bg-pink-50',
    darkBg: 'bg-pink-950/30',
    border: 'border-pink-200',
    darkBorder: 'border-pink-700/50',
    gradient: 'from-pink-100 via-rose-100 to-pink-200',
    button: 'bg-pink-500 hover:bg-pink-600',
    icon: Gift
  },
  neutral: {
    color: 'text-slate-600',
    darkColor: 'text-slate-400',
    bg: 'bg-slate-50',
    darkBg: 'bg-slate-800/30',
    border: 'border-slate-200',
    darkBorder: 'border-slate-700/50',
    gradient: 'from-slate-100 via-gray-50 to-slate-200',
    button: 'bg-slate-700 hover:bg-slate-800',
    icon: Meh
  },
  default: {
    color: 'text-indigo-600',
    darkColor: 'text-indigo-400',
    bg: 'bg-white',
    darkBg: 'bg-slate-900/50',
    border: 'border-gray-200',
    darkBorder: 'border-slate-700',
    gradient: 'from-blue-50 via-white to-indigo-50',
    button: 'bg-indigo-600 hover:bg-indigo-700',
    icon: Sparkles
  }
};

// =========================================================
// 🧠 LOGIC & APP
// =========================================================

function smartDetectEmotion(text) {
  const t = text.toLowerCase().trim();
  const emojiMap = {
    "😀":"happy","😄":"happy","😊":"happy","😃":"happy","🙂":"happy",
    "😢":"sad","😭":"sad","☹️":"sad","🙁":"sad",
    "😡":"angry","🤬":"angry",
    "😱":"fear","😨":"fear","😰":"fear","😥":"fear",
    "😲":"surprise","😮":"surprise",
    "🤢":"disgust","🤮":"disgust",
    "😐":"neutral","😶":"neutral"
  };
  for (const c of t) if (emojiMap[c]) return emojiMap[c];

  const directMap = {
    happy:"happy", joy:"happy", joyful:"happy", excited:"happy", awesome:"happy",
    sad:"sad", upset:"sad", depressed:"sad", lonely:"sad", down:"sad",
    angry:"angry", mad:"angry", furious:"angry", annoyed:"angry",
    fear:"fear", scared:"fear", afraid:"fear", terrified:"fear", nervous:"fear",
    surprise:"surprise", shocked:"surprise", wow:"surprise",
    disgust:"disgust", disgusted:"disgust", gross:"disgust", ew:"disgust",
    ok:"neutral", okay:"neutral", fine:"neutral", normal:"neutral"
  };
  const words = t.split(/\s+/);
  for (const w of words) if (directMap[w]) return directMap[w];

  if (t.includes("i hate") || t.includes("pissed") || t.includes("i'm angry")) return "angry";
  if (t.includes("i can't") || t.includes("worried") || t.includes("anxious")) return "fear";
  if (t.includes("i miss") || t.includes("heartbroken") || t.includes("sad about")) return "sad";
  if (t.includes("omg") || t.includes("no way") || t.includes("wtf")) return "surprise";
  if (t.includes("ew") || t.includes("gross") || t.includes("nasty")) return "disgust";
  if (t.includes("feeling great") || t.includes("i feel good")) return "happy";

  return null;
}

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [currentTheme, setCurrentTheme] = useState('default');
  const [darkMode, setDarkMode] = useState(false);

  // Inject Tailwind script
  useEffect(() => {
    const scriptId = 'tailwind-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  async function handlePredict() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setMessage('');

    // 1. Client-side Check
    const smartEmotion = smartDetectEmotion(text);
    if (smartEmotion) {
      setCurrentTheme(smartEmotion);
      const msgs = friendlyMessages[smartEmotion];
      setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
      setResult({ label: smartEmotion, label_id: -1, probabilities: {} });
      setLoading(false);
      return;
    }

    // 2. Server-side Fallback
    setTimeout(async () => {
      try {
        const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
        const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Prediction failed');
        }

        const data = await res.json();
        const rawLabel = data.label.toLowerCase().trim();

        const mapLabels = {
          happy: "happy", joy:"happy",
          sad:"sad", sadness:"sad",
          angry:"angry", anger:"angry",
          fear:"fear", fearful:"fear",
          surprise:"surprise", surprised:"surprise",
          disgust:"disgust", disgusted:"disgust",
          neutral:"neutral"
        };

        const labelKey = mapLabels[rawLabel] || "neutral";
        setCurrentTheme(labelKey);

        const msgs = friendlyMessages[labelKey];
        const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];

        setMessage(randomMsg);
        setResult(data);

      } catch (e) {
        setError(e.message);
        setCurrentTheme('default');
      } finally {
        setLoading(false);
      }
    }, 700);
  }

  const theme = emotionThemes[currentTheme];
  const IconComponent = theme.icon;

  // Dynamic Styles based on Dark Mode
  const containerClasses = darkMode 
    ? 'bg-slate-950 text-slate-100' // Dark Mode Background
    : `bg-gradient-to-br ${theme.gradient}`; // Light Mode Gradient

  const cardClasses = darkMode
    ? 'bg-slate-900/60 border-slate-700/50 text-slate-100 backdrop-blur-md' // Dark Glass
    : 'bg-white/80 border-white/50 text-gray-800 backdrop-blur-xl'; // Light Glass

  const inputClasses = darkMode
    ? 'bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20'
    : 'bg-gray-50/50 border-gray-100 text-gray-700 placeholder-gray-400 focus:border-indigo-300 focus:ring-indigo-100';

  const resultBoxClasses = darkMode
    ? `${theme.darkBg} ${theme.darkBorder}`
    : `${theme.bg} ${theme.border}`;

  const resultTextClasses = darkMode
    ? `${theme.darkColor}`
    : `${theme.color}`;

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-700 ease-in-out flex items-center justify-center p-4 font-sans overflow-hidden ${containerClasses}`}>
      
      {/* Meteor Background (Only visible in Dark Mode) */}
      {darkMode && (
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={25} />
            {/* Subtle radial gradient to make text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
         </div>
      )}

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all z-50 group"
        title="Toggle Dark Mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-300 group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 text-slate-600 group-hover:-rotate-12 transition-transform duration-500" />
        )}
      </button>

      <div className="w-full max-w-xl transform transition-all duration-500 relative z-10">
        <div className={`shadow-2xl rounded-3xl overflow-hidden border transition-colors duration-500 ${cardClasses}`}>

          {/* Header */}
          <div className={`p-8 text-center border-b transition-colors duration-500 ${darkMode ? 'border-slate-700/50' : 'border-gray-100/50'}`}>
            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-colors duration-500 ${resultBoxClasses}`}>
              <IconComponent className={`w-8 h-8 transition-colors duration-500 ${resultTextClasses}`} />
            </div>
            <h1 className={`text-3xl font-bold mb-2 tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Mood Analyzer
            </h1>
            <p className={darkMode ? 'text-slate-400' : 'text-gray-500'}>
              Share your thoughts, and I'll read the emotion behind them.
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="How are you feeling right now?"
                rows={5}
                className={`w-full p-4 rounded-xl border-2 outline-none transition-all duration-300 resize-none text-lg ${inputClasses}`}
              />
              <div className={`absolute bottom-4 right-4 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm ${darkMode ? 'bg-slate-700/50 text-slate-400' : 'bg-white/80 text-gray-400'}`}>
                {text.length} chars
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading || !text.trim()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${theme.button} flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  <span>Analyzing Vibes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Mood</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 flex items-center gap-3 animate-pulse">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {result && !loading && (
              <div className="animate-slide-up">
                <div className={`relative overflow-hidden rounded-2xl border p-6 text-center transition-colors duration-500 ${resultBoxClasses}`}>
                  
                  {/* Decorative quote */}
                  <div className={`absolute top-2 left-4 text-6xl font-serif opacity-10 ${resultTextClasses}`}>“</div>
                  
                  <div className="relative z-10">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-sm ${darkMode ? 'bg-black/20' : 'bg-white/60'} ${resultTextClasses}`}>
                      Detected: {result.label}
                    </span>
                    
                    <h3 className={`text-xl font-medium italic leading-relaxed mb-4 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                      "{message}"
                    </h3>

                    <div className={`flex items-center justify-center gap-2 text-xs font-mono mt-4 border-t pt-4 ${darkMode ? 'border-slate-700/50 text-slate-500' : 'border-black/5 text-gray-500'}`}>
                      <Activity className="w-3 h-3" />
                      <span>Confidence Score: {Math.max(...Object.values(result.probabilities || {})).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`px-8 py-4 text-center border-t transition-colors duration-500 ${darkMode ? 'bg-slate-900/50 border-slate-700/50' : 'bg-gray-50 border-gray-100'}`}>
             <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
               <MessageCircle className="w-3 h-3" />
               <span>AI Powered Emotion Detection</span>
             </p>
          </div>

        </div>
      </div>

      {/* Custom CSS for Animation */}
      <style>{`
        @keyframes meteor {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
        }
        .animate-meteor-effect {
          animation: meteor 5s linear infinite;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;