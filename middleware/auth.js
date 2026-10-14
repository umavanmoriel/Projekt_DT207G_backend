// Middleware som kollar att användaren är inloggad via JWT

const jwt = require("jsonwebtoken");

// Kollar token i Authorization-headern
function authenticateToken(req, res, next) {
    // Hämtar headern (format: "Bearer <token>")
    const authHeader = req.headers["authorization"];
    // Plockar ut själva token
    const token = authHeader && authHeader.split(" ")[1];

    // Om ingen token nekas åtkomst
    if (token == null) {
        return res.status(401).json({ message: "Ingen token – åtkomst nekad" });
    }

    // Verifierar token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        // Om ogiltig eller utgången token nekas åtkomst
        if (err) {
            return res.status(401).json({ message: "Ogiltig eller utgången token" });
        }

        // Sparar användarnamnet så andra routes kan använda det
        req.username = decoded.username;

        // Allt ok – gå vidare
        next();
    });
}

// Exporterar funktionen
module.exports = { authenticateToken };