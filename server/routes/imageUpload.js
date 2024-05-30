const express = require('express');
const multer = require('multer');
const path = require('path'); // Importation correcte du module path
const fs = require('fs');
const router = express.Router();
const Image = require('../models/imageSchema');

// Configuration du stockage des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route pour télécharger une image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { filename, path: filePath, mimetype, size } = req.file;

    const image = new Image({
      fileName: filename,
      filePath: filePath,
      fileSize: size,
      fileMimeType: mimetype
    });

    await image.save();

    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour récupérer toutes les images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour récupérer une image par son ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.sendFile(path.resolve(image.filePath));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
