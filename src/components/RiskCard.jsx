import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

export default function RiskCard({ riskScore, riskLevel, healthScore }) {
  // Styles based on risk level
  const getRiskDetails = () => {
    switch (riskLevel?.toUpperCase()) {
      case 'LOW':
        return {
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
          desc: 'Excellent risk profile. High capacity for investment, comfortable debt levels.',
        };
      case 'MEDIUM':
        return {
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          icon: <AlertTriangle className="h-6 w-6 text-amber-400" />,
          desc: 'Moderate risk. Take care of minor debt burdens or build your savings ratio.',
        };
      case 'HIGH':
        return {
          color: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/20',
          icon: <ShieldAlert className="h-6 w-6 text-rose-400" />,
          desc: 'Critical risk levels. Elevated debt ratios, low liquidity. Postpone major loans.',
        };
      default:
        return {
          color: 'text-indigo-400',
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/20',
          icon: <ShieldCheck className="h-6 w-6 text-indigo-400" />,
          desc: 'Undetermined profile.',
        };
    }
  };

  const risk = getRiskDetails();

  // Circular gauge calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetHealth = circumference - (healthScore / 100) * circumference;
  const strokeDashoffsetRisk = circumference - (riskScore / 100) * circumference;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Financial Health Score Gauge */}
      <div className="glow-card rounded-2xl p-6 flex flex-col items-center text-center justify-between">
        <div className="w-full flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Financial Health
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium">
            AI Computed
          </span>
        </div>

        {/* Circular Gauge */}
        <div className="relative flex items-center justify-center my-4">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-emerald-500 transition-all duration-1000 ease-out"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffsetHealth}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-white tracking-tight">{healthScore}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">Score</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-xs mt-2">
          Your health score represents overall asset wellness, budget stability, credit rating, and expense balancing.
        </p>
      </div>

      {/* Default Risk Card */}
      <div className="glow-card rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Default Risk Assessment
          </h3>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${risk.bg} ${risk.color}`}>
            {riskLevel} Risk
          </span>
        </div>

        {/* Progress bars & indicators */}
        <div className="my-2">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm text-slate-300 font-medium">Risk Score</span>
            <span className={`text-2xl font-bold ${risk.color}`}>{riskScore}%</span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                riskLevel?.toUpperCase() === 'LOW'
                  ? 'bg-emerald-500'
                  : riskLevel?.toUpperCase() === 'MEDIUM'
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        <div className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${risk.bg} ${risk.border}`}>
          <div className="mt-0.5 flex-shrink-0">{risk.icon}</div>
          <div>
            <h4 className={`text-sm font-semibold ${risk.color}`}>Advisory Warning</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">{risk.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
