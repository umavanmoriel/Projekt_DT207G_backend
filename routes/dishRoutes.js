// Importerar express
const express = require("express");
// Skapar en router
const router = express.Router();
// Importerar dish modellen
const dish = require("../models/dish");

// Lägger till en ny rätt
router.post("/dishes", async (req, res) => {
    try {
        // Hämta data från requestens body
        const { name, category, price, description } = req.body;

        // Validerar att obligatoriska fält är ifyllda
        if (!name || !category || !price) {
            return res.status(400).json({ error: "Fyll i namn, kategori och pris" });
        }

        // Skapar en ny rätt med data från formuläret
        const newDish = new dish({ name, category, price, description });

        // Sparar rätten i databasen
        await newDish.save();

        // Skickar tillbaka ett lyckat svar med den sparade rätten
        res.status(201).json({ message: "Rätt sparad", dish: newDish });
    } catch (error) {
        // Skriver ut felet i terminalen
        console.error("DISH ERROR:", error);
        // Skickar tillbaka ett felmeddelande till klienten
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Exporterar routern så den kan användas i server.js
module.exports = router;