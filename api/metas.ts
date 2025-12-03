import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { historico } = req.body;

    const prompt = `
      Gere uma meta financeira personalizada com base no histórico:
      ${JSON.stringify(historico)}

      Retorne:
      - Meta recomendada
      - Por que essa meta é realista
      - O que o usuário precisa ajustar para bater a meta
      - Uma dica prática para hoje
    `;

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: prompt,
    });

    res.status(200).json({
      meta: response.output_text,
    });

  } catch (err) {
    console.error("ERRO IA:", err);
    res.status(500).json({ error: "Erro ao gerar meta" });
  }
}
