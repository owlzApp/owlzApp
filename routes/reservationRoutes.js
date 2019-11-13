const Reservation = require("../controllers/reservation");

module.exports = app => {
  // Signup by Email with JWT
  app.post("/api/send", Reservation.send);
};
