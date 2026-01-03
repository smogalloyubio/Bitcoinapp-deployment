
import { CoinData, GlobalMetrics } from '../types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export const fetchTopCoins = async (): Promise<CoinData[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=true&price_change_percentage=24h`
    );
    if (!response.ok) {
        if(response.status === 429) throw new Error("API Limit reached. Please wait a moment.");
        throw new Error("Failed to fetch market data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
};

export const fetchGlobalData = async (): Promise<GlobalMetrics> => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/global`);
    if (!response.ok) throw new Error("Failed to fetch global data");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching global data:", error);
    throw error;
  }
};
