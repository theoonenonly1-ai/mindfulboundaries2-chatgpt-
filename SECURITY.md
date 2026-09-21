# Security baseline

- Never commit API keys, tokens, passwords or private credentials.
- AI provider requests must be made by a trusted server/backend, not directly with a browser-exposed secret.
- Validate and limit user input on the server.
- Apply authentication and authorization before exposing saved user data.
- Keep payment webhooks server-side and verify signatures.
- Do not treat generated AI output as verified fact.
- Sensitive or business-critical results require human review.
