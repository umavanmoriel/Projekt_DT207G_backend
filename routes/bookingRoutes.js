// Importerar middleware för JWT
const { authenticateToken } = require("../middleware/auth");
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
router.get("/bookings", authenticateToken, async (req, res) => {
    try {
        const bookings = await booking.find().sort({ created: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("BOOKING ERROR:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Uppdaterar status på en bokning
router.put("/bookings/:id", authenticateToken, async (req, res) => {
    try {
        // Hämtar status från requestens body
        const { status } = req.body;

        // Validerar att status är giltig
        if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
            return res.status(400).json({ error: "Ogiltig status" });
        }

        // Uppdaterar bokningen
        const updated = await booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        // Om bokningen inte finns
        if (!updated) {
            return res.status(404).json({ error: "Bokningen hittades inte" });
        }

        // Skickar tillbaka den uppdaterade bokningen
        res.json({ message: "Status uppdaterad", booking: updated });
    } catch (error) {
        console.error("BOOKING ERROR:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Tar bort en bokning
router.delete("/bookings/:id", authenticateToken, async (req, res) => {
    try {
        // Tar bort bokningen från databasen
        const deleted = await booking.findByIdAndDelete(req.params.id);

        // Om bokningen inte finns
        if (!deleted) {
            return res.status(404).json({ error: "Bokningen hittades inte" });
        }

        res.json({ message: "Bokning borttagen" });
    } catch (error) {
        console.error("BOOKING ERROR:", error);
        res.status(500).json({ error: "Server error", message: error.message });
    }
});

// Exporterar routern
module.exports = router;