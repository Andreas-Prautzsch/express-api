// src/app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const loadRoutes = require('./helper/loadRoutes');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Swagger Set up
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'API Dokumentation',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Pfad zu den Routen-Dateien, in denen die Swagger-Kommentare stehen
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use( express.json() );

// Lade alle Routen automatisch
loadRoutes(app);

// Server starten
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
