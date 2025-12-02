// Gemini AI Service for TechNova
// Using Google's Gemini API for AI chat with image analysis support

import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from "@shared/schema";
import { GEMINI_MODEL_STANDARD, GEMINI_MODEL_THINKING } from "@shared/schema";

// Lazy initialization to avoid errors when API key is not set
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const SYSTEM_PROMPT = `You are the TechNova AI Assistant, a helpful and knowledgeable guide for our futuristic electronics store. 

About TechNova:
- We sell cutting-edge technology: smartphones, wearables, audio equipment, and smart home devices
- Our products feature advanced technologies like holographic displays, neural ANC, and quantum processors
- We pride ourselves on innovation and customer experience

Your role:
1. Help customers find the right products for their needs
2. Answer technical questions about our products
3. Provide comparisons between products when asked
4. Analyze images of gadgets when customers share them
5. Be enthusiastic about technology while remaining helpful

Our current product lineup:
- Xenon Ultra 5G ($1,299) - Flagship smartphone with holographic OLED, Quantum Snap 9 processor, 200MP camera
- Sonic Flow Pro ($349) - Premium headphones with Neural ANC, 80h battery, graphene drivers
- Visionary Glass ($2,499) - AR glasses with MicroLED, eye tracking, gesture control
- Nebula Watch X ($499) - Smartwatch with bio-sensor array, sapphire glass, 7-day battery
- Core Hub Max ($299) - Smart home hub with Matter support, 10" display, face recognition
- Titan Tab S9 ($1,199) - Professional tablet with 14.6" AMOLED, S-Pen, 16GB RAM

When analyzing images, identify the device type and provide relevant insights or comparisons to our products.

Keep responses concise but helpful. Use a friendly, tech-savvy tone.`;

interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export async function generateGeminiResponse(
  history: ChatMessage[],
  newMessage: string,
  image?: string,
  useThinkingMode: boolean = false
): Promise<string> {
  // Check if API key is available and get AI instance
  const ai = getAI();
  if (!ai) {
    return "I'm sorry, but the AI service is not configured. Please add your Gemini API key to enable the AI assistant.";
  }

  try {
    const currentParts: Part[] = [];

    // Add image if provided
    if (image) {
      const base64Data = image.split(',')[1] || image;
      currentParts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      });
    }

    currentParts.push({ text: newMessage });

    // Transform history to Gemini format (simplified to text only)
    const pastContent = history
      .filter(msg => msg.id !== 'welcome') // Skip welcome message
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text } as Part]
      }));

    // Select model based on thinking mode
    const modelName = useThinkingMode ? GEMINI_MODEL_THINKING : GEMINI_MODEL_STANDARD;
    
    // Build configuration
    const config: Record<string, unknown> = {
      systemInstruction: SYSTEM_PROMPT,
    };

    if (useThinkingMode) {
      // For thinking mode, use higher token budget
      config.thinkingConfig = { thinkingBudget: 16384 };
    } else {
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
    
    // Provide helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "There's an issue with the AI service configuration. Please ensure your API key is valid.";
      }
      if (error.message.includes('quota')) {
        return "The AI service is temporarily unavailable due to high demand. Please try again in a moment.";
      }
    }
    
    return "I encountered an error while processing your request. Please try again.";
  }
}
