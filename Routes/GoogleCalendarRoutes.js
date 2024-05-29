import express from "express";
import {
  googleAuth,
  logout,
  redirectURI,
} from "../Controller/GoogleCalendarController.js";

const app = express.Router();

// ROUTE - api/v1/google
app.get("/google", googleAuth);
// ROUTE - /google/redirect
app.get("/google/redirect", redirectURI);
// ROUTE - /logout
app.get("/logout", logout);

export default app;
