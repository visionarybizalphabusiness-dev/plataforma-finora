import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const { transacoes, metas } = await req.json();

    const prompt = `
      Gere 3 notificações financeiras inteligentes.

      Baseado em:
      Transações: ${JSON.stringify(transacoes)}
      Metas: ${JSON.stringify(metas)}

      Notificações devem ser:
      - Curtas
      - Motivacionais
      - Diretas
    `;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: prompt,
    });

    return NextResponse.json({
      notificacoes: response.output_text,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao gerar notificações" },
      { status: 500 }
    );
  }
}
