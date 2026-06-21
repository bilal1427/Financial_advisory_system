import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import DashboardCharts from '../components/DashboardCharts';
import { LayoutDashboard, Award, ShieldAlert, History, User, CheckCircle2, ChevronRight, PlusCircle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState({ name: '', email: '' });
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const activeUser = api.getUserSession();
    if (!activeUser.email) {
      navigate('/');
      return;
    }
    setSession(activeUser);

    const fetchDashboard = async () => {
      setIsLoading(true);
      setError('');
      try {
        const dashboardData = await api.getDashboard(activeUser.email);
        setData(dashboardData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard insights. Please verify connection to server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-16 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-sm text-slate-400">Compiling financial workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-12">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl inline-block">
          <AlertCircle className="h-8 w-8 text-rose-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Dashboard Error</h3>
        <p className="text-sm text-slate-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  const latest = data?.latestAnalysis;
  const showAssessments = data?.totalAssessments > 0;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-7 w-7 text-indigo-400" />
            Financial Dashboard
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Analyzing health index and risk models for <span className="text-indigo-400 font-semibold">{session.name}</span> ({session.email})
          </p>
        </div>
        <button
          onClick={() => navigate('/assessment')}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-indigo-500/15 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          New Assessment
        </button>
      </div>

      {showAssessments ? (
        <>
          {/* Key Stat Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Health Score */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase">Avg Health Index</span>
                <span className="block text-2xl font-extrabold text-white mt-1">
                  {data.averageFinancialHealthScore} <span className="text-xs text-slate-400">/ 100</span>
                </span>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
            </div>

            {/* Risk Score */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase">Avg Default Risk</span>
                <span className="block text-2xl font-extrabold text-white mt-1">
                  {data.averageRiskScore}%
                </span>
              </div>
              <div className="p-3 bg-rose-500/10 rounded-xl">
                <ShieldAlert className="h-6 w-6 text-rose-400" />
              </div>
            </div>

            {/* Total Analyses */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase">Assessments Conducted</span>
                <span className="block text-2xl font-extrabold text-white mt-1">
                  {data.totalAssessments}
                </span>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <History className="h-6 w-6 text-indigo-400" />
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase">Current Profile Status</span>
                <span className={`block text-lg font-bold mt-1.5 uppercase ${
                  latest.riskLevel === 'LOW'
                    ? 'text-emerald-400'
                    : latest.riskLevel === 'MEDIUM'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  {latest.riskLevel} Risk
                </span>
              </div>
              <div className="p-3 bg-slate-800 rounded-xl">
                <User className="h-6 w-6 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Charts Component */}
          <DashboardCharts historyTrend={data.historyTrend} latestAnalysis={latest} />

          {/* Recent Assessment Insight Card */}
          <div className="glow-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Latest Assessment Summary</h3>
                <p className="text-xs text-slate-400">Created on {new Date(latest.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <button
                onClick={() => navigate(`/result/${latest.id}`)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold tracking-wide transition-colors"
              >
                View Full Advisory Report
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{latest.summary}"
            </p>

            <div className="grid gap-6 md:grid-cols-2 pt-2">
              {/* Recommendations mini */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Top AI Recommendations</h4>
                <ul className="space-y-2">
                  {latest.recommendations.slice(0, 3).map((rec, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths mini */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Core Strengths</h4>
                <ul className="space-y-2">
                  {latest.strengths.slice(0, 3).map((str, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* No assessments state */
        <div className="glow-card rounded-2xl p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="p-4 bg-indigo-500/10 rounded-full inline-block border border-indigo-500/20">
            <LayoutDashboard className="h-10 w-10 text-indigo-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">No Advisory Records Yet</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
              Welcome {session.name}! To begin tracking your financial health index, scoring, and 12-month projections, submit your first assessment.
            </p>
          </div>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-indigo-600/10 cursor-pointer"
          >
            Run First Free Checkup
          </button>
        </div>
      )}
    </div>
  );
}
