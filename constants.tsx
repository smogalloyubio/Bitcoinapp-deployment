
import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  PieChart, 
  Newspaper, 
  Settings, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  DollarSign
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, id: 'dashboard' },
  { name: 'Markets', icon: <BarChart3 size={20} />, id: 'markets' },
  { name: 'Portfolio', icon: <Wallet size={20} />, id: 'portfolio' },
  { name: 'News', icon: <Newspaper size={20} />, id: 'news' },
  { name: 'Analytics', icon: <PieChart size={20} />, id: 'analytics' },
  { name: 'Settings', icon: <Settings size={20} />, id: 'settings' },
];

export const MOCK_WHALES = [
  { id: '1', wallet: '0x742d...44e', asset: 'BTC', amount: '450', value: 28350000, type: 'buy', time: '2 mins ago' },
  { id: '2', wallet: '0x3fe4...12a', asset: 'ETH', amount: '12,500', value: 31250000, type: 'sell', time: '12 mins ago' },
  { id: '3', wallet: '0x992b...ff1', asset: 'SOL', amount: '85,000', value: 12750000, type: 'buy', time: '25 mins ago' },
  { id: '4', wallet: '0x112c...9e3', asset: 'BTC', amount: '120', value: 7560000, type: 'sell', time: '45 mins ago' },
  { id: '5', wallet: '0x88ab...3c2', asset: 'USDT', amount: '5,000,000', value: 5000000, type: 'buy', time: '1 hour ago' },
];

export const FORMAT_CURRENCY = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const FORMAT_COMPACT = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};
