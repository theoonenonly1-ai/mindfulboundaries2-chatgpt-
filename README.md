# THEOONE Office AI — Premium System

> Nicht mehr KI. Bessere Arbeitsabläufe mit KI.

THEOONE Office AI ist jetzt als nutzbare Workflow-Anwendung strukturiert.

## Enthalten

- 50 Arbeits-Workflows
- 100 Prompt-Vorlagen: 50 Standard + 50 Präzision
- Standard-/Präzisionsmodus
- Suche und Kategorien
- Präzisionsfelder
- Copy-to-Clipboard
- Favoriten
- lokaler Verlauf
- Produkt-/Technik-Spezifikation
- Roadmap für sichere serverseitige KI-Ausführung

## Kernprinzip

**Aufgabe → Kontext → Ergebnis → Prüfung → Verbesserung**

Die Produktquellen verlangen insbesondere:
- keine erfundenen Fakten, Zahlen, Termine, Quellen oder Zusagen
- fehlende Angaben als [OFFEN]
- widersprüchliche Angaben sichtbar machen
- menschliche Prüfung bei sensiblen oder geschäftskritischen Inhalten

## Start

Die Workflow-Anwendung liegt in app.html.

Die Landingpage index.html bleibt als Verkaufs-/Produktseite bestehen.

## Projektstruktur

- index.html — Produkt-/Verkaufsseite
- app.html — Workflow-Anwendung
- app.css — App-Design
- app.js — Workflow-/Prompt-Engine
- data/workflows.json — 50 Workflows
- docs/INTEGRATION-GITTERBLICK.md — Integration des im Chat „gitterblick prüfen“ begonnenen Projekts
- PRODUCT_SPEC.md — technische Produktspezifikation
- docs/ROADMAP.md — weiterer Ausbau

## Sicherheit

Keine Provider-API-Keys in Browser-Code speichern. Die spätere KI-Ausführung wird serverseitig angebunden.
