import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { transacoes, mes } = req.body;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: `
        Você é um assistente financeiro do app FINORA.
        Gere um relatório claro, objetivo e motivador.

        Dados:
        Mês: ${mes}
        Transações: ${JSON.stringify(transacoes)}

        Responda com:
        - Total gasto
        - Total economizado
        - Categorias que mais pesaram
        - Alertas importantes
        - Recomendações reais de economia
        - Nota de saúde financeira (0–100)
        - Frase motivacional
      `,
    });

    res.status(200).json({
      relatorio: response.output_text,
    });

  } catch (err) {
    console.error("ERRO IA:", err);
    res.status(500).json({ error: "Erro ao gerar relatório" });
  }
}
