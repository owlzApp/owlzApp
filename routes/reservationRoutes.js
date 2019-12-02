const Reservation = require("../controllers/reservation");

module.exports = app => {
  // Send Reservation
  app.post("/api/send", Reservation.send);
  // Get All Reservation
  app.get("/api/allReservation", Reservation.getAllReservation);
};
