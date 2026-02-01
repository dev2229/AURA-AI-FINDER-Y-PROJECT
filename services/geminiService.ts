
import { GoogleGenAI, Type } from "@google/genai";
import { AITool, PricingModel } from "../types.ts";

export async function findToolsForTask(query: string): Promise<AITool[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Identify exactly 20 of the most reputable and reliable AI tools relevant to the request: "${query}". 
      Requirements:
      1. Use only currently operational, real-world tools.
      2. Provide realistic user ratings (1.0 to 5.0).
      3. Provide a realistic review count estimate (e.g. 10k+, 500+).
      4. Ensure a mix of pricing models: Free, Freemium, or Paid.
      5. Rank them by quality and utility for the specific task.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              pricing_model: { 
                type: Type.STRING, 
                description: "Must be one of: Free, Freemium, Paid"
              },
              rating: { type: Type.NUMBER },
              review_count: { type: Type.STRING, description: "Popularity, e.g., '12k+', '850+'" },
              url: { type: Type.STRING },
              category: { type: Type.STRING },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["name", "description", "pricing_model", "rating", "review_count", "url", "category"],
          }
        },
        systemInstruction: "You are the lead intelligence analyst for AI Finder. You must provide a high-quality list of real AI tools. Never hallucinate names or URLs. Ensure rating and review counts reflect general consensus."
      },
    });

    const results = JSON.parse(response.text || "[]");
    
    return results.map((tool: any, index: number) => ({
      ...tool,
      id: `tool-${index}-${Date.now()}`,
    }));
  } catch (error) {
    console.error("Error finding tools:", error);
    // Return fallback tools in case of error
    return [
      {
        id: "fallback-1",
        name: "ChatGPT",
        description: "The industry standard for conversational AI and writing.",
        // Fix: Using PricingModel enum instead of string literal to match type definition
        pricing_model: PricingModel.FREEMIUM,
        rating: 4.9,
        review_count: "1M+",
        url: "https://chat.openai.com",
        category: "Writing",
        tags: ["LLM", "Chat"]
      },
      {
        id: "fallback-2",
        name: "Claude",
        description: "Highly capable AI known for advanced reasoning and coding skills.",
        // Fix: Using PricingModel enum instead of string literal to match type definition
        pricing_model: PricingModel.FREEMIUM,
        rating: 4.8,
        review_count: "500k+",
        url: "https://claude.ai",
        category: "Reasoning",
        tags: ["LLM", "Coding"]
      }
    ];
  }
}
