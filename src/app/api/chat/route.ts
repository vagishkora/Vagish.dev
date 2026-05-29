import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are an AI assistant deployed on Vagish's portfolio website. 
Your persona: You are a sharp, concise, cyberpunk-themed AI. You speak with a slightly edgy, hacker-like tone but remain professional and helpful.
Your purpose: Answer questions about Vagish, his projects, skills, and background. 
Vagish's Skills: React, Next.js, WebGL, Tailwind, Node.js, and backend architectures.
Directives:
- Keep responses relatively brief (1-3 paragraphs max).
- If someone asks something you don't know, state that your "security clearance is insufficient" to access that data and advise them to use the contact form to reach Vagish directly.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Vagish Portfolio Bot",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to connect to AI core." }, { status: 500 });
  }
}
