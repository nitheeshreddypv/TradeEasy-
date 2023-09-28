const mysql = require('mysql2/promise'); // Import the mysql2 library

// Create a pool for managing database connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'nitheesh',
  password: '123456',
  database: 'tradeeasytable',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to generate a random key
function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  const keyLength = 8;

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}

// Function to add an item to the database
async function addItem(category, photo, cost, location, name, mobile, email, note) {
  try {
    const item_key = generateKey(); // Generate a new key
    const sql = 'INSERT INTO ITEMS (category, photo, cost, location, name, mobile, email, note, item_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [category, photo, cost, location, name, mobile, email, note, item_key];
    const [results] = await pool.execute(sql, values);
    return { itemKey: item_key, insertId: results.insertId };
  } catch (error) {
    throw error;
  }
}

// Function to delete an item by key
async function deleteItem(item_key) {
  try {
    const sql = 'DELETE FROM ITEMS WHERE item_key = ?';
    console.log('Received delete request');
    const [results] = await pool.execute(sql, [item_key]);
    if (results.affectedRows === 0) {
      return false; // Item not found
    }
    return true; // Item deleted successfully
  } catch (error) {
    throw error;
  }
}

// Function to retrieve items by category
async function getItemsByCategory(category) {
  try {
    const sql = 'SELECT * FROM ITEMS WHERE category = ?';
    const [results] = await pool.execute(sql, [category]);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addItem,
  deleteItem,
  getItemsByCategory, // Add the new function here
};
