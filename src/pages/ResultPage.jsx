import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import RiskCard from '../components/RiskCard';
import RecommendationCard from '../components/RecommendationCard';
import { ArrowLeft, Calendar, FileText, LayoutDashboard, History, Award, AlertCircle } from 'lucide-react';

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await api.getAnalysis(id);
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch the analysis details. Please verify the assessment ID.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-16 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-sm text-slate-400">Loading your personalized advice...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-12">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl inline-block">
          <AlertCircle className="h-8 w-8 text-rose-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Assessment Not Found</h3>
        <p className="text-sm text-slate-400">{error || 'Could not locate the requested evaluation.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Roadmap mapping helper
  const roadmapSteps = [
    { label: 'Month 1', key: 'month1', title: 'Initiation Stage' },
    { label: 'Month 2', key: 'month2', title: 'Budget Locking' },
    { label: 'Month 3', key: 'month3', title: 'Stabilization' },
    { label: 'Month 6', key: 'month6', title: 'Re-evaluation' },
    { label: 'Month 12', key: 'month12', title: 'Wealth Accumulation' },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 mb-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </button>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Award className="h-7 w-7 text-emerald-400" />
            Advisory Report for {analysis.userName}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(analysis.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span>•</span>
            <span>ID: #{analysis.id}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
          >
            <History className="h-4 w-4" />
            History
          </button>
        </div>
      </div>

      {/* Overview Summary */}
      <div className="bg-indigo-950/10 border border-indigo-900/20 p-5 rounded-2xl space-y-2">
        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          AI Situation Summary
        </h3>
        <p className="text-sm text-indigo-100 leading-relaxed font-medium">
          {analysis.summary}
        </p>
      </div>

      {/* Gauges & Cards */}
      <RiskCard
        riskScore={analysis.riskScore}
        riskLevel={analysis.riskLevel}
        healthScore={analysis.financialHealthScore}
      />

      {/* Tabs Recommendations list */}
      <RecommendationCard
        recommendations={analysis.recommendations}
        strengths={analysis.strengths}
        weaknesses={analysis.weaknesses}
      />

      {/* Future Projections Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 6 Month projection */}
        <div className="glow-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Milestone Projection</span>
          <h4 className="text-base font-extrabold text-white border-l-2 border-emerald-500 pl-3">
            6-Month Condition Estimate
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {analysis.sixMonthProjection}
          </p>
        </div>

        {/* 1 Year projection */}
        <div className="glow-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Long Term Projection</span>
          <h4 className="text-base font-extrabold text-white border-l-2 border-indigo-500 pl-3">
            1-Year Condition Estimate
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {analysis.oneYearProjection}
          </p>
        </div>
      </div>

      {/* Interactive Roadmap Timeline */}
      <div className="glow-card rounded-2xl p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white">Your Personalized 12-Month Financial Roadmap</h3>
          <p className="text-xs text-slate-400 mt-0.5">Follow this sequential plan month-by-month to optimize scores.</p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-8 py-2">
          {roadmapSteps.map((step, index) => {
            const adviceText = analysis.roadmap?.[step.key] || analysis.roadmap?.[step.label.toLowerCase().replace(' ', '')];
            return (
              <div key={index} className="relative pl-6 md:pl-10 animate-slide-up">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                </div>

                <div className="space-y-1 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{step.label}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-semibold text-slate-300">{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1.5">
                    {adviceText || 'Continue tracking and maintaining credit health scores.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
