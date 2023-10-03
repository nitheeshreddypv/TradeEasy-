const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const addItemRoute = require('./routes/addItem');
const deleteItemRoute = require('./routes/deleteItem');
const categoryItemsRoute = require('./routes/categoryItems');
//const addphoto = require('./routes/addphoto');
const uploadPhotoRoute = require('./routes/uploadPhoto');
const getImagesRouter = require('./routes/getImages');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', addItemRoute);
app.use('/api', deleteItemRoute);
app.use('/api', categoryItemsRoute);
app.use('/api', uploadPhotoRoute);
app.use('/api', getImagesRouter);
//app.use('/api', addphoto);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
