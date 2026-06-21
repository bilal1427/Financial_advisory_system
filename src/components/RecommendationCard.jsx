import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function RecommendationCard({ recommendations = [], strengths = [], weaknesses = [] }) {
  const [activeTab, setActiveTab] = useState('recommendations');

  const tabs = [
    {
      id: 'recommendations',
      label: 'AI Advisory Actions',
      icon: <Lightbulb className="h-4 w-4" />,
      color: 'text-indigo-400 border-indigo-400 bg-indigo-500/5',
      accent: 'indigo',
    },
    {
      id: 'strengths',
      label: 'Financial Strengths',
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: 'text-emerald-400 border-emerald-400 bg-emerald-500/5',
      accent: 'emerald',
    },
    {
      id: 'weaknesses',
      label: 'Risk Areas / Weaknesses',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'text-rose-400 border-rose-400 bg-rose-500/5',
      accent: 'rose',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'recommendations':
        return (
          <ul className="space-y-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 items-start bg-indigo-950/20 border border-indigo-900/30 p-3.5 rounded-xl text-sm leading-relaxed text-indigo-100 animate-slide-up">
                <Lightbulb className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
            {recommendations.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No recommendations generated.</p>
            )}
          </ul>
        );
      case 'strengths':
        return (
          <ul className="space-y-3">
            {strengths.map((str, i) => (
              <li key={i} className="flex gap-3 items-start bg-emerald-950/10 border border-emerald-900/30 p-3.5 rounded-xl text-sm leading-relaxed text-emerald-100 animate-slide-up">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
            {strengths.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No strengths identified.</p>
            )}
          </ul>
        );
      case 'weaknesses':
        return (
          <ul className="space-y-3">
            {weaknesses.map((weak, i) => (
              <li key={i} className="flex gap-3 items-start bg-rose-950/10 border border-rose-900/30 p-3.5 rounded-xl text-sm leading-relaxed text-rose-100 animate-slide-up">
                <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{weak}</span>
              </li>
            ))}
            {weaknesses.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No weaknesses identified.</p>
            )}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glow-card rounded-2xl p-6 flex flex-col gap-6">
      {/* Tabs list */}
      <div className="flex flex-wrap border-b border-slate-800 pb-2 gap-2">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                isSelected
                  ? tab.color + ' border-current shadow-lg shadow-black/10'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[220px]">{renderContent()}</div>
    </div>
  );
}
