// Skapar schema för meddelanden i databasen
// Importerar mongoose
const mongoose = require("mongoose");

// Skapar ett schema för hur ett meddelande ska se ut
const messageSchema = new mongoose.Schema({
    // Avsändarens namn
    name: {
        type: String,
        required: true,
        trim: true
    },
    // Avsändarens e-post
    email: {
        type: String,
        required: true,
        trim: true
    },
    // Ämne (valfritt)
    subject: {
        type: String,
        trim: true
    },
    // Meddelandetext
    message: {
        type: String,
        required: true,
        trim: true
    },
    // När meddelandet skickades
    created: {
        type: Date,
        default: Date.now
    }
}, {
    // Tvingar collection-namnet till "messages"
    collection: "messages"
});

// Skapar modellen "message"
const message = mongoose.models.message || mongoose.model("message", messageSchema);

// Exporterar modellen
module.exports = message;