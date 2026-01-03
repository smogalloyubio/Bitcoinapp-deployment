
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import CryptoTable from './components/CryptoTable';
import MarketChart from './components/MarketChart';
import WhaleWatch from './components/WhaleWatch';
import MarketAnalysisCard from './components/MarketAnalysisCard';
import MarketsView from './components/MarketsView';
import PortfolioView from './components/PortfolioView';
import NewsView from './components/NewsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import { fetchTopCoins, fetchGlobalData } from './services/cryptoService';
import { getMarketAnalysis } from './services/geminiService';
import { CoinData, GlobalMetrics } from './types';
import { FORMAT_CURRENCY, FORMAT_COMPACT } from './constants';
import { 
  TrendingUp, 
  Activity, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Menu, 
  AlertCircle,
  RefreshCw,
  Key,
  ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [globalData, setGlobalData] = useState<GlobalMetrics | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const checkKeyStatus = useCallback(async () => {
    // Check for AI Studio environment
    // @ts-ignore
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      try {
        // @ts-ignore
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
        return selected;
      } catch (e) {
        console.warn("AI Studio key check failed", e);
      }
    }
    // Fallback for local .env files via Vite mapping
    const envKey = !!(process.env.API_KEY && process.env.API_KEY !== "undefined" && process.env.API_KEY.length > 5);
    setHasApiKey(envKey);
    return envKey;
  }, []);

  const handleOpenKeySelection = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
      loadData();
    } else {
      alert("LOCAL SETUP REQUIRED: To use AI features locally, create a .env file and add VITE_GEMINI_API_KEY=your_key");
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [topCoins, global] = await Promise.all([
        fetchTopCoins(),
        fetchGlobalData()
      ]);
      setCoins(topCoins);
      setGlobalData(global);
      
      if (topCoins.length > 0 && !selectedCoin) {
        setSelectedCoin(topCoins[0]);
      }
      
      const keyActive = await checkKeyStatus();
      if (keyActive) {
        setAiLoading(true);
        const analysis = await getMarketAnalysis(topCoins);
        setAiAnalysis(analysis);
        setAiLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "Network synchronization failure.");
    } finally {
      setLoading(false);
    }
  }, [selectedCoin, checkKeyStatus]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [loadData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                label="Total Cap"
                value={globalData ? FORMAT_COMPACT(globalData.total_market_cap) : '$---'}
                icon={<TrendingUp size={20} />}
                iconColor="text-indigo-500"
              />
              <StatCard 
                label="Global Volume"
                value={globalData ? FORMAT_COMPACT(globalData.total_volume) : '$---'}
                icon={<Activity size={20} />}
                iconColor="text-emerald-500"
              />
              <StatCard 
                label="BTC Dominance"
                value={globalData ? `${globalData.market_cap_percentage.btc.toFixed(1)}%` : '---%'}
                icon={<PieChartIcon size={20} />}
                iconColor="text-amber-500"
              />
              <StatCard 
                label="Total Assets"
                value={globalData ? globalData.active_cryptocurrencies.toLocaleString() : '---'}
                icon={<DollarSign size={20} />}
                iconColor="text-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MarketAnalysisCard analysis={aiAnalysis} loading={aiLoading} hasKey={hasApiKey} onConnect={handleOpenKeySelection} />
              </div>
              <div>
                <WhaleWatch />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8">
                {selectedCoin && <MarketChart coin={selectedCoin} />}
              </div>
              <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">Focused Asset</h3>
                  {selectedCoin && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <img src={selectedCoin.image} alt={selectedCoin.name} className="w-12 h-12 rounded-full shadow-lg" />
                        <div>
                          <h4 className="text-2xl font-bold text-white">{selectedCoin.name}</h4>
                          <span className="text-slate-500 font-medium uppercase tracking-tighter">{selectedCoin.symbol}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-500 mb-1">Market Rank</p>
                          <p className="font-bold text-slate-100">#{selectedCoin.market_cap_rank}</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-500 mb-1">24h Delta</p>
                          <p className={`font-bold ${selectedCoin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {selectedCoin.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">
                  Institutional Terminal
                </button>
              </div>
            </div>

            <div className="mt-8">
              <CryptoTable coins={coins} onSelect={setSelectedCoin} />
            </div>
          </div>
        );
      case 'markets':
        return <MarketsView coins={coins} onSelect={setSelectedCoin} />;
      case 'portfolio':
        return <PortfolioView />;
      case 'news':
        return <NewsView />;
      case 'analytics':
        return <AnalyticsView globalData={globalData} />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  if (loading && !coins.length) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <h1 className="text-xl font-bold text-white tracking-widest animate-pulse uppercase">Syncing Blockchain Data...</h1>
      </div>
    );
  }

  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Intelligence Terminal';
      case 'markets': return 'Global Assets';
      case 'portfolio': return 'Asset Management';
      case 'news': return 'Market Insights';
      case 'analytics': return 'Data Analytics';
      case 'settings': return 'System Settings';
      default: return 'CryptoPulse AI';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(id) => { setActiveTab(id); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen} 
      />

      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-white hidden sm:block tracking-tight">{getHeaderTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleOpenKeySelection}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                hasApiKey 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'
              }`}
            >
              {hasApiKey ? <ShieldCheck size={16} /> : <Key size={16} />}
              {hasApiKey ? 'AI Synchronized' : 'Setup AI Analyst'}
            </button>

            <button onClick={loadData} className="p-2 bg-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 rounded-xl transition-all active:scale-90">
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/20">JD</div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto min-h-[calc(100vh-140px)]">
          {renderContent()}
        </div>

        <footer className="p-8 text-center text-slate-600 text-xs border-t border-slate-900 mt-12 bg-slate-950">
          <p>© 2026 CryptoPulse AI Terminal. Real-time encryption active. Node: CP-SEC-PRO-01</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
