# Dockerfile

# Node.js als Basisimage
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Vor der Installation den node_modules-Ordner löschen, falls vorhanden
# RUN rm -rf node_modules

# Abhängigkeiten kopieren und installieren
COPY package.json ./
# RUN npm install

# Den Rest des Anwendungscodes kopieren
COPY . .


# Standardbefehl zum Starten der App
CMD ["sh", "-c", "npm install && npm start"]
# CMD ["npm", "start"]

# Exponiere den Port der Anwendung
EXPOSE 3000
