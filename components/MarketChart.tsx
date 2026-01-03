
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { CoinData } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface MarketChartProps {
  coin: CoinData;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl">
        <p className="text-xs text-slate-400 mb-1">Price Point</p>
        <p className="text-sm font-bold text-indigo-400 mono">
          {FORMAT_CURRENCY(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const MarketChart: React.FC<MarketChartProps> = ({ coin }) => {
  const data = coin.sparkline_in_7d.price.map((price, index) => ({
    time: index,
    price: price,
  }));

  const isPositive = coin.price_change_percentage_24h >= 0;
  const strokeColor = isPositive ? '#10b981' : '#f43f5e';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-slate-400 text-sm font-medium mb-1">Overview: {coin.name}</h2>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white mono">{FORMAT_CURRENCY(coin.current_price)}</span>
            <span className={`text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {['1H', '24H', '7D', '1M', '1Y'].map((t) => (
            <button 
              key={t}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                t === '7D' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis dataKey="time" hide />
            <YAxis 
              hide 
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={strokeColor} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;
