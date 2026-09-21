# THEOONE Office AI — Product Specification v1.1

## Ziel

Aus dem Premium Pack eine nutzbare Workflow-Anwendung machen, die die vorhandenen 50 Workflows und 100 Prompt-Vorlagen als wiederverwendbares Arbeitssystem abbildet.

## Source of truth

Die Produktquellen sind:
- THEOONE Office AI Premium Pack
- THEOONE Office AI 100 Prompt-Vorlagen

Keine neue Produktlogik darf die dort festgelegten Kernprinzipien stillschweigend ersetzen.

## Datenmodell

Jeder Workflow:
- id
- title
- category
- description
- standard prompt schema
- precision prompt schema
- input
- output format
- validation rules

## Kernregeln

1. Nur bereitgestellte Informationen verwenden.
2. Keine Fakten, Zahlen, Termine, Quellen oder Zusagen erfinden.
3. Fehlende Informationen mit [OFFEN] markieren.
4. Widersprüche sichtbar machen.
5. Ergebnis zuerst.
6. Maximal drei kurze Verbesserungshinweise.
7. Menschliche Prüfung bei sensiblen oder geschäftskritischen Inhalten.

## MVP

- 50 Workflows
- 100 Prompt-Vorlagen
- Suche
- Kategorien
- Standard-/Präzisionsmodus
- Präzisionsfelder
- Copy
- Favoriten
- lokaler Verlauf
- mobile Oberfläche

## Architektur

Workflow → Prompt-Engine → KI-Ausführung → Ergebnis → Prüfung → Verbesserung → Speichern

API-Schlüssel und Provider-Zugangsdaten gehören ausschließlich in eine serverseitige Ausführungsschicht.
