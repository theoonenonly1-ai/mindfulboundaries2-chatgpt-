const RULES=[
 "Nutze ausschließlich die bereitgestellten Informationen.",
 "Erfinde keine Fakten, Zahlen, Termine, Quellen oder Zusagen.",
 "Fehlende Angaben mit [OFFEN] markieren.",
 "Unklare oder widersprüchliche Angaben kennzeichnen.",
 "Bei sensiblen oder geschäftskritischen Inhalten ist menschliche Prüfung erforderlich."
];

export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"Nur POST ist erlaubt."});
 try{
  if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:"OPENAI_API_KEY ist auf dem Server noch nicht konfiguriert."});
  const {workflow,mode="standard",input="",fields={}}=req.body||{};
  if(!workflow?.title) return res.status(400).json({error:"workflow.title fehlt."});
  if(!String(input).trim()) return res.status(400).json({error:"input fehlt."});
  const precision=mode==="precision"
   ? [["Zielgruppe / Empfänger",fields.recipient],["Gewünschte Wirkung",fields.effect],["Ausgabeformat",fields.format],["Länge",fields.length],["Ton",fields.tone],["Pflichtinformationen",fields.required],["Nicht enthalten",fields.exclude]]
     .map(([k,v])=>`${k}: ${v||"[OFFEN]"}`).join("\n")
   : "Modus: Standard";
  const prompt=[
   `Workflow: ${workflow.id}. ${workflow.title}`,
   `Beschreibung: ${workflow.description || ""}`,
   `Modus: ${mode}`,
   precision,
   "Input:",
   String(input),
   "",
   "Produktregeln:",
   ...RULES.map(r=>"- "+r),
   "",
   "Erstelle das gewünschte Ergebnis direkt. Gib keine erfundenen Angaben hinzu."
  ].join("\n");
  const response=await fetch("https://api.openai.com/v1/responses",{
   method:"POST",
   headers:{"Content-Type":"application/json","Authorization":`Bearer ${process.env.OPENAI_API_KEY}`},
   body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",input:prompt})
  });
  const data=await response.json();
  if(!response.ok) return res.status(response.status).json({error:data.error?.message||"KI-Anfrage fehlgeschlagen."});
  return res.status(200).json({output:data.output_text||"",model:process.env.OPENAI_MODEL||"gpt-5.6-luna"});
 }catch(e){return res.status(500).json({error:"Serverfehler bei der KI-Ausführung."});}
}