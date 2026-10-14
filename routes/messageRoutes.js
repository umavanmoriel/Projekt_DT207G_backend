// Importerar middleware för JWT
const { authenticateToken } = require("../middleware/auth");
// Importerar express
const express = require("express");
// Skapar en router
const router = express.Router();
// Importerar message-modellen
const message = require("../models/message");

// Lägger till ett nytt meddelande
router.post("/messages", async (req, res) => {
    try {
        // Hämtar data från requestens body
        const { name, email, subject, message: text } = req.body;

        // Validerar att obligatoriska fält är ifyllda
        if (!name || !email || !text) {
            return res.status(400).json({ error: "Fyll i namn, e-post och meddelande" });
        }

        // Skapar ett nytt meddelande
        const newMessage = new message({ name, email, subject, message: text });

        // Sparar meddelandet i databasen
        await newMessage.save();

        // Skickar tillbaka ett lyckat svar
        res.status(201).json({ message: "Meddelande mottaget", data: newMessage });
    } catch (error) {
        // Skriver ut felet i terminalen
        console.error("MESSAGE ERROR:", error);
        // Skickar tillbaka ett felmeddelande
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Hämtar alla meddelanden
router.get("/messages", authenticateToken, async (req, res) => {
    try {
        const messages = await message.find().sort({ created: -1 });
        res.json(messages);
    } catch (error) {
        console.error("MESSAGE ERROR:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Exporterar routern
module.exports = router;