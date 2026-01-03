
import { GoogleGenAI } from "@google/genai";
import { CoinData } from "./types";

export const getMarketAnalysis = async (coins: CoinData[]): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    return ""; 
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
      1. Characterize the current macro sentiment.
      2. Highlight the most significant statistical outlier.
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
    return "The AI engine is currently optimizing models. Please stand by.";
  }
};
