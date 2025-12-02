import { GoogleGenAI, Part } from "@google/genai";
import { ChatMessage } from "../types";
import { GEMINI_MODEL_STANDARD, GEMINI_MODEL_THINKING } from "../constants";

// NOTE: API Key is handled securely via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGeminiResponse = async (
  history: ChatMessage[],
  newMessage: string,
  image?: string,
  useThinkingMode: boolean = false
): Promise<string> => {
  try {
    // Construct the content parts
    const currentParts: Part[] = [];

    if (image) {
      // Extract base64 data if it has a prefix
      const base64Data = image.split(',')[1] || image;
      currentParts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg/png for simplicity from canvas/input
          data: base64Data
        }
      });
    }

    currentParts.push({ text: newMessage });

    // Transform internal history to Gemini Content format
    // We filter out messages that might be system notifications or errors if we had them,
    // but here we assume all in history are valid chat turns.
    const pastContent = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text } as Part] // We simplify past history to text-only to save tokens/bandwidth, or we could store images too.
    }));

    // Configuration
    const modelName = useThinkingMode ? GEMINI_MODEL_THINKING : GEMINI_MODEL_STANDARD;
    const config: any = {};

    if (useThinkingMode) {
      config.thinkingConfig = { thinkingBudget: 32768 };
      // Note: We do NOT set maxOutputTokens when thinkingBudget is set, as per guidelines/user request.
    } else {
       // Standard safe defaults
       config.maxOutputTokens = 1000;
       config.temperature = 0.7;
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [...pastContent, { role: 'user', parts: currentParts }],
      config: config
    });

    return response.text || "I couldn't generate a response at this time.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again.";
  }
};
