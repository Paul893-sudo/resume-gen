import { useState } from "react";

export default function ResumeGen() {
  const [form, setForm] = useState({
    fullName: "",
    profession: "",
    experience: "",
    education: "",
    skills: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    setLoading(true);
    setResult("");

    const prompt = `Сгенерируй профессиональное, деловое резюме на русском языке на основе следующих данных:

ФИО: ${form.fullName}
Профессия: ${form.profession}
Опыт работы: ${form.experience}
Образование: ${form.education}
Навыки: ${form.skills}

Резюме должно быть оформлено в структурированном виде, с разделами, без лишней воды, но с грамотными формулировками.`;

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result || "Ошибка генерации");
    } catch (err) {
      setResult("Произошла ошибка при генерации резюме.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        ResumeGen — Генератор Резюме
      </h1>

      <input name="fullName" placeholder="ФИО" onChange={handleChange} />
      <input name="profession" placeholder="Желаемая должность" onChange={handleChange} />
      <textarea name="experience" placeholder="Опыт работы" rows={4} onChange={handleChange} />
      <textarea name="education" placeholder="Образование" rows={3} onChange={handleChange} />
      <textarea name="skills" placeholder="Ключевые навыки" rows={3} onChange={handleChange} />

      <button onClick={generateResume} disabled={loading}>
        {loading ? "Генерация..." : "Сгенерировать резюме"}
      </button>

      {result && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc", background: "#f9f9f9" }}>
          <h2 style={{ fontSize: 18, fontWeight: "bold" }}>Ваше резюме:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}