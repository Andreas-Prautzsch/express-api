# # # Dockerfile

# # # Node.js als Basisimage
# # FROM node:18

# # # Arbeitsverzeichnis im Container
# # WORKDIR /app

# # # Vor der Installation den node_modules-Ordner löschen, falls vorhanden
# # # RUN rm -rf node_modules

# # # Abhängigkeiten kopieren und installieren
# # # COPY package.json ./
# # # RUN npm install

# # # Den Rest des Anwendungscodes kopieren
# # COPY . .


# # # Standardbefehl zum Starten der App
# # CMD ["sh", "-c", "npm install && npm start"]
# # # CMD ["npm", "start"]

# # # Exponiere den Port der Anwendung
# # EXPOSE 3000
# # # 

# # Node.js als Basisimage
# FROM node:18

# # Arbeitsverzeichnis im Container
# WORKDIR /app

# # Abhängigkeiten kopieren und installieren
# # COPY package.json ./
# # RUN npm install

# # Den Rest des Anwendungscodes kopieren
# COPY . .

# # Standardbefehl zum Starten der App
# # CMD ["npm", "start"]

# # Exponiere den Port der Anwendung
# EXPOSE 3000

# Dockerfile

# Node.js als Basisimage
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere package.json und package-lock.json und installiere Produktionsabhängigkeiten
COPY package*.json ./
RUN npm install --production

# Kopiere den restlichen Anwendungscode
COPY . .

# Exponiere den Port der Anwendung
EXPOSE 3000

# Standardbefehl: Migrationen ausführen und dann die App starten
CMD npx sequelize-cli db:migrate && npm start
