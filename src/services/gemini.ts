import { GoogleGenAI, Type } from "@google/genai";
import { StylePreference, Recommendation, VisualInput } from "../types";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey });

export const getFashionRecommendation = async (
  preferences: StylePreference,
  visualInput?: VisualInput
): Promise<Recommendation> => {
  const model = visualInput ? "gemini-2.5-flash-image" : "gemini-3-flash-preview";

  const prompt = `
    As a world-class fashion stylist, provide a personalized outfit recommendation based on the following preferences:
    - Occasion: ${preferences.occasion}
    - Style: ${preferences.styleType}
    - Budget: ${preferences.budget}
    - Preferred Colors: ${preferences.preferredColors.join(", ")}
    - Target: ${preferences.gender}

    ${visualInput ? "I have also uploaded an image of an item or a look I like. Please incorporate or analyze this in your recommendation." : ""}

    Please provide the response in JSON format with the following structure:
    {
      "outfitDescription": "A detailed description of the recommended outfit",
      "stylingTips": ["Tip 1", "Tip 2", "Tip 3"],
      "keyPieces": ["Piece 1", "Piece 2"],
      "trendInsight": "A brief insight into why this is currently trending"
    }
  `;

  const parts: any[] = [{ text: prompt }];
  if (visualInput) {
    parts.push({
      inlineData: {
        data: visualInput.base64.split(",")[1] || visualInput.base64,
        mimeType: visualInput.mimeType,
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          outfitDescription: { type: Type.STRING },
          stylingTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          keyPieces: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          trendInsight: { type: Type.STRING },
        },
        required: ["outfitDescription", "stylingTips", "keyPieces", "trendInsight"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as Recommendation;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Failed to generate recommendation");
  }
};

export const getTrendInsights = async (): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "What are the top 3 global fashion trends for the current season? Provide a brief, stylish summary.",
  });
  return response.text || "Trends are evolving rapidly. Stay tuned!";
};
