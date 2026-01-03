
import React from 'react';
import { Newspaper, Clock, ExternalLink, Bookmark } from 'lucide-react';

const NewsView: React.FC = () => {
  const news = [
    {
      id: 1,
      title: "Bitcoin ETFs See Record Inflows as Institutions Eye $100k Milestone",
      source: "CryptoGlobal",
      time: "42 mins ago",
      category: "Market",
      image: "https://picsum.photos/seed/btc/400/250"
    },
    {
      id: 2,
      title: "Ethereum's New Upgrade Promises 90% Reduction in Layer-2 Gas Fees",
      source: "TechBlock",
      time: "2 hours ago",
      category: "Technology",
      image: "https://picsum.photos/seed/eth/400/250"
    },
    {
      id: 3,
      title: "Regulators Propose New Framework for Stablecoin Reserves in Europe",
      source: "ChainWire",
      time: "5 hours ago",
      category: "Regulation",
      image: "https://picsum.photos/seed/legal/400/250"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl border border-indigo-500/20">
          <Newspaper size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Daily News Feed</h2>
          <p className="text-slate-400 text-sm">Stay ahead with the latest industry insights and breaking news.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-600 transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase rounded-lg">
                {item.category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-3">
                <span className="text-indigo-400">{item.source}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-4 leading-snug group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-800">
                <button className="flex items-center gap-2 text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors">
                  Read Full Story <ExternalLink size={14} />
                </button>
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsView;
