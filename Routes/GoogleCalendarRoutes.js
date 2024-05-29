import express from "express";
import {
  googleAuth,
  redirectURI,
} from "../Controller/GoogleCalendarController.js";

const app = express.Router();

// ROUTE - /google
app.get("/google", googleAuth);
// ROUTE - /google/redirect
app.get("/google/redirect", redirectURI);

export default app;
