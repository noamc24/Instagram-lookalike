const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    let mongoURI;
    if (process.env.USE_CLOUD_DB === "true") {
      mongoURI = process.env.MONGO_URI_CLOUD;
      console.log("🌐 Connecting to MongoDB Atlas...");
    } else {
      mongoURI = process.env.MONGO_URI_LOCAL;
      console.log("💻 Connecting to local MongoDB...");
    }
    if (!mongoURI) {
      throw new Error("Mongo URI is undefined. Check your .env file.");
    }
    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully");

  } catch (err) {
    console.error("❌ Mongo Error:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };