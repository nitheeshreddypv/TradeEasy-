const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Import the mysql2 library
const nodemailer = require('nodemailer');

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

// Function to generate a random key
function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  const keyLength = 8; // You can adjust the key length as needed

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }

  return key;
}

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // E.g., 'Gmail', 'Outlook', or use your SMTP settings
  auth: {
    user: 'fullstackfullstack99@gmail.com',
    pass: 'txceugrnfcjeyzge',
  },
});

// POST route to add an item
router.post('/addItem', async (req, res) => {
  try {
    // Extract data from the request body
    const { category, photo, cost, location, name, mobile, email, note } = req.body;

    // Generate a new key here
    const newItemKey = generateKey();

    // Validate and insert the data into the database along with the key
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'INSERT INTO ITEMS (category, photo, cost, location, name, mobile, email, note, item_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [category, photo, cost, location, name, mobile, email, note, newItemKey]
    );
    connection.release();

    // Send an email to the provided email address
    const mailOptions = {
      from: 'fullstackfullstack99@gmail.com',
      to: email, // Use the email address provided in the request
      subject: 'Item Added Successfully',
      text: `Dear ${name},\n\nYour item has been added successfully! The item key is: ${newItemKey}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond with a success message and the generated key
    res.status(201).json({ message: 'Item added successfully', itemKey: newItemKey });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item' });
  }
});

module.exports = router;
