// backend/routes/categoryItems.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Import the mysql2 library

// GET request to fetch records by category
router.get('/items/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    console.log('wait');

    // Create a MySQL connection pool
    const pool = mysql.createPool({
      host: 'localhost', // Replace with your database host if it's not on localhost
      user: 'nitheesh', // Replace with your database username
      password: '123456', // Replace with your database password
      database: 'tradeeasytable', // Replace with your database name
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute a SELECT query to fetch records by category
    const [results] = await connection.query('SELECT * FROM ITEMS WHERE category = ?', [category]);

    // Release the connection back to the pool
    connection.release();

    // Respond with the fetched records
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching records by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
