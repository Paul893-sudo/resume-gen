export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ result: "Метод не поддерживается" });
  }

  const { prompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Нет API ключа OpenAI" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await openaiRes.json();

    if (data?.choices?.[0]?.text) {
      return res.status(200).json({ result: data.choices[0].text });
    } else {
      console.error("OpenAI response:", JSON.stringify(data)); // 💥 Покажет в логах причину
      return res.status(500).json({ result: "Ошибка генерации OpenAI (response empty)" });
    }
  } catch (error) {
    console.error("OpenAI error:", error); // 💥 Покажет ошибку в логах
    return res.status(500).json({ result: "Ошибка сервера при запросе к OpenAI" });
  }
}
