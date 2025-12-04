import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const body = await req.json();
    const { transacoes, mes } = body;

    const prompt = `
      Gere um relatório financeiro completo baseado nas transações:

      Transações: ${JSON.stringify(transacoes)}
      Mês: ${mes}

      Gere:
      - Resumo do mês
      - Categorias mais gastas
      - Oportunidades de economia
      - gráfico financeiro em texto
      - análise de comportamento financeiro
    `;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: prompt,
    });

    return NextResponse.json({
      relatorio: response.output_text,
    });

  } catch (error) {
    console.error("ERRO NA IA:", error);
    return NextResponse.json(
      { error: "Erro ao gerar relatório" },
      { status: 500 }
    );
  }
}
