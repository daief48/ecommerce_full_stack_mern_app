const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white);
}

module.exports = connectDB;