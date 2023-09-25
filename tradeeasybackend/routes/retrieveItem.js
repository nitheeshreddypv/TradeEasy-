// backend/routes/retrieveItem.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Import the mysql2 library
const pool = mysql.createPool({
    host: 'localhost', // Replace with your database host if it's not on localhost
    user: '', // Replace with your database username
    password: '', // Replace with your database password
    database: 'tradeeasytable', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

// GET request to retrieve item details by key
router.get('/retrieveItem', async (req, res) => {
  try {
    const { item_key } = req.params;
       //req.params;
    // Create a MySQL connection pool
    const pool = mysql.createPool({
      host: 'localhost', // Replace with your database host if it's not on localhost
      user: 'nitheesh', // Replace with your database username
      password: 'Ammadaddy@03', // Replace with your database password
      database: 'tradeeasytable', // Replace with your database name
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the SELECT query
    const [rows] = await connection.query('SELECT * FROM ITEMS WHERE item_key = ?', [item_key]);

    // Release the connection back to the pool
    connection.release();
    console.log('please wait');

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error retrieving item details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
