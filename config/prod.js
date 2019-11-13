// prod.js - production keys here!!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  secret: process.env.SECRET,
  siteUrl: process.env.SITE_URL,
  sendGrid: process.env.SENDGRID_API_KEY
};
