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
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('redirect_uri', process.env.REDIRECT_URI);
    params.append('grant_type', 'authorization_code');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const { error_description } = await response.json();
      throw new Error(error_description || 'Failed to exchange code for token');
    }

    const { access_token } = await response.json();
    res.json({ accessToken: access_token });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

