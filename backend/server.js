const colors = require("colors");
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//config 
dotenv.config({path:"backend/config/config.env"});

//Handling Uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error : ${err.message}`);
    console.log(`Sutting down the server due to Uncaught Exception`)
    process.exit(1);
})
//connecting to database
connectDatabase();
const server = app.listen(process.env.PORT,() =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`.bgGreen.white);
})

process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(() =>{
        process.exit(1);
    })
})