// Importerar express
const express = require("express");
// Importerar body parser
const bodyParser = require("body-parser");
// Importerar authRoutes
const authRoutes = require("./routes/authRoutes");
// Läser in miljövariabler från .env fil
require("dotenv").config();

// Skapar en Express applikation
const app = express();
const port = process.env.PORT || 3000;
// Använd porten från .env eller porten 3000
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);


//Startar applikation
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})