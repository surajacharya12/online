import { NextResponse } from 'next/server';

export async function POST(req) {
  const { topic } = await req.json();

  const prompt = `Generate a quiz with 5 multiple-choice questions about the topic: "${topic}".
Each question should be a JSON object like this:
{
  "question": "Your question?",
  "options": ["A", "B", "C", "D"],
  "answer": "Correct answer"
}
Return an array of 5 such question objects in valid JSON format.
Do not include any markdown or code fences (like \`\`\`json) in the response. Return only the pure JSON.`;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return NextResponse.json({ quiz: content || 'No quiz generated.' });
}
