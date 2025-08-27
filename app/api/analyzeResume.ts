// app/routes/api/analyzeResume.ts
import type { RequestHandler } from 'react-router';
import { prepareInstructions } from '~/data/resume';

// Server-only Puter wrapper
const getPuterServer = () => {
  if (typeof window !== 'undefined') {
    throw new Error('puterServer can only be used on the server');
  }

  if (!process.env.PUTER_API_KEY) {
    throw new Error('PUTER_API_KEY missing in environment variables');
  }

  return {
    ai: {
      feedback: async (resumePath: string, message: string) => {
        const response = await fetch('https://api.heyputer.com/ai/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.PUTER_API_KEY}`,
          },
          body: JSON.stringify({ resumePath, message }),
        });

        if (!response.ok) throw new Error('Failed to get AI feedback');
        return response.json();
      },
    },
  };
};

// Correct destructuring: { request } is the argument
export const post: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { resumePath, jobTitle, jobDescription } = body;
    const { ai } = getPuterServer(); // server-only

    const feedback = await ai.feedback(
      resumePath,
      prepareInstructions({ jobTitle, jobDescription })
    );

    return new Response(JSON.stringify({ success: true, feedback }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Something went wrong',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
