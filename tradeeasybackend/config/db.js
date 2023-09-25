const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Replace with your database host if it's not on localhost
  user: 'nitheesh', // Replace with your database username
  password: 'Ammadaddy@03', // Replace with your database password
  database: 'tradeeasytable', // Replace with your database name
  port: 3306, // Replace with your database port if different
});

connection.connect((err) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
  } else {
    console.log('Database connection has been established successfully.');
  }
});

module.exports = connection;
