const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const reservationSchema = new Schema({
  city: String,
  date: String,
  dateCall: String,
  dateEnd: String,
  timeCall: String,
  email: String,
  lastName: String,
  firstName: String,
  message: String,
  phone: String,
  people: String,
  peopleFemale: String,
  peopleMale: String,
  interest: String
});

// Create the model class
const ModelClass = mongoose.model("reservations", reservationSchema);

// Export the model
module.exports = ModelClass;
