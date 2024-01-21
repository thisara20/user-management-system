// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const app = express();
// require("dotenv").config();
// const userRouter = require("./routes/User.js");
import express, {Express, Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path'; 
import userRouter from "./routes/User"; // Assuming User.js exports the router
 

require("dotenv").config(); 
 
const app: Express = express();

const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

if (!URL) {
  console.error("MongoDB URL is not defined in the environment variables.");
  process.exit(1); // Exit the process if MongoDB URL is not defined
} 
// const path = require('path');

// const PORT = process.env.PORT || 8070;
// const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/cors', (req: Request, res : Response,next:NextFunction) => {
  res.set('Access-Control-Allow-Origin', '*'); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  })

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB connection success!");
// });

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => {
    console.log("MongoDB connection success!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process in case of a connection error
  });



app.use("/user", userRouter); //user is the url name to call Users.js file

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
