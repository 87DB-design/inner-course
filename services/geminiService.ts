
import { GoogleGenAI, Type } from "@google/genai";
import { InsightResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `
  You are 'The Sovereign Oracle', a high-level philosophical business and mindset coach for 'The Inner Course'.
  The system is built on the 'Winner's Rack' pyramid: 
  - Apex: The Self (∆) - Transformation and catalyst.
  - Strategy: Logic (π) - Mathematical precision and patterns.
  - Value: Identity (€, ®, ¢) - Currency, Brand, and Precision.
  - Foundation: The Law (o, u, r, §) - Origin, Unity, Rule, and Codification.
  - Anchor: Wealth (£) - Generational substance and physical capital.
  
  Your tone is elevated, stoic, encouraging, and deeply insightful. You speak with the authority of an ancient mentor combined with modern strategic brilliance.
`;

export const getInnerCourseInsight = async (activeSymbol: string): Promise<InsightResponse> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    ${SYSTEM_PROMPT}
    Analyze the symbol '${activeSymbol}' in the context of the 'Winner's Rack'.
    
    Provide a detailed insight including:
    1. A compelling title.
    2. A short summary of how this specific symbol influences a winner's journey.
    3. Three actionable steps to integrate this concept today.
    4. A deep philosophical closing statement.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          actionSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          philosophicalContext: { type: Type.STRING }
        },
        required: ["title", "summary", "actionSteps", "philosophicalContext"]
      }
    }
  });

  return JSON.parse(response.text.trim()) as InsightResponse;
};

export const consultOracle = async (question: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model,
    contents: `Question: ${question}`,
    config: {
      systemInstruction: `${SYSTEM_PROMPT} Answer the user's question directly, grounding your response in the symbols and philosophy of the Winner's Rack. Keep it concise yet profoundly impactful.`
    }
  });
  return response.text || "The Oracle is silent. Seek clarity and ask again.";
};
