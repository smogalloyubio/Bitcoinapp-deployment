
import React from 'react';
import { Sparkles, Loader2, Key, Info } from 'lucide-react';

interface MarketAnalysisCardProps {
  analysis: string | null;
  loading: boolean;
  hasKey: boolean;
  onConnect: () => void;
}

const MarketAnalysisCard: React.FC<MarketAnalysisCardProps> = ({ analysis, loading, hasKey, onConnect }) => {
  return (
    <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden group min-h-[160px] flex flex-col justify-center transition-all hover:border-indigo-500/40">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/15 transition-all duration-1000 animate-pulse" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Sparkles size={18} className="text-white" fill="white" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Institutional AI Insights</h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 rounded-md border border-indigo-500/20">
          <div className={`w-1.5 h-1.5 rounded-full ${hasKey ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-slate-600'}`} />
          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-tighter">
            {hasKey ? 'Analyst Connected' : 'Analyst Offline'}
          </span>
        </div>
      </div>

      <div className="relative z-10 min-h-[60px] flex flex-col justify-center">
        {!hasKey ? (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <p className="text-slate-400 text-sm mb-4 max-w-md">Connect your Gemini API Key to enable professional-grade market sentiment and predictive analysis.</p>
            <button 
              onClick={onConnect}
              className="group/btn flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <Key size={14} className="group-hover/btn:rotate-12 transition-transform" />
              Connect API Engine
            </button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="animate-spin text-indigo-500" size={24} />
            <span className="ml-3 text-slate-400 font-medium animate-pulse">Running quantitative models...</span>
          </div>
        ) : (
          <p className="text-slate-200 leading-relaxed text-sm italic font-medium">
            "{analysis || "Awaiting incoming market packets for analysis..."}"
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4 relative z-10">
        <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-1000 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
            style={{ width: hasKey ? (loading ? '40%' : '100%') : '0%' }}
          />
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <span>Engine: Gemini-3-Pro</span>
          <Info size={10} className="cursor-help" />
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisCard;
