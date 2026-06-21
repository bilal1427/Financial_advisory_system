import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Activity, CreditCard, PiggyBank } from 'lucide-react';

export default function DashboardCharts({ historyTrend = [], latestAnalysis = null }) {
  // Budget breakdown data
  const getBudgetData = () => {
    if (!latestAnalysis) return [];
    return [
      { name: 'Income', amount: latestAnalysis.income, color: '#6366f1' },
      { name: 'Expenses', amount: latestAnalysis.expenses, color: '#f43f5e' },
      { name: 'Savings', amount: latestAnalysis.savings, color: '#10b981' },
      { name: 'EMI Burden', amount: latestAnalysis.existingEmi, color: '#f59e0b' }
    ];
  };

  const budgetData = getBudgetData();

  // Custom tooltips for nice formatting
  const CurrencyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl shadow-xl">
          <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
          <p className="text-sm font-bold text-white">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  const TrendTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl space-y-1.5">
          <p className="text-xs font-bold text-indigo-400">{payload[0].payload.date}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-4 text-xs">
              <span style={{ color: entry.color }} className="font-medium">{entry.name}:</span>
              <span className="font-extrabold text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Historical Trend Chart */}
      <div className="glow-card rounded-2xl p-6 flex flex-col justify-between min-h-[380px]">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4 text-indigo-400" />
            Financial Score History
          </h3>
          <span className="text-[10px] text-slate-500 font-medium">Chronological assessments</span>
        </div>

        {historyTrend.length > 0 ? (
          <div className="flex-1 w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip content={<TrendTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="financialHealthScore"
                  name="Health Score"
                  stroke="#10b981"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  dot={{ strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="riskScore"
                  name="Default Risk"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
            Insufficient historical assessment data.
          </div>
        )}
      </div>

      {/* Budget Breakdown Chart */}
      <div className="glow-card rounded-2xl p-6 flex flex-col justify-between min-h-[380px]">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-rose-400" />
            Current Budget Layout
          </h3>
          <span className="text-[10px] text-slate-500 font-medium">Monthly allocation</span>
        </div>

        {latestAnalysis ? (
          <div className="flex-1 w-full h-[280px] flex flex-col justify-between gap-4">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip content={<CurrencyTooltip />} />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Micro details */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-2.5">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Income</span>
                <span className="text-sm font-bold text-white">₹{latestAnalysis.income.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-rose-950/10 border border-rose-900/30 rounded-xl p-2.5">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Expenses</span>
                <span className="text-sm font-bold text-rose-400">₹{latestAnalysis.expenses.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-2.5">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">Savings</span>
                <span className="text-sm font-bold text-emerald-400">₹{latestAnalysis.savings.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
            No profile loaded. Submit an assessment first.
          </div>
        )}
      </div>
    </div>
  );
}
