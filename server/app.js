const express = require("express");
const path = require("path"); // Importer le module path
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const imageUploadRouter = require('./routes/imageUpload');
require("./db/conn");

const app = express();
const port = 8009;

app.get("/", (req, res) => {
    res.status(201).json("server created");
});

// Middleware pour le traitement des requêtes JSON, CORS et cookie-parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

// Route pour l'API d'upload d'image
app.use('/api/images', imageUploadRouter);

// Servir les fichiers statiques du dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
