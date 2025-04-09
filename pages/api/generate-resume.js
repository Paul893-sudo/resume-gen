export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ result: "Missing OpenAI API key." });
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Ты профессиональный HR-специалист, который пишет деловые резюме на русском." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await completion.json();
    const message = data.choices?.[0]?.message?.content;
    res.status(200).json({ result: message });
  } catch (error) {
    res.status(500).json({ result: "Ошибка при обращении к OpenAI." });
  }
}