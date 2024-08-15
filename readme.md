# Express API Dokumentation

Willkommen zur Dokumentation der Express API. Diese API bietet eine Reihe von Endpunkten zur Benutzer-Authentifizierung und -Verwaltung.

## Vordefinierte Funktionen

- Benutzerregistrierung
- Benutzeranmeldung
- Passwort zurücksetzen
- Benutzer abmelden

## Technologien

- Node.js
- Express
- Sequelize
- JWT für Authentifizierung
- bcryptjs für Passwort-Hashing
- Swagger für API-Dokumentation

## Hosting mit Docker Compose oder Podman Compose

Das Projekt enthält bereits eine `docker-compose.yml` und eine `Dockerfile`, die für das Hosting mit Docker oder Podman verwendet werden können. Dies vereinfacht das Deployment, indem es die Konfiguration und das Management von Multi-Container-Anwendungen ermöglicht.

### Voraussetzungen

- Docker Compose oder Podman Compose auf Ihrem System installiert

### Schritte

1. Navigieren Sie zum Hauptverzeichnis des Projekts, in dem die `docker-compose.yml` und die `Dockerfile` liegen.

2. Starten Sie die Anwendung mit Docker Compose:
   ```
   docker-compose up
   ```
   oder mit Podman Compose:
   ```
   podman-compose up
   ```

Nachdem der Befehl ausgeführt wurde, ist die API unter `http://localhost:3000` erreichbar und bereit, Anfragen zu bearbeiten.

## Verwendung

Nach dem Starten des Containers können Sie die verschiedenen Endpunkte über Tools wie Postman oder über Ihren Browser (für GET-Anfragen) ansprechen.

Die API-Dokumentation ist über `/api-docs` zugänglich, wenn der Server läuft, und bietet eine interaktive Schnittstelle zur Erkundung der verfügbaren Endpunkte.

## Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert. Weitere Informationen finden Sie in der `LICENSE` Datei.