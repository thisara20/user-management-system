"use client";
import styles from "./signup.module.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function signup() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:8070/user/signup", {
        name,
        email,
        password,
      });

      if (result) {
        router.push("/"); // Use router to navigate
        console.log("sigin up successful");
      } else {
        console.log("sigin up failed");
      }
    } catch (error) {
      console.error("Error during sigin up:", error);
    }
  };

  return (
    <>
      <center>
        <div className={styles.centeredContainer}>
          <form onSubmit={handleSubmit}>
            <Paper elevation={3} className={styles.login_box + " p-3"}>
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>

              <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                variant="outlined"
                margin="normal"
                onChange={(e) => setName(e.target.value)}
              />

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

              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#4caf50", color: "white" ,marginTop: '10px'}}
              >
                Sign Up
              </Button>
              <br></br> <br></br>
              <Typography gutterBottom>Already have an account?</Typography>

              <Link href="/">
              <div style={{ color: 'black', cursor: 'pointer' }}>Sign In</div>
              </Link>
            </Paper>
          </form>
        </div>
      </center>
    </>
  );
}
