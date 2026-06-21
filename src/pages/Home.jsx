import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Landmark, ArrowRight, ShieldCheck, TrendingUp, Compass, ChevronRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState({ name: '', email: '' });
  
  // Login card state
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setSessionUser(api.getUserSession());
  }, []);

  const handleStartSession = (e) => {
    e.preventDefault();
    if (!userName.trim() || !email.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    api.setUserSession(userName, email);
    navigate('/assessment');
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <div className="grid gap-12 lg:grid-cols-5 items-center">
        {/* Left Intro Column */}
        <div className="lg:col-span-3 space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
            <Landmark className="h-3.5 w-3.5" />
            Empowered by OpenAI GPT
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Professional AI <br />
            <span className="text-indigo-400 bg-clip-text">Financial Advisory</span> <br />
            & Default Risk Calculator
          </h1>
          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Get instant expert financial checkups. Understand your credit ratios, calculate debt capacity, analyze cash outflows, and receive a customized 12-month improvement roadmap.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 pt-4">
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="block text-sm font-bold text-white">Default Risk</span>
                <span className="text-xs text-slate-500">Risk calculations</span>
              </div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-indigo-400 flex-shrink-0" />
              <div>
                <span className="block text-sm font-bold text-white">Financial Health</span>
                <span className="text-xs text-slate-500">0 - 100 Wellness</span>
              </div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
              <Compass className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="block text-sm font-bold text-white">Roadmap</span>
                <span className="text-xs text-slate-500">12-mo plans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Action/Login Column */}
        <div className="lg:col-span-2">
          {sessionUser.email ? (
            <div className="glow-card rounded-2xl p-8 space-y-6 border border-slate-800 text-center animate-slide-up">
              <h3 className="text-xl font-bold text-white">Welcome Back, {sessionUser.name}!</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                You have active session loaded. Navigate straight to your personal financial hub to view dashboard analysis, trends, or submit a new checkup.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/assessment')}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  Perform New Assessment
                </button>
              </div>
            </div>
          ) : (
            <div className="glow-card rounded-2xl p-8 border border-slate-800 space-y-6 animate-slide-up">
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-white">Initialize Checkup</h3>
                <p className="text-xs text-slate-400">Enter your name and email to construct your profile.</p>
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleStartSession} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-850 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-850 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Continue to Assessment
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="space-y-6 pt-8 border-t border-slate-900">
        <h2 className="text-xl font-bold text-white text-center">Comprehensive Personal Finance Platform Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-2">
            <h3 className="font-semibold text-white">12-Month Action Roadmap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step-by-step custom actionable goals structured for Month 1, 2, 3, 6, and 12 to systematically fix debt ratios and optimize savings.
            </p>
          </div>
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-2">
            <h3 className="font-semibold text-white">Default Risk Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes defaults percentages and places users into categorized risk classes (Low, Medium, High) to check credit-worthiness.
            </p>
          </div>
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-2">
            <h3 className="font-semibold text-white">Future Condition Projections</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Estimates specific health conditions at 6 months and 1 year intervals, assuming you strictly follow generated advice plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
