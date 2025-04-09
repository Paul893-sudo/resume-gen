export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ result: "Метод не поддерживается" });
  }

  const { prompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Нет API ключа OpenAI" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Ты профессиональный HR, который пишет идеальные деловые резюме на русском.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await openaiRes.json();

    if (data?.choices?.[0]?.message?.content) {
      return res.status(200).json({ result: data.choices[0].message.content });
    } else {
      return res.status(500).json({ result: "Ошибка генерации OpenAI" });
    }
  } catch (error) {
    return res.status(500).json({ result: "Ошибка сервера при запросе к OpenAI" });
  }
}
