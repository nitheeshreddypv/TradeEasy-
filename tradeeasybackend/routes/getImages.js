const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/getImages', async (req, res) => {
  try {
    const itemKey = req.params.itemKey;
    const folderPath = path.join(__dirname, 'uploads', itemKey);

    const files = await fs.readdir(folderPath);
    const imageUrls = files.map((file) => `/uploads/${itemKey}/${file}`);

    res.status(200).json(imageUrls);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
