
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface WhaleTransaction {
  id: string;
  wallet: string;
  amount: string;
  asset: string;
  value: number;
  type: 'buy' | 'sell';
  time: string;
}

export interface GlobalMetrics {
  active_cryptocurrencies: number;
  total_market_cap: number;
  total_volume: number;
  market_cap_percentage: { [key: string]: number };
}
