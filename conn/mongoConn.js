const mongoose = require("mongoose");
const runDb = async () => {
  try {
    const DB = process.env.DB_URI;
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(DB);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("connection error" + error.message);
  }
};

module.exports = runDb;
