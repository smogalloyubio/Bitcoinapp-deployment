
import React from 'react';
import { Wallet, ArrowUpRight, Plus, PieChart as PieIcon } from 'lucide-react';
import { FORMAT_CURRENCY } from '../constants';

const PortfolioView: React.FC = () => {
  const holdings = [
    { name: 'Bitcoin', symbol: 'BTC', amount: '0.45', value: 28350, change: 2.4, color: 'bg-amber-500' },
    { name: 'Ethereum', symbol: 'ETH', amount: '4.2', value: 10500, change: -1.2, color: 'bg-indigo-500' },
    { name: 'Solana', symbol: 'SOL', amount: '125', value: 18750, change: 12.8, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-indigo-100 text-sm font-medium opacity-80 mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold tracking-tight mono">{FORMAT_CURRENCY(57600)}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Wallet size={24} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-400/30">
                <ArrowUpRight size={14} /> +$2,450.20 (4.2%)
              </div>
              <p className="text-indigo-200 text-xs font-medium">Profit this month</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-20 -mt-20" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-indigo-400 border border-slate-700">
            <Plus size={32} />
          </div>
          <h3 className="text-white font-bold mb-1">Add Asset</h3>
          <p className="text-slate-500 text-sm mb-6">Track your manual holdings or connect an exchange.</p>
          <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-bold transition-all">Add Transaction</button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <PieIcon size={18} className="text-indigo-400" />
            Your Assets
          </h3>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">3 Items</span>
        </div>
        <div className="p-2">
          {holdings.map((asset) => (
            <div key={asset.symbol} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${asset.color}`} />
                <div>
                  <p className="font-bold text-slate-100">{asset.name}</p>
                  <p className="text-xs text-slate-500 uppercase font-medium">{asset.amount} {asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-100 mono">{FORMAT_CURRENCY(asset.value)}</p>
                <p className={`text-xs font-bold ${asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
