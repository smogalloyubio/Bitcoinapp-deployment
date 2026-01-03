
import React, { useState } from 'react';
import { CoinData } from '../types';
import { FORMAT_CURRENCY, FORMAT_COMPACT } from '../constants';
import { Search, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CryptoTableProps {
  coins: CoinData[];
  onSelect: (coin: CoinData) => void;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ coins, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          Market Movers
          <span className="text-xs font-normal bg-slate-800 text-slate-400 px-2 py-1 rounded-full uppercase tracking-wider">Top 12</span>
        </h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search coins..." 
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider font-semibold bg-slate-900/50">
              <th className="px-6 py-4"># Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">24h Change</th>
              <th className="px-6 py-4 hidden md:table-cell">Market Cap</th>
              <th className="px-6 py-4 hidden lg:table-cell">Last 7 Days</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredCoins.map((coin) => (
              <tr 
                key={coin.id} 
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                onClick={() => onSelect(coin)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs w-4">{coin.market_cap_rank}</span>
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-bold text-slate-100">{coin.name}</div>
                      <div className="text-slate-500 text-xs uppercase">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-200 mono">
                  {FORMAT_CURRENCY(coin.current_price)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
                    coin.price_change_percentage_24h >= 0 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-slate-400 text-sm mono">
                  {FORMAT_COMPACT(coin.market_cap)}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="w-24 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={coin.sparkline_in_7d.price.map((p, i) => ({ price: p }))}>
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={coin.price_change_percentage_24h >= 0 ? '#10b981' : '#f43f5e'} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
