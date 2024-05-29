import express from "express";
import {
  AllEvents,
  CreateEvents,
  DeleteEventById,
  GetEventById,
  UpdateEventById,
} from "../Controller/CalendarController.js";

const app = express.Router();

// ROUTE - api/v1/calendar/create-events
app.get("/create-events", CreateEvents);
// ROUTE - api/v1/calendar/events
app.get("/events", AllEvents);
// ROUTE - api/v1/calendar/update-events/:id
app.put("/update-events/:id", UpdateEventById);
// ROUTE - api/v1/calendar/delete-events/:id
app.delete("/delete-event/:id", DeleteEventById);
app.get("/event/:id", GetEventById);

export default app;
