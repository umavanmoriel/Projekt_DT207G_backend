//Routes för autentisering

// Importera express
const express = require("express");
// Skapa en router
const router = express.Router();
// Importera mongoose
const mongoose = require("mongoose");
// Importerar JWT
const jwt = require("jsonwebtoken");
// Läser in miljövariabler från .env fil
require("dotenv").config();

//Ansluter till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database...");
});

//User model
const User = require("../models/user");

//Lägger till nya användare
router.post("/register", async (req, res) => {
    try {
         // Importera User-modell
        const { username, password } = req.body;

        //Validera input, båda fälten måste finnas
        if (!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning! Ange användarnamn och lösenord!"});
        }

        // Skapa en ny användare
        const user = new User({ username, password });
        await user.save();  
        res.status(201).json({ message: "User created"});

    } catch (error) {
        console.error("REGISTER ERROR:", error.message);
        // Kontrollerar dubblett för användarnamn
        if (error.code === 11000) {
            return res.status(409).json({ error: "Användarnamnet finns redan" });
        }
        res.status(500).json({error:"Server error"});
    }
});

//Loggar in användare
router.post("/login", async (req, res) => {
    try {
        // Hämtar username och password
        const { username, password } = req.body;
        //Validerar input
        if (!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning! Ange användarnamn och lösenord!"});
        }

        // Kontrollerar inloggningsuppgifter

        //Existerar användare?
        const user = await User.findOne({ username });
        if (!user) {
            //Fel användarnamn eller lösenord
            return res.status(401).json({ error: "Fel användarnamn/lösenord!"});
        }

        //Kontrollera lösenord
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Fel användarnamn/lösenord!"});
        } else {
            //Skapa en JWT om allt stämmer och stoppar in användarnamn i token
            const payload = { username: username};
            // Signerar token med hemliga nyckel vilket är giltig i 1 timme
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            // Inloggningen lyckades
            res.status(200).json({ message: "User logged in!!", token: token });
        }
        
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }

})

// Exportera routern
module.exports = router;