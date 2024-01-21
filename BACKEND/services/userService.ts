 
require("dotenv").config();
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");  

import  User   from '../models/User';
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ObjectId,Error } from 'mongoose';

dotenv.config();

interface IUser extends Document {
  // Your user schema fields here
  name: string;
  email: string;
  password: String ;
}


const signup = async (name: String, email: String, password: String) => {
  const isExistingUser = await User.findOne({ email: email }); //check whether a unique email address
  if (isExistingUser) {
    throw new Error("email already exist");
  } 
  const newUser = new User({
    //create an object from User model
    name,
    email,
    password,
  });
  await newUser.save();
};

const login = async (key:any, email: any, password: string) => {
  try {
    const isExistingUser = await User.findOne({ email: email });

    if (isExistingUser && typeof isExistingUser.password === 'string') {
      if (await bcrypt.compare(password, isExistingUser.password)) {
        const token = jwt.sign(
          {
            email: email,
          },
          key,
          { expiresIn: "1h" }
        );
        return token;
      }
    }

    throw new Error("Unauthorized user");
  } catch (error) {
    throw new Error(`Error in login: ${(error as Error).message}`); 
  }
};


const verifyToken = async (authHeader:any, key:any, user:any) => {
  const token = await authHeader.split(" ")[1] ;
  if (token) {
    const decoded = jwt.verify(token, key);
    user = decoded;
  } else throw new Error("A token is required for authentication");
};

// const readUsers = async () => {
//   const allUser = await User.find();
//   if (allUser) {
//     const structuredData: { name: string; email: string }[] = allUser.map((element: IUser & { _id: ObjectId }) => ({
//       name: element.name?.toString() || "DefaultName", // Use optional chaining and provide a default value
//       email: element.email,
//     }));
//     return structuredData;
//   } else {
//     throw new Error("Error while fetching data");
//   }
// };


const readUser = async (userEmail:any) => {
  const structuredData = [];
  const user = await User.findOne({ email: userEmail });

  if (user) {
    structuredData.push({
      name: user.name, 
    });
    console.log("name 1", structuredData );
    return structuredData;
  } else throw new Error("Error while fetching user data");
};
 
 
 
export default {signup, login, verifyToken, readUser};
 