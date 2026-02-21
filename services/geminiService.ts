import { GoogleGenAI } from "@google/genai";
import { Organisation } from '../types';

// Fix: Use Organisation type instead of any for better type safety
export async function getAIInsights(query: string, orgs: Organisation[]) {
  // Fix: Use process.env.GEMINI_API_KEY as per system guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const systemInstruction = `
    You are an expert consultant for the Farmed Animal Advocacy Directory. 
    Your role is to help users navigate the directory of African Farmed Animal Advocacy organisations.
    You have access to a list of organisations. Animal Advocacy Africa (AAA) is a key partner in this project.
    Analyze the user's query and provide helpful, professional insights about which organisations might be relevant or how they can collaborate.
    ALWAYS use British English (e.g., organisation, programme, decentralised).
    Keep responses concise and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context Organisations: ${JSON.stringify(orgs)}\n\nUser Query: ${query}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Fix: Directly access the .text property from the response
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again or browse the directory manually.";
  }
}