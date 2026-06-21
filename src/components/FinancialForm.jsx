import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { User, Mail, DollarSign, Wallet, Percent, ShieldCheck, HelpCircle } from 'lucide-react';

export default function FinancialForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    income: '',
    expenses: '',
    savings: '',
    existingEmi: '',
    loanAmount: '',
    creditScore: '',
    dependents: '',
    occupation: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Autofill name and email if user has an active session
    const userSession = api.getUserSession();
    if (userSession.email) {
      setFormData((prev) => ({
        ...prev,
        userName: userSession.name,
        email: userSession.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when editing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.userName.trim()) tempErrors.userName = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    
    // Numeric checks
    const positiveCheck = ['income', 'expenses', 'savings', 'existingEmi', 'loanAmount', 'dependents'];
    positiveCheck.forEach((field) => {
      const val = parseFloat(formData[field]);
      if (isNaN(val) || val < 0) {
        tempErrors[field] = 'Must be a positive number';
      }
    });

    const credit = parseInt(formData.creditScore);
    if (isNaN(credit) || credit < 300 || credit > 850) {
      tempErrors.creditScore = 'Credit score must be between 300 and 850';
    }

    if (!formData.occupation.trim()) tempErrors.occupation = 'Occupation is required';

    // Ratios logic validation: Expenses + Savings shouldn't exceed income drastically without warning, but we let standard values through.
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Convert string inputs to correct types
    const submissionData = {
      ...formData,
      income: parseFloat(formData.income),
      expenses: parseFloat(formData.expenses),
      savings: parseFloat(formData.savings),
      existingEmi: parseFloat(formData.existingEmi),
      loanAmount: parseFloat(formData.loanAmount),
      creditScore: parseInt(formData.creditScore),
      dependents: parseInt(formData.dependents),
    };
    
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Information */}
      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
          Personal Details
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {/* User Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.userName && <span className="text-xs text-rose-400 mt-1 block">{errors.userName}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.email && <span className="text-xs text-rose-400 mt-1 block">{errors.email}</span>}
          </div>
        </div>
      </div>

      {/* Financial Details */}
      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
          Income & Monthly Budgets
        </h4>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Monthly Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Monthly Income (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">₹</span>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="75000"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.income && <span className="text-xs text-rose-400 mt-1 block">{errors.income}</span>}
          </div>

          {/* Monthly Expenses */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Monthly Expenses (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">₹</span>
              <input
                type="number"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
                placeholder="30000"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.expenses && <span className="text-xs text-rose-400 mt-1 block">{errors.expenses}</span>}
          </div>

          {/* Monthly Savings */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Current Savings Ratio (₹/mo)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">₹</span>
              <input
                type="number"
                name="savings"
                value={formData.savings}
                onChange={handleChange}
                placeholder="20000"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.savings && <span className="text-xs text-rose-400 mt-1 block">{errors.savings}</span>}
          </div>

          {/* Existing EMI */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Existing EMI Total (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">₹</span>
              <input
                type="number"
                name="existingEmi"
                value={formData.existingEmi}
                onChange={handleChange}
                placeholder="10000"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.existingEmi && <span className="text-xs text-rose-400 mt-1 block">{errors.existingEmi}</span>}
          </div>

          {/* Loan Amount Requested */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Requested Loan Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">₹</span>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="500000"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.loanAmount && <span className="text-xs text-rose-400 mt-1 block">{errors.loanAmount}</span>}
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Credit Score (300 - 850)</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="number"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
                placeholder="750"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>
            {errors.creditScore && <span className="text-xs text-rose-400 mt-1 block">{errors.creditScore}</span>}
          </div>
        </div>
      </div>

      {/* Demographics / Social Details */}
      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
          Employment & Family Profile
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Occupation */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Occupation</label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              <option value="" disabled>Select Occupation</option>
              <option value="Salaried Professional">Salaried Professional</option>
              <option value="Self-Employed Entrepreneur">Self-Employed / Business</option>
              <option value="Freelancer / Contractor">Freelancer / Gig Worker</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student / Unemployed</option>
            </select>
            {errors.occupation && <span className="text-xs text-rose-400 mt-1 block">{errors.occupation}</span>}
          </div>

          {/* Dependents */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Number of Dependents</label>
            <input
              type="number"
              name="dependents"
              value={formData.dependents}
              onChange={handleChange}
              placeholder="2"
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors placeholder:text-slate-600"
            />
            {errors.dependents && <span className="text-xs text-rose-400 mt-1 block">{errors.dependents}</span>}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-750 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:translate-y-[1px]"
      >
        {isLoading ? 'Processing AI Financial Checkup...' : 'Analyze Financial Profile'}
      </button>
    </form>
  );
}
