
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon, iconColor }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-all shadow-sm group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${iconColor} bg-opacity-10 text-opacity-100 flex items-center justify-center transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
        <p className="text-2xl font-bold tracking-tight text-slate-50 mono">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
