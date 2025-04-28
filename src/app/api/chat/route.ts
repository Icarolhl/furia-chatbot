import { NextRequest, NextResponse } from 'next/server';
import botInstructions from '@/data/botInstructions.json';

const systemPrompt = botInstructions.prompt.join('\n');

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'furia-chatbot'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages
        ],
        temperature: 0.4
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(errorDetails);
      return new NextResponse('Erro interno', { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Opa! Tivemos uma pausa na nossa conexão. Tente mandar sua pergunta de novo! ⚡' },
      { status: 500 }
    );
  }
  
}
