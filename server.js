// Importerar express
const express = require("express");
// Importerar body parser
const bodyParser = require("body-parser");
// Importerar authRoutes
const authRoutes = require("./routes/authRoutes");
// Importera jsonwebtoken
const jwt = require("jsonwebtoken");
// Läser in miljövariabler från .env fil
require("dotenv").config();

// Skapar en Express applikation
const app = express();
const port = process.env.PORT || 3000;
// Använd porten från .env eller porten 3000
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

//Skyddad routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" });
});

//Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Nekar åtkomst om ingen token finns
    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route - token missing!" });
    }

    // Verifiera token med vår hemliga nyckel
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        //Nekar åtkomst om token är ogiltig eller har gått ut
        if (err) {
            // Token finns men är inte giltig
            return res.status(403).json({ message: "Not correct JWT" });
        }

        // Spara användarnamnet om token är giltig
        req.username = decoded.username;
        next();
    });
}

//Startar applikation
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})