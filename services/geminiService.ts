
import { GoogleGenAI } from "@google/genai";
import { CoinData } from "../types";

export const getMarketAnalysis = async (coins: CoinData[]): Promise<string> => {
  // Use the environment variable as per professional standards
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    return ""; // Triggers the 'Connect Key' UI
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const marketSummary = coins.slice(0, 10).map(c => 
      `${c.name}: $${c.current_price} (${c.price_change_percentage_24h.toFixed(2)}%)`
    ).join(', ');

    const prompt = `
      Act as a Lead Cryptocurrency Analyst. 
      Analyze this real-time data for the top 10 assets: ${marketSummary}.
      Provide a highly professional 3-sentence executive summary:
      1. Characterize the current macro sentiment (e.g., Bullish accumulation, Bearish distribution, or Neutral consolidation).
      2. Highlight the most significant statistical outlier among the top assets.
      3. Project a short-term volatility outlook for the next 4-8 hours.
      Tone: Technical, institutional, and direct.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    return response.text || "Analysis pending...";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Handle key errors by returning an empty string to prompt re-connection if needed
    if (error instanceof Error && error.message.includes("API key")) {
        return "Authentication Error: Please check your Gemini API key permissions.";
    }
    return "The AI engine is currently syncing with global nodes. Please stand by.";
  }
};
