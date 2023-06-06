const mongoose = require('mongoose');
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI must be defined')
}

const connectToMongoose = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return console.log('Connected to MongoDB: ', MONGODB_URI);
  } catch (err) {
    return console.error('Error connecting to MongoDB', err);
  }
}

module.exports = connectToMongoose