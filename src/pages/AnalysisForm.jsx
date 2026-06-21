import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import FinancialForm from '../components/FinancialForm';
import { ShieldCheck, Info } from 'lucide-react';

export default function AnalysisForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to home if no active user session
    const activeUser = api.getUserSession();
    if (!activeUser.email) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.createAnalysis(formData);
      // Success: navigate to result page with the new analysis ID
      navigate(`/result/${response.id}`);
    } catch (err) {
      console.error(err);
      const serverMessage = err.response?.data?.message || err.message;
      setError(`Failed to perform financial assessment: ${serverMessage}. Please make sure the OpenAI API key is configured correctly on the backend server.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Financial Assessment Form</h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Provide your monthly allocations and credit information. Our AI engine will crunch the parameters and generate your custom roadmap.
        </p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/25 p-4 rounded-xl flex gap-3 text-sm text-rose-300 items-start">
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="glow-card rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
          <div className="relative flex items-center justify-center">
            {/* Spinning ring */}
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
            <ShieldCheck className="h-6 w-6 text-indigo-400 absolute" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h3 className="text-lg font-bold text-white">Running AI Checks...</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluating credit factors, scanning expense ratios, and formulating a customized 12-month optimization roadmap. This may take 5-10 seconds.
            </p>
          </div>
        </div>
      ) : (
        <div className="glow-card rounded-2xl p-6 sm:p-8 border border-slate-800">
          <FinancialForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
