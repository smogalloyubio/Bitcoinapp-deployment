
import React from 'react';
import { MOCK_WHALES, FORMAT_CURRENCY } from '../constants';
import { ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const WhaleWatch: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert size={20} className="text-amber-500" />
          Whale Watch
        </h2>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Real-time alerts</span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {MOCK_WHALES.map((tx) => (
          <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
            <div className={`p-2 rounded-lg ${tx.type === 'buy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              {tx.type === 'buy' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <p className="text-sm font-bold text-slate-200">{tx.amount} {tx.asset}</p>
                <p className="text-xs font-medium text-slate-500">{tx.time}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400 mono truncate">{tx.wallet}</p>
                <p className={`text-xs font-bold ${tx.type === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {FORMAT_CURRENCY(tx.value)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors">
        View All Alerts
      </button>
    </div>
  );
};

export default WhaleWatch;
