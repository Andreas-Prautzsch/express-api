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

Das Projekt enthält eine `docker-compose.yml` und eine `Dockerfile`, die für das Hosting mit Docker oder Podman verwendet werden können. Dies vereinfacht das Deployment, indem es die Konfiguration und das Management von Multi-Container-Anwendungen ermöglicht.

## Voraussetzungen

- Docker Compose oder Podman Compose auf Ihrem System installiert
- PostgreSQL-Datenbank (z.B. über Coolify)

## Schritte

1. Navigieren Sie zum Hauptverzeichnis des Projekts, in dem die `docker-compose.yml` und die `Dockerfile` liegen.

2. Starten Sie die Anwendung lokal mit Docker Compose:
   ```bash
   docker-compose up -d db
   npm run dev
   ```

oder mit Podman Compose:

   ```bash
   podman-compose up -d db
   npm run dev
   ```

Dieser Befehl startet die PostgreSQL-Datenbank im Hintergrund und die Express API im Entwicklungsmodus. Die API ist unter http://localhost:3000 erreichbar und bereit, Anfragen zu bearbeiten.

## Umgebungsvariablen für die lokale Entwicklung setzen:

Erstellen Sie eine .env Datei im Stammverzeichnis des Projekts:

   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=user
   DB_PASS=password
   DB_NAME=dbname
   NODE_ENV=development
   JWT_SECRET=your-secret-key
   ```

## Deployment mit Coolify

Coolify ermöglicht ein einfaches Deployment Ihrer Anwendung direkt aus Ihrem Git-Repository.

## Coolify Setup

- Verbinden Sie Ihr Git-Repository mit Coolify, indem Sie Ihr Repository in Coolify hinzufügen und den Branch auswählen, den Sie deployen möchten.

- Konfigurieren Sie das Deployment:
   Wählen Sie den Dockerfile-Modus für das Deployment.
   Stellen Sie sicher, dass das Dockerfile in Ihrem Repository vorhanden ist und die korrekte Konfiguration enthält.

## Umgebungsvariablen

Fügen Sie die folgenden Umgebungsvariablen in den Einstellungen Ihres Coolify-Projekts hinzu:

   ```
   NODE_ENV: production
   DB_HOST: Hostname des PostgreSQL-Servers (wie von Coolify bereitgestellt).
   DB_PORT: Portnummer für die PostgreSQL-Verbindung (Standard: 5432).
   DB_USER: Der Benutzername für die PostgreSQL-Datenbank.
   DB_PASS: Das Passwort für den PostgreSQL-Benutzer.
   DB_NAME: Der Name der PostgreSQL-Datenbank.
   JWT_SECRET: Ein geheimer Schlüssel für die JWT-Authentifizierung.
   ```

## Datenbank-Migrationen

Coolify wird automatisch die in Ihrem Dockerfile definierten Befehle ausführen. Um die Datenbank-Migrationen auszuführen, wird der folgende Befehl im Dockerfile verwendet:

```dockerfile
CMD npx sequelize-cli db:migrate && npm start
```

Dieser Befehl sorgt dafür, dass die Migrationen angewendet werden, bevor die Anwendung gestartet wird.

## Verwendung

Nach dem Starten der Anwendung können Sie die verschiedenen Endpunkte über Tools wie Postman oder über Ihren Browser (für GET-Anfragen) ansprechen.

Die API-Dokumentation ist über **/api-docs** zugänglich, wenn der Server läuft, und bietet eine interaktive Schnittstelle zur Erkundung der verfügbaren Endpunkte.

## Lizenz

Dieses Projekt ist unter der MIT Lizenz lizenziert. Weitere Informationen finden Sie in der LICENSE Datei.
