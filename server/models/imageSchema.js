const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileMimeType: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
    