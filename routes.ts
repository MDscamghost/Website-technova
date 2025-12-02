import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
import { generateGeminiResponse } from "./gemini";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Chat API endpoint for Gemini AI
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body
      const parseResult = chatRequestSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: "Invalid request format",
          details: parseResult.error.issues 
        });
      }

      const { message, history, image, useThinkingMode } = parseResult.data;

      // Generate response from Gemini
      const responseText = await generateGeminiResponse(
        history,
        message,
        image,
        useThinkingMode
      );

      res.json({ text: responseText });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ 
        error: "Failed to process chat request",
        text: "I encountered an error. Please try again." 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString() 
    });
  });

  return httpServer;
}
