const mongoose = require("mongoose");
const colors = require("colors");
const connectDatabase = async () => {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white);
    

}

module.exports = connectDatabase;