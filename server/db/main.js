const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
