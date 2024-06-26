import dayjs from "dayjs";
import { calendar, oauth2Client } from "../index.js";
import { v4 as uuid } from "uuid";

// Create Events
export const CreateEvents = async (req, res) => {
  try {
    const { title, description, startdateTime, endDateTime, attendees } = req.body

    await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary",
      requestBody: {
        summary: title,
        description: description,
        start: {
          dateTime: startdateTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: attendees,
        // hangoutLink: "https://meet.google.com/zyu-ywhh-ckz",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Event Created Successfully!"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events
export const AllEvents = async (req, res) => {
  try {
    let events = await calendar.events.list({
      calendarId: "primary",
      auth: oauth2Client,
    });

    res.send({ events: events?.data?.items });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update The Events
export const UpdateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, startdateTime, endDateTime, attendees } = req.body

    await calendar.events.update({
      auth: oauth2Client,
      eventId: eventId,
      calendarId: "primary",
      requestBody: {
        summary: title,
        description: description,
        start: {
          dateTime: startdateTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: attendees,
        // hangoutLink: "https://meet.google.com/zyu-ywhh-ckz",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Event Updated Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Event By Id
export const DeleteEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    let events = await calendar.events.delete({
      calendarId: "primary",
      auth: oauth2Client,
      eventId: eventId,
    });

    return res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Event By Id
export const GetEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await calendar.events.get({
      calendarId: "primary",
      eventId: eventId,
      auth: oauth2Client,
    });

    res.json({ success: true, event: event.data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
