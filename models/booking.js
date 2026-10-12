// Skapar schema för bokningar i databasen

// Importerar mongoose
const mongoose = require("mongoose");

// Skapar ett schema för hur en bokning ska se ut
const bookingSchema = new mongoose.Schema({
    // Gästens namn
    name: {
        type: String,
        required: true,
        trim: true
    },
    // Telefonnummer
    phone: {
        type: String,
        required: true,
        trim: true
    },
    // Datum för bokningen (YYYY-MM-DD)
    date: {
        type: String,
        required: true
    },
    // Tid för bokningen (HH:MM)
    time: {
        type: String,
        required: true
    },
    // Antal gäster
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    // Valfritt meddelande från gästen
    message: {
        type: String,
        trim: true
    },
    // När bokningen skapades
    created: {
        type: Date,
        default: Date.now
    }
}, {
    // Tvingar collection namnet till "booking" annars blir "bookings"
    collection: "booking"
});

// Skapar modellen "booking"
const booking = mongoose.models.booking || mongoose.model("booking", bookingSchema);

// Exporterar modellen
module.exports = booking;