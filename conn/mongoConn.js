const mongoose = require("mongoose");


const runDb = async (DB = null) => {
  try {
    DB = process.env.DB_URI
    // process.env.NODE_ENV === "production"
    // ? process.env.DB_URI
    // : process.env.DB_URI_LOCAL;

    mongoose.set("strictQuery", false);
    await mongoose.connect(DB, {
      useUnifiedTopology: false
    });
    console.log("connected to MongoDB");


  } catch (error) {
    console.log("connection error" + error.message);
  }
};

module.exports = runDb;
