import express from "express";
import {
  AllEvents,
  CreateEvents,
  DeleteEventById,
  GetEventById,
  UpdateEventById,
} from "../Controller/CalendarController.js";

const app = express.Router();

// ROUTE - /create-events
app.post("/create-events", CreateEvents);
// ROUTE - /events
app.get("/events", AllEvents);
// ROUTE - /update-events/:id
app.put("/update-events/:id", UpdateEventById);
// ROUTE - /delete-events/:id
app.delete("/delete-event/:id", DeleteEventById);
// ROUTE - /event/:id
app.get("/event/:id", GetEventById);

export default app;
