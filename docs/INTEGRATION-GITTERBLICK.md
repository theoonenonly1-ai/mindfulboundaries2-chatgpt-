# THEOONE Office AI — Integration in den Gitterblick-Prüfen-Stand

Dieses Repository ist jetzt die technische Heimat für das im Chat „gitterblick prüfen“ begonnene THEOONE Office AI Projekt.

## Produktquelle

Die vorhandenen Quellen definieren:
- 50 Arbeits-Workflows
- 100 sofort nutzbare Prompt-Vorlagen (je Workflow Standard + Präzision)
- Workflow Planner
- Prompt Upgrade System
- Qualitätsprinzip: Aufgabe → Kontext → Ergebnis → Prüfung → Verbesserung
- Schutzregel: keine erfundenen Fakten; fehlende Angaben = [OFFEN]
- menschliche Prüfung bei sensiblen oder geschäftskritischen Inhalten

## Technische Umsetzung

Die 50 Workflows liegen in data/workflows.json.

Die App app.html + app.js bildet daraus die beiden Prompt-Modi:

### Standard

Rolle → Aufgabe → Kontext → Input → Ziel → Format → Regeln.

### Präzision

Aufgabe → Arbeitsprinzip → Input → Zielgruppe/Empfänger → gewünschte Wirkung → Ausgabeformat → Länge → Ton → Pflichtinformationen → Ausschlüsse → Qualitätsprüfung.

Damit werden die 50 Workflows technisch zu 100 nutzbaren Prompt-Vorlagen: 50 Standard + 50 Präzision.

## Ablauf

1. Workflow auswählen
2. Kontext/Input eingeben
3. Standard oder Präzision wählen
4. Prompt erzeugen
5. Prompt kopieren und in einem KI-Modell ausführen
6. Ergebnis gegen die bereitgestellten Informationen prüfen
7. Gute Version für wiederkehrende Aufgaben speichern

## Ergänzt

- mobile Workflow-Oberfläche
- Suche und Kategorien
- Standard-/Präzisionsmodus
- Präzisionsfelder
- Copy-to-Clipboard
- Favoriten via LocalStorage
- lokaler Verlauf
- 50 Workflows aus der Produktstruktur
- keine API-Schlüssel im Frontend

## Bewusst getrennt

Die eigentliche KI-Ausführung ist noch nicht im Browser verdrahtet. Das bleibt serverseitig, damit API-Schlüssel nicht im Frontend landen.

Die Verkaufsseite index.html wurde nicht unnötig überschrieben.

## Nächste Ausbaustufe

- serverseitige AI-Execution-API
- echtes Planner-Modul
- gespeicherte eigene Workflows
- Accounts und Premium-Entitlements
- Stripe-Anbindung
- Datenschutz/Impressum/AGB
- produktionsreife Fehler- und Validierungslogik
