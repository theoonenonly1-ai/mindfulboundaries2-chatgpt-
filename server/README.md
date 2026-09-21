# THEOONE Office AI — Deployment

## Ziel
Die App besteht aus einer statischen Oberfläche und einer serverseitigen API. Die API hält den KI-Schlüssel geheim.

## Vercel
Das Repository enthält bereits `vercel.json`. Nach dem Import des GitHub-Repositories in Vercel:
1. Project erstellen/importieren.
2. Keine API-Keys in Dateien eintragen.
3. In den Project Settings unter Environment Variables setzen:
   - `OPENAI_API_KEY` = dein API-Schlüssel
   - optional `OPENAI_MODEL` = gewünschtes Modell
4. Redeploy ausführen.
5. `/api/health` öffnen und prüfen, ob die API erreichbar ist.

## Sicherheit
`.env`, `.env.*` und `node_modules` sind bereits aus Git ausgeschlossen. Der API-Key darf niemals in `app.js`, `app.html` oder anderen Browser-Dateien stehen.

## Nutzung
Die Workflow-Oberfläche kann weiterhin ohne API-Verbindung Prompts erzeugen und kopieren. Nach erfolgreicher Server-Konfiguration kann die KI serverseitig ausgeführt werden.
