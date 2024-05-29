import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { google } from "googleapis";
import GoogleCalendarRoutes from "./Routes/GoogleCalendarRoutes.js";
import CalendarRoutes from "./Routes/CalendarRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // Use environment variable for port or default to 8000

app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies
}));

// OAuth2 Client Setup
export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// Google Calendar API Setup
export const calendar = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDAR_API_KEY,
});

// Middleware to make OAuth2 client and Calendar API accessible in routes
app.use((req, res, next) => {
  req.oauth2Client = oauth2Client;
  req.calendar = calendar;
  next();
});

// Using Routes
app.use(GoogleCalendarRoutes);
app.use(CalendarRoutes);

app.listen(PORT, () => {
  console.log(`Server Is Listening on PORT:${PORT}`);
});
