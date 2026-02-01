
import { GoogleGenAI, Type } from "@google/genai";
import { AITool, PricingModel } from "../types.ts";

export async function findToolsForTask(query: string): Promise<AITool[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a deep index search for exactly 20 currently active, high-utility AI tools for the user query: "${query}".
      
      Requirements:
      1. Prioritize tools launched or significantly updated in 2024-2025.
      2. Categorize accurately: LLM, Audio, Video, Design, Productivity, Dev, etc.
      3. Provide professional ratings (1.0 - 5.0) and review count estimations.
      4. Ensure URLs are real and direct (no generic search engine results).
      5. Include a diversity of pricing models: Free, Freemium, Paid.`,
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
                description: "Must be exactly 'Free', 'Freemium', or 'Paid'"
              },
              rating: { type: Type.NUMBER },
              review_count: { type: Type.STRING },
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
        systemInstruction: "You are the primary intelligence architect for AI Finder. You specialize in accurate, up-to-date identification of AI tools. You do not hallucinate products. You only return real, production-ready software."
      },
    });

    const results = JSON.parse(response.text || "[]");
    
    // Map string response to our PricingModel enum and add unique IDs
    return results.map((tool: any, index: number) => {
      let model = PricingModel.FREEMIUM;
      if (tool.pricing_model?.toLowerCase() === 'free') model = PricingModel.FREE;
      if (tool.pricing_model?.toLowerCase() === 'paid') model = PricingModel.PAID;

      return {
        ...tool,
        id: `node-${index}-${Date.now()}`,
        pricing_model: model
      };
    });
  } catch (error) {
    console.error("Discovery Engine Error:", error);
    // Return high-quality fallback tools
    return [
      {
        id: "fb-1",
        name: "ChatGPT Plus",
        description: "The world's most versatile LLM with advanced data analysis and image generation.",
        pricing_model: PricingModel.FREEMIUM,
        rating: 4.9,
        review_count: "2.4M+",
        url: "https://chat.openai.com",
        category: "LLM",
        tags: ["GPT-4o", "Multi-modal"]
      },
      {
        id: "fb-2",
        name: "Claude 3.5 Sonnet",
        description: "Leading model for reasoning, coding assistance, and human-like writing.",
        pricing_model: PricingModel.FREEMIUM,
        rating: 4.8,
        review_count: "800k+",
        url: "https://claude.ai",
        category: "Reasoning",
        tags: ["Coding", "Artifacts"]
      },
      {
        id: "fb-3",
        name: "Perplexity AI",
        description: "An AI-powered search engine that provides cited answers to complex questions.",
        pricing_model: PricingModel.FREE,
        rating: 4.7,
        review_count: "500k+",
        url: "https://perplexity.ai",
        category: "Search",
        tags: ["Research", "Citations"]
      }
    ];
  }
}
