// const router = require("express").Router();
// let User = require("../models/User");
// const { userService } = require("../services");
// require("dotenv").config();
 
// const { OAuth2Client } = require("google-auth-library");


import express, { Request, Response, NextFunction } from 'express';
import  userService  from '../services/index';
import dotenv from 'dotenv';
import User from '../models/User'; // Assuming User is exported from your User model file

const router = express.Router();
dotenv.config();
//signup
router.post('/signup', async (req: Request, res: Response) => {
  console.log("signup");
  //const { name, email, password } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password; 
  try {
    await userService.signup(name, email, password);
    res.status(201).send({ success: true, message: "user saved successfully" });
    
  } catch (error) {
    res.status(500).send({ success: false, message: "signup error" });
  }
});

//login
router.post("/login", async (req: Request, res: Response) => {
  console.log("login");
  const key = process.env.SECURITY_KEY;
  const email = req.body.email;
  const password = req.body.password;

  try {
    let token = await userService.login(key, email, password);
    if (token) {
      return res
        .status(200)
        .send({ success: true, message: "success", user: token });
    }
  } catch (error) {
    return res.status(401).send({ success: false, message: "No user found" });
  }
});

//JWT authentication
interface CustomRequest extends Request {
  user?: any; // You can replace 'any' with the actual type of your 'user' property
}

const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const key = process.env.SECURITY_KEY;
  const user = req.user;
  try {
    await userService.verifyToken(authHeader, key, user);
    next();
  } catch (error) {
    return res.status(401).send({ success: false, error: "Invalid Token" });
  }
};

// //view all the users
// router.get("/", verifyToken, async (req: Request, res: Response) => {
//   try {
//     let response = await userService.readUsers();
//     if (response) {
//       return res
//         .status(200)
//         .send({ success: true, message: "success", data: response });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .send({ success: false, error: "Error while loading data" });
//   }
// });

//fetch data of one user
router.get("/find", verifyToken, async (req: Request, res: Response) => {
  //const userEmail = req.body.email;
  const userEmail = req.query.email;

  try {
    let structuredData = await userService.readUser(userEmail);
    console.log("names 2",structuredData );
   
    if (structuredData) {
      return res.status(200).send({  
        success: true,
        message: "User fetched successfully",
        data: structuredData, 
      });
    } 
  } catch (error) { 
    return res
      .status(500)
      .send({ success: false, error: "Error while loading data" });
  }
});

 
 
//authenticateUser is the middleware where we check if the use is valid/loggedin
  
export default router;
//module.exports = router;
 