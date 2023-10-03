const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const cors = require('cors');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadFolder = path.join(__dirname, 'uploads', req.body.key);
    
    try {
      // Check if the folder exists
      await fs.access(uploadFolder);
      console.log('Folder exists:', uploadFolder);
    } catch (error) {
      // If the folder doesn't exist, create it
      await fs.mkdir(uploadFolder, { recursive: true });
      console.log('Folder created:', uploadFolder);
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({ storage: storage });

// Enable CORS for all routes
router.use(cors());

router.post('/uploadPhoto', upload.single('photo'), async (req, res) => {
  try {
    // Handle uploaded photo here
    console.log('Photo uploaded:', req.file.filename);
    // Send success response to the client
    res.status(201).json({ message: 'Photo uploaded successfully', filename: req.file.filename });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Error uploading photo' });
  }
});

module.exports = router;
