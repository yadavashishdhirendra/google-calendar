import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

const app = express();

const PORT = 8000;

// oAuth Secret
export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// Google Calendar
export const calendar = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDAR_API_KEY,
});

// IMPORTING ROUTES
import GoogleCalendarRoutes from "./Routes/GoogleCalendarRoutes.js";
import CalendarRoutes from "./Routes/CalendarRoutes.js";

// using Routes
app.use(GoogleCalendarRoutes);
app.use(CalendarRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Listening on PORT:${PORT}`);
});
