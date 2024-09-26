const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * @swagger
 * tags:
 *   - name: "Authentication"
 *     description: "Endpoints zur Benutzer-Authentifizierung"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registriert einen neuen Benutzer
 *     tags:
 *       - "Authentication"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Benutzer erfolgreich erstellt
 *       400:
 *         description: Fehlerhafte Anfrage
 */
router.post( '/auth/register', async ( req, res ) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await User.create({ email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Meldet den Benutzer an und gibt ein JWT zurück
 *     tags:
 *       - "Authentication"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Anmeldung erfolgreich, JWT zurückgegeben
 *       400:
 *         description: Ungültige Anmeldedaten
 *       500:
 *         description: Fehler beim Anmelden
 */
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Generiert einen Token zum Zurücksetzen des Passworts
*     tags:
 *       - "Authentication"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token zum Zurücksetzen des Passworts erfolgreich generiert
 *       400:
 *         description: Benutzer nicht gefunden
 *       500:
 *         description: Fehler beim Generieren des Tokens
 */
router.post('/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });

        // Hier würdest du normalerweise das Token per E-Mail an den Benutzer senden
        res.json({ message: 'Password reset token generated', resetToken });
    } catch (error) {
        res.status(500).json({ message: 'Error generating password reset token', error });
    }
});

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Setzt das Passwort des Benutzers mit dem gegebenen Token zurück
 *     tags:
 *       - "Authentication"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Passwort erfolgreich zurückgesetzt
 *       400:
 *         description: Ungültiger Token
 *       500:
 *         description: Fehler beim Zurücksetzen des Passworts
 */
router.post('/auth/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Meldet den Benutzer ab
 *     tags:
 *       - "Authentication"
 *     responses:
 *       200:
 *         description: Erfolgreich abgemeldet
 */
router.post('/auth/logout', (req, res) => {
    // Im einfachsten Fall löschen wir das Token auf der Client-Seite
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
