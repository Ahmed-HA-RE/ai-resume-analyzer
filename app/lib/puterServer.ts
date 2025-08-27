// lib/puterServer.ts
import type { AIResponse } from 'types/puter';

export const usePuterServer = () => {
  if (typeof window !== 'undefined') {
    throw new Error('puterServer can only be used on the server');
  }

  if (!process.env.PUTER_API_KEY) {
    throw new Error('Puter API key missing in environment variables');
  }

  // Example server-side Puter API
  return {
    ai: {
      feedback: async (
        resumePath: string,
        message: string
      ): Promise<AIResponse> => {
        // Call Puter AI via server
        // This depends on Puter SDK/server API
        // Example placeholder:
        const response = await fetch('https://api.heyputer.com/ai/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.PUTER_API_KEY}`,
          },
          body: JSON.stringify({ resumePath, message }),
        });

        if (!response.ok) throw new Error('Failed to get feedback');

        return response.json();
      },
    },
  };
};
