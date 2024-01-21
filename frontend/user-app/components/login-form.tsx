"use client"; 
import styles from "./login-form.module.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from 'next/link';

export default function LoginForm() {
 
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await axios.post(`http://localhost:8070/user/login`, {
        email,
        password,
      });
      console.log(result);
      if (result.data.user) {
        localStorage.setItem("token", result.data.user);
        localStorage.setItem("email", email);
        localStorage.setItem("isAuth", "isAuth");
        router.push(`/profile`);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <center>
        <div className={styles.centeredContainer}>
          <form onSubmit={handleSubmit}>
            <Paper elevation={3} className={styles.login_box + " p-3"}>
              <Typography variant="h4" gutterBottom>
                Login
              </Typography> 

              <TextField
                fullWidth
                id="email"
                name="email"
                label="email"
                variant="outlined"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" variant="contained" style={{ backgroundColor: '#4caf50', color: 'white',marginTop: '20px' }} >
                Login
              </Button> <br></br> <br></br>
              <Typography   gutterBottom>
               Don't have an account?
              </Typography>
              <Link href="/signup">
              <div style={{ color: 'black', cursor: 'pointer' }}>Sign Up</div>
              </Link>
            </Paper>
          </form>
        </div>
      </center>
    </>
  );
}
