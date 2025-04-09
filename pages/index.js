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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateResume = () => {
    const resume = `РЕЗЮМЕ

ФИО: ${form.fullName}
Профессия: ${form.profession}

Опыт работы:
${form.experience || "• Опыт работы будет подставлен сюда..."}

Образование:
${form.education || "• Укажите информацию об образовании."}

Навыки:
${form.skills || "• Ваши ключевые навыки."}

Цель:
Хочу применить свои знания и опыт в компании, где ценятся профессионализм и развитие.`;

    setResult(resume);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        ResumeGen — Генератор Резюме (без ИИ)
      </h1>

      <input name="fullName" placeholder="ФИО" onChange={handleChange} />
      <input name="profession" placeholder="Желаемая должность" onChange={handleChange} />
      <textarea name="experience" placeholder="Опыт работы" rows={4} onChange={handleChange} />
      <textarea name="education" placeholder="Образование" rows={3} onChange={handleChange} />
      <textarea name="skills" placeholder="Ключевые навыки" rows={3} onChange={handleChange} />

      <button onClick={generateResume} style={{ marginTop: 10 }}>
        Сгенерировать резюме
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