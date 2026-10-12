// Importerar express
const express = require("express");
// Skapar en router
const router = express.Router();
// Importerar booking-modellen
const booking = require("../models/booking");

// Lägger till en ny bokning
router.post("/bookings", async (req, res) => {
    try {
        // Hämtar data från requestens body
        const { name, phone, date, time, guests, message } = req.body;

        // Validerar att obligatoriska fält är ifyllda
        if (!name || !phone || !date || !time || !guests) {
            return res.status(400).json({ error: "Fyll i alla obligatoriska fält" });
        }

        // Skapar en ny bokning
        const newBooking = new booking({ name, phone, date, time, guests, message });

        // Sparar bokningen i databasen
        await newBooking.save();

        // Skickar tillbaka ett lyckat svar
        res.status(201).json({ message: "Bokning mottagen", booking: newBooking });
    } catch (error) {
        // Skriver ut felet i terminalen
        console.error("BOOKING ERROR:", error);
        // Skickar tillbaka ett felmeddelande
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Hämtar alla bokningar
router.get("/bookings", async (req, res) => {
    try {
        const bookings = await booking.find().sort({ created: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("BOOKING ERROR:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Exporterar routern
module.exports = router; 