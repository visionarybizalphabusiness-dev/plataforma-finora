import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const body = await req.json();
    const { transacoes, metas, mes } = body;

    const prompt = `
      Gere uma análise de gamificação financeira baseada nos dados abaixo:

      Transações: ${JSON.stringify(transacoes)}
      Metas: ${JSON.stringify(metas)}
      Mês: ${mes}

      Gere:
      - Score financeiro (0-100)
      - Badges desbloqueadas
      - Pontos de melhoria
      - Meta recomendada
      - Progresso mensal
    `;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: prompt,
    });

    return NextResponse.json({
      gamificacao: response.output_text,
    });

  } catch (error) {
    console.error("ERRO NA IA:", error);
    return NextResponse.json(
      { error: "Erro ao gerar gamificação" },
      { status: 500 }
    );
  }
}

