const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'nitheesh',
  password: '123456',
  database: 'tradeeasytable',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // ... your database configuration
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'fullstackfullstack99@gmail.com',
    pass: 'txceugrnfcjeyzge',
  },
});

const generateKey = () => {
  return uuidv4();
};

router.post('/addItem', async (req, res) => {
  try {
    const { category, cost, location, name, mobile, email, note } = req.body;
    const newItemKey = generateKey();

    // Store data in the database
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO ITEMS (category, cost, location, name, mobile, email, note, item_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [category, cost, location, name, mobile, email, note, newItemKey]
    );
    connection.release();

    // Send email to the user
    const mailOptions = {
      from: 'fullstackfullstack99@gmail.com',
      to: email,
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

    res.status(201).json({ message: 'Item added successfully', itemKey: newItemKey });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item' });
  }
});

module.exports = router;
