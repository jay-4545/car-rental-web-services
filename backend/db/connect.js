const mongoose = require("mongoose");

const connectDatabase = async () => {
  return mongoose.connect(process.env.MONGO_URL);
};

module.exports = connectDatabase;
