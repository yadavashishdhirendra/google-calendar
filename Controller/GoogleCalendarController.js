import { oauth2Client } from "../index.js";
import axios from 'axios'

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Redirect After SuccessFull Login
export const redirectURI = async (req, res) => {
  try {
    const { code } = req.body;
    console.log(code)

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
      message: error.message,
    });
  }
};



// Get User Info
export const getUserInfo = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required",
    });
  }

  const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        message: "User Retrieved Successfully",
        data: response.data
      });
    } else {
      return res.status(400).json({
        success: false,
        message: response.statusText,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User
export const LogoutUser = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect(`'https://oauth-provider.com/logout?redirect_uri=http://localhost:3000/logout'`)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}