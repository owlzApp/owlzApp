const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const reservationSchema = new Schema({
  email: String,
  lastName: String,
  firstName: String,
  message: String
});

// Create the model class
const ModelClass = mongoose.model("reservations", reservationSchema);

// Export the model
module.exports = ModelClass;
