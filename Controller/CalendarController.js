import dayjs from "dayjs";
import { calendar, oauth2Client } from "../index.js";
import { v4 as uuid } from "uuid";
import { google } from "googleapis";

// Create Events
export const CreateEvents = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken; // Retrieve access token from cookies
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token not found in cookies",
      });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendarClient = google.calendar({ version: 'v3', auth: oauth2Client });
    
    await calendarClient.events.insert({
      calendarId: "primary",
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
