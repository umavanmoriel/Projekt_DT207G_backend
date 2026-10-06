const express = require("express");
const router = express.Router();

//Lägger till nya användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        //Validerar input
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }
        //Correct - save user
        res.status(201).json({ message: "User created"});

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

//Loggar in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        //Validerar input
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        //Check credentials
        if(username === "username" && password === "password") {
            res.status(200).json({message: "Login succesful"});
        } else {
            res.status(401).json({error: "Invalid username/password"});
        }
        
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }

})

module.exports = router;