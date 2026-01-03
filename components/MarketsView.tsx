
import React from 'react';
import CryptoTable from './CryptoTable';
import { CoinData } from '../types';

interface MarketsViewProps {
  coins: CoinData[];
  onSelect: (coin: CoinData) => void;
}

const MarketsView: React.FC<MarketsViewProps> = ({ coins, onSelect }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Global Markets</h2>
          <p className="text-slate-400 text-sm">Real-time listing of the top performing assets by market capitalization.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">Export CSV</button>
        </div>
      </div>
      <CryptoTable coins={coins} onSelect={onSelect} />
    </div>
  );
};

export default MarketsView;
