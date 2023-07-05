const app = require("./app");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`.bgRed.white);
    console.log("Shutting down the server due to Uncaught Exception".bgMagenta.white);
    process.exit(1);
})
//config

dotenv.config({path:"backend/config/config.env"});

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,() =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`.bgYellow.white)
})

// Unhandled Promise Rejection
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`.bgRed.white);
    console.log("Shutting down the server due to Unhandled Promise Rejection".bgMagenta.white);

    server.close(() =>{
        process.exit(1);
    })
})