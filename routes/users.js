const express = require('express');
const User = require('../models/user');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "User"
 *     description: "Endpoints zur Benutzerverwaltung"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ruft alle Benutzer ab
 *     tags:
 *       - "User"
 *     responses:
 *       200:
 *         description: Erfolgreich alle Benutzer abgerufen
 *       500:
 *         description: Fehler beim Abrufen der Benutzer
 */
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json( users );
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ruft Details eines einzelnen Benutzers ab
 *     tags:
 *       - "User"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Benutzers
 *     responses:
 *       200:
 *         description: Erfolgreich Benutzerdetails abgerufen
 *       404:
 *         description: Benutzer nicht gefunden
 *       500:
 *         description: Fehler beim Abrufen des Benutzers
 */
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

module.exports = router;
