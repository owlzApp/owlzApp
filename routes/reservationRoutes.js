const Reservation = require("../controllers/reservation");

module.exports = app => {
  // Send Reservation
  app.post("/api/send", Reservation.send);
  // Get All Reservation
  app.get("/api/allReservation", Reservation.getAllReservation);
  // Edit Reservation
  app.post("/api/reservation", Reservation.editReservation);
  // Delete Reservation
  app.delete("/api/reservation/:id", Reservation.deleteReservation);
};
