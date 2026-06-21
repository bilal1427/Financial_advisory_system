import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { History as HistoryIcon, PlusCircle, Calendar, ArrowRight, Eye, ShieldAlert, Award, FileText, AlertCircle } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const [session, setSession] = useState({ name: '', email: '' });
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const activeUser = api.getUserSession();
    if (!activeUser.email) {
      navigate('/');
      return;
    }
    setSession(activeUser);

    const fetchHistory = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await api.getHistory(activeUser.email);
        setList(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load assessment history logs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-16 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="text-sm text-slate-400">Fetching history indexes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-12">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl inline-block">
          <AlertCircle className="h-8 w-8 text-rose-400" />
        </div>
        <h3 className="text-xl font-bold text-white">History Logs Error</h3>
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

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <HistoryIcon className="h-7 w-7 text-indigo-400" />
            Assessment History
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Browse and compare all past checkups for <span className="text-indigo-400 font-semibold">{session.name}</span>
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

      {list.length > 0 ? (
        <div className="glow-card rounded-2xl overflow-hidden border border-slate-850">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Occupation</th>
                  <th className="px-6 py-4">Loan Requested</th>
                  <th className="px-6 py-4 text-center">Health Index</th>
                  <th className="px-6 py-4 text-center">Risk Level</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-xs sm:text-sm">
                {list.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-300 font-medium">
                          {new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-medium">
                      {item.occupation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-bold">
                      ₹{item.loanAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 font-bold rounded-lg border border-emerald-500/15">
                        <Award className="h-3.5 w-3.5" />
                        {item.financialHealthScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                        item.riskLevel === 'LOW'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : item.riskLevel === 'MEDIUM'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => navigate(`/result/${item.id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty history log */
        <div className="glow-card rounded-2xl p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="p-4 bg-indigo-500/10 rounded-full inline-block border border-indigo-500/20">
            <HistoryIcon className="h-10 w-10 text-indigo-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">No Historical Assessments</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
              You haven't run any financial assessments yet. Create one today to start tracking your health logs.
            </p>
          </div>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-indigo-600/10 cursor-pointer"
          >
            Create First Checkup
          </button>
        </div>
      )}
    </div>
  );
}
