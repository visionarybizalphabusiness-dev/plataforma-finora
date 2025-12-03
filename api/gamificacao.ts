import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { transacoes, metas, mes } = req.body;

    const prompt = `
      Analise os dados do usuário e gere:

      - Score financeiro (0 a 100)
      - Badges desbloqueadas
      - Progresso do mês
      - Pontos de melhoria
      - Próximo objetivo recomendado

      Transações: ${JSON.stringify(transacoes)}
      Metas: ${JSON.stringify(metas)}
      Mês: ${mes}
    `;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: prompt,
    });

    res.status(200).json({
      gamificacao: response.output_text,
    });

  } catch (err) {
    console.error("ERRO IA:", err);
    res.status(500).json({ error: "Erro ao gerar gamificação" });
  }
}
