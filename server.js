// Importerar express
const express = require("express");
// Importerar body parser
const bodyParser = require("body-parser");
// Importerar authRoutes
const authRoutes = require("./routes/authRoutes");
// Importerar cors för att tillåta anrop från frontend
const cors = require("cors");
// Importerar dishRoutes
const dishRoutes = require("./routes/dishRoutes");
// Importerar bookingRoutes
const bookingRoutes = require("./routes/bookingRoutes");
// Importerar messageRoutes
const messageRoutes = require("./routes/messageRoutes");
// Importerar JWT-middleware
const { authenticateToken } = require("./middleware/auth");

// Läser in miljövariabler från .env fil
require("dotenv").config();

// Skapar en Express applikation
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
// Använd porten från .env eller porten 3000
app.use(bodyParser.json());

// Routes för rätter
app.use("/api", dishRoutes);
// Använder bookingRoutes
app.use("/api", bookingRoutes);
// Använder messageRoutes
app.use("/api", messageRoutes);
// Routes för autentisering
app.use("/api", authRoutes);

// Skyddad route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" });
});

// Startar applikation
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});