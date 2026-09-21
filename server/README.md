# THEOONE Office AI — Server API

## Zweck
Serverseitige KI-Ausführung für die bestehende Workflow-Anwendung.

## Start
1. Node.js installieren.
2. In diesem Ordner `npm install` ausführen.
3. `.env.example` nach `.env` kopieren.
4. Den echten API-Schlüssel ausschließlich in `.env` eintragen.
5. `npm start`.

## API
- GET `/api/health`
- POST `/api/generate`

Der Browser erhält niemals den API-Schlüssel.

## Wichtig
Die Anwendung nutzt die bestehenden THEOONE-Produktregeln: bereitgestellte Informationen verwenden, nichts erfinden, fehlende Angaben als [OFFEN] kennzeichnen und geschäftskritische Ergebnisse menschlich prüfen.
