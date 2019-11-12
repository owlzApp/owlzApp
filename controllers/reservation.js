const Reservation = require("../models/Reservation");

exports.send = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const phone = req.body.phone;
  const message = req.body.message;
  const age = req.body.age;
  console.log(req.body);

  if (!email || !firstName) {
    return res
      .status(422)
      .send({ error: "You must provide email and firstname and phone" });
  }

  // if a user with email does not exist, create and save record
  const reservation = new Reservation({
    email: email,
    firstName: firstName,
    phone: phone,
    age: age,
    message: message
  });

  reservation.save(function(error) {
    if (error) {
      return next(error);
    }
  });
};
