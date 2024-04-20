const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const colors=require("colors")
const morgan=require("morgan")
// -------------------------------------------------------------
// Here, the code imports necessary modules for building a Node.js application using Express. These modules include express for creating a web server, cors for handling Cross-Origin Resource Sharing, dotenv for managing environment variables, colors for adding colors to console logs, morgan for HTTP request logging, and connectDB for connecting to a MongoDB database.
// -------------------------------------------------------------
const connectDB = require("./config/db")
//1.dotenv config
dotenv.config()
// -------------------------------------------
//dotenv.config() is typically a method 
//used in the context of managing environment 
//variables in a Node.js application.
//This line configures the dotenv module,
//  allowing the application to read environment variables from a .env file.
// ----------------------------------



//mongoDb connection
connectDB()
//2.Rest Object
const app=express()
// -------------------------------------
//This line creates an instance of the Express application, 
//which will be used to define routes and handle HTTP requests. 
// -------------------------------------
// console.log('====================================');
// console.log(app);
// console.log('====================================');
//3.middlewares =>before executing Api the rest contents are execute here
app.use(cors()) //enable cors() because to send cros origine request
//  cors() Enables Cross-Origin Resource Sharing, allowing the server to respond to requests from different origins.
app.use(express.json()) //we can send the json data and receive the json data
//express.json(): Parses incoming JSON requests, making the JSON data
app.use(morgan('dev')) // when ever api hit ,it shows here
//morgan('dev'): Sets up HTTP request logging in the development environment.

//4.routs
// app.get("",(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:'My name is subham'
//     })
// })
app.use("/api/v1/auth", require("./routes/userRoutes"))
app.use("/api/v1/post", require("./routes/postRouter"))
//home
// app.get("/",(req,res)=>{
//     res.status(200).send({
//         "success":"true",
//         "message":"node server running"
//     })
// })
app.get("/",(req,res)=>{
    res.status(200).send("technowell is my company")
})

//This line sets up a route for handling requests starting with "/api/v1/auth". The actual route handling logic is likely defined in the "./routes/userRoutes" file.
//5.Port =>we accept the port from .env
//
const PORT = process.env.PORT || 8080 
//This line sets the port number for the server. It uses the value from the environment variable PORT if available, otherwise defaults to port 8080.
//6.listen
app.listen(PORT,()=>{
    console.log(`server running ${PORT}`.bgGreen.white)
})
//The server is started on the specified port, and a log message is printed to the console indicating that the server is running.
