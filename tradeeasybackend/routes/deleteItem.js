// backend/routes/deleteItem.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Import the mysql2 library

// DELETE request to delete an item by key
router.delete('/deleteItem', async (req, res) => {
  try {
    const { item_key } = req.body; 
    console.log('Received item_key:', item_key);
    // Get the key from the request body

    // Create a MySQL connection pool
    const pool = mysql.createPool({
      host: 'localhost', // Replace with your database host if it's not on localhost
      user: '', // Replace with your database username
      password: '', // Replace with your database password
      database: 'tradeeasytable', // Replace with your database name
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log('Received delete request');

    // Execute the DELETE query
    const [result] = await connection.query('DELETE FROM ITEMS WHERE item_key = ?', [item_key]);

    // Release the connection back to the pool
    connection.release();

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
