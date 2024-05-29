import express from "express";
import {
  GetUserInfo,
  LogoutUser,
  googleAuth,
  redirectURI,
} from "../Controller/GoogleCalendarController.js";

const app = express.Router();

// ROUTE - /google
app.get("/google", googleAuth);
// ROUTE - /google/redirect
app.post("/google/redirect", redirectURI);
// ROUTE - /logout
app.get("/logout", LogoutUser)
// ROUTE - /user-info
app.post('/user-info', GetUserInfo)

export default app;
