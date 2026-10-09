// Importerar express
const express = require("express");
// Skapar en router
const router = express.Router();
// Importerar dish modellen
const dish = require("../models/dish");

// Hämtar alla rätter som är sparade i databasen
router.get("/dishes", async (req, res) => {
    try {
        // Hämtar alla rätter från databasen, sorterade på senast skapad
        const dishes = await dish.find().sort({ created: -1 });

        // Skickar tillbaka alla rätter som JSON
        res.json(dishes);
    } catch (error) {
        // Skriver ut felet i terminalen
        console.error("DISH ERROR:", error);
        // Skickar tillbaka ett felmeddelande till klienten
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

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

// Uppdaterar en befintlig rätt
router.put("/dishes/:id", async (req, res) => {
    try {
        // Hämtar data från requestens body
        const { name, category, price, description } = req.body;

        // Uppdaterar rätten med angivet id
        const updated = await dish.findByIdAndUpdate(
            req.params.id,
            { name, category, price, description },
            { new: true }
        );

        // Om rätten inte hittades
        if (!updated) {
            return res.status(404).json({ error: "Rätten hittades inte" });
        }

        // Skickar tillbaka ett lyckat svar med den uppdaterade rätten
        res.json({ message: "Rätt uppdaterad", dish: updated });
    } catch (error) {
        // Skriver ut felet i terminalen
        console.error("DISH ERROR:", error);
        // Skickar tillbaka ett felmeddelande till klienten
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Raderar en rätt
router.delete("/dishes/:id", async (req, res) => {
    try {
        // Raderar rätten med angivet id
        const deleted = await dish.findByIdAndDelete(req.params.id);

        // Om rätten inte hittades
        if (!deleted) {
            return res.status(404).json({ error: "Rätten hittades inte" });
        }

        // Skickar tillbaka ett lyckat svar
        res.json({ message: "Rätt raderad" });
    } catch (error) {
        // Skriver ut felet i terminalen
        console.error("DISH ERROR:", error);
        // Skickar tillbaka ett felmeddelande till klienten
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Exporterar routern så den kan användas i server.js
module.exports = router;