const Reservation = require("../controllers/reservation");

module.exports = app => {
  // Signup by Email with JWT
  app.post("/send", Reservation.send);
};
