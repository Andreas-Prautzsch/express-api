// scripts/generateModelWithRoutes.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const modelName = process.argv[2];

if (!modelName) {
  console.error('Bitte einen Modellnamen angeben.');
  process.exit(1);
}

// Modellname großschreiben für die Routen und Swagger-Tags
const modelNameCapitalized = modelName.charAt(0).toUpperCase() + modelName.slice(1);

// Erstelle das Sequelize-Modell
execSync(`npx sequelize-cli model:generate --name ${modelName} --attributes name:string`);

// Routen-Template mit Swagger-Kommentaren
const routeTemplate = `
const express = require('express');
const router = express.Router();
const ${modelName} = require('../models/${modelName}');

/**
 * @swagger
 * tags:
 *   - name: "${modelNameCapitalized}"
 *     description: "Operations related to ${modelNameCapitalized}"
 */

/**
 * @swagger
 * /${modelName}/{{id}}:
 *   get:
 *     summary: Get a single ${modelNameCapitalized}
 *     tags: ["${modelNameCapitalized}"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ${modelNameCapitalized}
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved ${modelNameCapitalized}
 *       404:
 *         description: ${modelNameCapitalized} not found
 */
router.get('/${modelName}/:id', async (req, res) => {
  try {
    const item = await ${modelNameCapitalized}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '${modelNameCapitalized} not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /${modelName}s:
 *   get:
 *     summary: Get all ${modelNameCapitalized}s
 *     tags: ["${modelNameCapitalized}"]
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: false
 *         description: Filter criteria
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved ${modelNameCapitalized}s
 */
router.get('/${modelName}s', async (req, res) => {
  try {
    const items = await ${modelNameCapitalized}.findAll({ where: req.query });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /${modelName}/edit/{{id}}:
 *   put:
 *     summary: Edit a ${modelNameCapitalized}
 *     tags: ["${modelNameCapitalized}"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ${modelNameCapitalized} to edit
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully edited ${modelNameCapitalized}
 *       404:
 *         description: ${modelNameCapitalized} not found
 */
router.put('/${modelName}/edit/:id', async (req, res) => {
  try {
    const item = await ${modelNameCapitalized}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '${modelNameCapitalized} not found' });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /${modelName}/delete/{{id}}:
 *   delete:
 *     summary: Delete a ${modelNameCapitalized}
 *     tags: ["${modelNameCapitalized}"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ${modelNameCapitalized} to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted ${modelNameCapitalized}
 *       404:
 *         description: ${modelNameCapitalized} not found
 */
router.delete('/${modelName}/delete/:id', async (req, res) => {
  try {
    const item = await ${modelNameCapitalized}.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '${modelNameCapitalized} not found' });

    await item.destroy();
    res.json({ message: '${modelNameCapitalized} deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
`;

// Erstelle die Routen-Datei
const routesDir = path.join(__dirname, '../routes'); // Pfad angepasst
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir);
}

const routeFilePath = path.join(routesDir, `${modelName}.js`);
fs.writeFileSync(routeFilePath, routeTemplate, 'utf8');

console.log(`Modell und Routen für ${modelNameCapitalized} erfolgreich erstellt.`);
