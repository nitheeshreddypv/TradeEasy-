const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const addItemRoute = require('./routes/addItem');

const deleteItemRoute = require('./routes/deleteItem'); 
const retrieveItemRoute = require('./routes/retrieveItem'); 

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define your routes
app.use('/api', addItemRoute);
app.use('/api', deleteItemRoute); // Use the deleteItem route
app.use('/api', retrieveItemRoute); // Use the deleteItem route

// Start the Express server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
