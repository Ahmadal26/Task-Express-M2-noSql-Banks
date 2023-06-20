const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB_URL);

  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
