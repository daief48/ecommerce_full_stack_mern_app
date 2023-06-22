const app = require("./app");
const dotenv = require("dotenv");

// Hanlding Uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`)

    process.exit(1);
})
const connectDatabase = require("./config/database");
const colors = require("colors")
//Config 
dotenv.config({path:"backend/config/config.env"});

//Connecting to database
connectDatabase()
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`.bgGreen.white)
})

// unhandled Promise Rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(() =>{
        process.exit(1);
    })
})