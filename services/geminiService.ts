import { GoogleGenAI, Type } from "@google/genai";
import { DomainValuation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDomain = async (domain: string): Promise<DomainValuation> => {
  const modelId = "gemini-2.5-flash"; // Excellent for reasoning and structured data

  const response = await ai.models.generateContent({
    model: modelId,
    contents: `Analyze the value of the domain name: "${domain}". 
    Provide a professional appraisal estimation based on length, TLD, keywords, brandability, and market trends.
    Be realistic, do not overinflate values for obscure names.
    
    Additionally, suggest 5 alternative domain names that serve as good substitutes. These should be:
    1. Variations using different TLDs (e.g., .io, .ai, .co)
    2. Brandable variations (adding prefixes/suffixes)
    3. Keyword-rich alternatives
    For each alternative, explain why it's a good choice and provide a rough price estimate (e.g., "Standard Registration" or "Premium Market").`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          domainName: { type: Type.STRING },
          estimatedValueRange: { type: Type.STRING, description: "e.g., $1,500 - $2,500" },
          numericValueMin: { type: Type.NUMBER, description: "Minimum estimated value in USD" },
          numericValueMax: { type: Type.NUMBER, description: "Maximum estimated value in USD" },
          currency: { type: Type.STRING, description: "Currency symbol, usually $" },
          executiveSummary: { type: Type.STRING, description: "A 2-3 sentence overview of why the domain has this value." },
          metrics: {
            type: Type.OBJECT,
            properties: {
              memorability: { type: Type.NUMBER, description: "Score 1-10" },
              keywordValue: { type: Type.NUMBER, description: "Score 1-10" },
              brandability: { type: Type.NUMBER, description: "Score 1-10" },
              tldQuality: { type: Type.NUMBER, description: "Score 1-10" },
              marketDemand: { type: Type.NUMBER, description: "Score 1-10" },
            },
            required: ["memorability", "keywordValue", "brandability", "tldQuality", "marketDemand"]
          },
          strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 3-4 key strengths"
          },
          weaknesses: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 2-3 potential weaknesses"
          },
          potentialUses: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 industries or use cases"
          },
          similarSales: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                domain: { type: Type.STRING },
                price: { type: Type.STRING },
                year: { type: Type.STRING }
              }
            },
            description: "3 comparable domain sales (historical or estimated/hypothetical based on pattern)"
          },
          alternatives: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                domain: { type: Type.STRING },
                reason: { type: Type.STRING },
                estimatedPrice: { type: Type.STRING }
              }
            },
            description: "5 suggested alternative domains"
          }
        },
        required: [
          "domainName", 
          "estimatedValueRange", 
          "numericValueMin", 
          "numericValueMax", 
          "currency", 
          "executiveSummary", 
          "metrics", 
          "strengths", 
          "weaknesses", 
          "potentialUses",
          "similarSales",
          "alternatives"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as DomainValuation;
};