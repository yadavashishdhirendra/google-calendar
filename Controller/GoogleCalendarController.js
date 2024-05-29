import { oauth2Client } from "../index.js";

// Login Using OAuth
export const googleAuth = async (req, res) => {
  try {
    const scopes = [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    res.redirect(url);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Redirect After SuccessFull Login
export const redirectURI = async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.send({
      success: true,
      message: "You have successfully logged in.",
      tokens: tokens,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear tokens from session
    console.log(req.session.tokens);
    req.session.tokens = null;

    res.send({
      success: true,
      message: "You have successfully logged out.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
