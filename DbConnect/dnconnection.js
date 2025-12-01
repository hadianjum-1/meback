const mongoose = require("mongoose");

const DbConnect = async () => {
  const url = process.env.MONGO_URI;

  try {
    await mongoose.connect(url);
    console.log("🚀 MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = DbConnect;
