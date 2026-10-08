// Importerar mongoose
const mongoose = require("mongoose");

// Skapar ett schema för hur en rätt ska se ut i databasen
const dishSchema = new mongoose.Schema({
    // Rättens namn blir obligatoriskt
    name: { type: String, required: true, trim: true },
    // Kategori blir obligatorisk (starters, mainCourses, desserts, drinks)
    category: { type: String, required: true },
    // Pris i kronor blir obligatoriskt
    price: { type: Number, required: true },
    // Beskrivning är valfri text
    description: { type: String },
    // Datum då rätten skapades
    created: { type: Date, default: Date.now }
});

// Skapar modellen dish eller återanvänder den om den redan finns
const dish = mongoose.models.dish || mongoose.model("dish", dishSchema);

// Exporterar modellen så den kan användas i routes
module.exports = dish;