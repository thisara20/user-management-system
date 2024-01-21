"use client";
//import {  Field, Form,  } from 'formik';
import styles from "./signup.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useLayoutEffect } from "react";

import {
  Container,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { useRouter } from "next/navigation";
 
import axios from "axios";
 
import { redirect } from "next/navigation";

import ProtectedRoute from "../../components/protectedRoutes";
import protectedRoutes from "../../components/protectedRoutes";
// Define a custom theme with desired colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // Blue color
    },
    secondary: {
      main: "#4CAF50", // Green color
    },
  },
});

 

const Profile = () => {
  const [UserData, setUserData] = useState([]);
  const [email, setEmail] = useState<String | null>("");
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined (ensuring it's executed on the client side)
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
      getAllUsers();
    }
  }, []);
 
  const handleSignOut =() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push(`/`);
  }
  const getAllUsers = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8070/user/find?email=${email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", result.data);
      if (result.data.data && result.data.data.length > 0) {
        const user = result.data.data[0];
        console.log("API name:", result.data.data[0].name);

        if (user.name) {
          setUserData(user);
          setName(user.name);
        } else {
          console.error("Name not found in the user object:", user);
        }
      } else {
        console.error("No data found in the API response:", result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h4" gutterBottom color="primary">
                Profile
              </Typography>
              <Typography variant="h6" color="secondary">
                Name: {name}
              </Typography>
              <Typography variant="h6" color="secondary">
                Email: {email}
              </Typography>
            </Paper>
            <Button type="submit" variant="contained" color="primary" onClick ={handleSignOut}>
                Sign Out
              </Button>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
};
export default protectedRoutes(Profile);
