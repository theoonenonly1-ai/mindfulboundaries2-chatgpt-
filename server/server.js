import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

const RULES = [
  "Nutze ausschließlich die bereitgestellten Informationen.",
  "Erfinde keine Fakten, Zahlen, Termine, Quellen oder Zusagen.",
  "Fehlende Angaben mit [OFFEN] markieren.",
  "Unklare oder widersprüchliche Angaben kennzeichnen.",
  "Bei sensiblen oder geschäftskritischen Inhalten ist menschliche Prüfung erforderlich."
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "THEOONE Office AI", model: MODEL });
});

app.post("/api/generate", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "OPENAI_API_KEY ist auf dem Server noch nicht konfiguriert." });
    }

    const { workflow, mode = "standard", input = "", fields = {} } = req.body || {};
    if (!workflow?.title) return res.status(400).json({ error: "workflow.title fehlt." });
    if (!input.trim()) return res.status(400).json({ error: "input fehlt." });

    const precision = mode === "precision"
      ? [
          ["Zielgruppe / Empfänger", fields.recipient],
          ["Gewünschte Wirkung", fields.effect],
          ["Ausgabeformat", fields.format],
          ["Länge", fields.length],
          ["Ton", fields.tone],
          ["Pflichtinformationen", fields.required],
          ["Nicht enthalten", fields.exclude]
        ].map(([k,v]) => `${k}: ${v || "[OFFEN]"}`).join("\n")
      : "Modus: Standard";

    const prompt = [
      `Workflow: ${workflow.id}. ${workflow.title}`,
      `Beschreibung: ${workflow.description || ""}`,
      `Modus: ${mode}`,
      precision,
      "Input:",
      input,
      "",
      "Produktregeln:",
      ...RULES.map(r => "- " + r),
      "",
      "Erstelle das gewünschte Ergebnis direkt. Gib keine erfundenen Angaben hinzu."
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        input: prompt
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || "KI-Anfrage fehlgeschlagen." });

    const output = data.output_text || "";
    res.json({ output, model: MODEL });
  } catch (error) {
    res.status(500).json({ error: "Serverfehler bei der KI-Ausführung." });
  }
});

app.listen(PORT, () => console.log(`THEOONE Office AI API läuft auf Port ${PORT}`));
