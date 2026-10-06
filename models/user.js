// Importera mongoose
const mongoose = require("mongoose");
// Importera bcrypt
const bcrypt = require("bcrypt");

// Skapar ett schema för hur en användare ska se ut i databasen
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hasha lösenordet innan en användare sparas till databasen
userSchema.pre("save", async function() {
    // Om användaren är ny ELLER lösenordet har ändrats
    if (this.isNew || this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        // Ersätt det vanliga lösenordet med det hashade
        this.password = hashedPassword;
    }
});

//Jämför hashad lösenord
userSchema.methods.comparePassword = async function(password) {
    try {
        // Jämför det inskrivna lösenordet med det hashade i databasen
        // Returnerar true om de matchar annars false
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw error;
    }
}

// Skapa en modell "User"
const User = mongoose.models.User || mongoose.model("User", userSchema);
// Exportera modellen
module.exports = User;