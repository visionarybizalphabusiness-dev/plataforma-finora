import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const { renda, gastos, objetivo } = await req.json();

    const prompt = `
      Usuário:
      Renda: ${renda}
      Gastos: ${JSON.stringify(gastos)}
      Objetivo: ${objetivo}

      Gere:
      - Meta recomendada por mês
      - Quanto guardar por semana
      - Percentual ideal de economia
      - Dicas personalizadas
    `;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: prompt,
    });

    return NextResponse.json({
      metas: response.output_text,
    });

  } catch (error) {
    console.error("ERRO:", error);
    return NextResponse.json(
      { error: "Erro ao gerar metas" },
      { status: 500 }
    );
  }
}
