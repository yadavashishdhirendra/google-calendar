import dayjs from "dayjs";
import { calendar, oauth2Client } from "../index.js";
import { v4 as uuid } from "uuid";
import { google } from "googleapis";

// Create Events
export const CreateEvents = async (req, res) => {
  try {
    await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      requestBody: {
        summary: "This Is A Test Event",
        description: "Created By Ashish - Node JS",
        start: {
          dateTime: dayjs(new Date()).add(1, "day").toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dayjs(new Date())
            .add(1, "day")
            .add(1, "hour")
            .toISOString(),
          timeZone: "Asia/Kolkata",
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: [
          {
            email: "ashish.yadav@menrocks.in",
          },
        ],
        hangoutLink: "https://meet.google.com/zyu-ywhh-ckz",
      },
    });

    return res.send("Event Created Successfully!");
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
    const oauth2Clients = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );
    let events = await calendar.events.list({
      calendarId: "primary",
      auth: oauth2Clients,
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
    const requestBody = {
      summary: "This Is A Test Event",
      description: "Created By Ashish - Node JS Updated",
      start: {
        dateTime: dayjs(new Date()).add(1, "day").toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [
        {
          email: "ashish.yadav@menrocks.in",
        },
      ],
    };
    const eventId = req.params.id;
    let events = await calendar.events.update({
      calendarId: "primary",
      auth: oauth2Client,
      eventId: eventId,
      requestBody: requestBody,
    });

    res.send({ events: events });
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
