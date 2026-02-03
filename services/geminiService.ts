
import { GoogleGenAI, Type } from "@google/genai";

export const generateLegalDraft = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a professional KMS legal article summary based on these notes: "${userInput}". Ensure the output is structured for a legal knowledge management system.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Catchy legal article title" },
            summary: { type: Type.STRING, description: "Detailed professional summary of the advice" },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Relevant legal category tags" 
            },
          },
          required: ["title", "summary", "tags"]
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
