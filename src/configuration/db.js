const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/bookShop';

const dbUrl = uri
const dbConnection = mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

module.exports = { dbConnection };


