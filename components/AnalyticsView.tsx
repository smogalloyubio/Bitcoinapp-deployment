
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { GlobalMetrics } from '../types';
import { Activity, Globe, Info } from 'lucide-react';

interface AnalyticsViewProps {
  globalData: GlobalMetrics | null;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ globalData }) => {
  const dominanceData = globalData ? Object.entries(globalData.market_cap_percentage).slice(0, 5).map(([name, value]) => ({
    name: name.toUpperCase(),
    value: value
  })) : [];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const volatilityData = [
    { day: 'Mon', index: 45 },
    { day: 'Tue', index: 52 },
    { day: 'Wed', index: 48 },
    { day: 'Thu', index: 61 },
    { day: 'Fri', index: 55 },
    { day: 'Sat', index: 42 },
    { day: 'Sun', index: 38 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dominance Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Globe size={18} className="text-indigo-400" />
              Market Dominance
            </h3>
            <Info size={16} className="text-slate-600 cursor-help" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dominanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dominanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {dominanceData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span>{d.name}: {d.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Volatility Index */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-emerald-400" />
              Volatility Index (VIX)
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-bold">WEEKLY</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volatilityData}>
                <XAxis dataKey="day" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="index" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Higher values indicate increased market uncertainty and potential for rapid price swings. 
            Current sentiment: <span className="text-emerald-400 font-bold italic underline">Stabilizing</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
