const Reservation = require("../models/Reservation");
const sgMail = require("@sendgrid/mail");
const config = require("../config/keys");
const templateEmail = require("../services/templateEmail");

exports.send = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const message = req.body.message;
  const phone = req.body.phone;
  const people = req.body.people;
  const interest = req.body.interest;

  console.log(req.body);

  if (!email || !firstName) {
    return res
      .status(422)
      .send({ error: "You must provide email and firstname and phone" });
  }

  // Create Reservation into the database
  const reservation = new Reservation({
    email: email,
    firstName: firstName,
    lastName: lastName,
    message: message,
    phone: phone,
    people: people,
    interest: interest
  });

  // Send Email
  sgMail.setApiKey(config.sendGrid);
  let msg = {
    to: "owlz.service@gmail.com",
    from: "owlz.service@gmail.com",
    subject: `You have new reservation from ${firstName} ${lastName}`,
    text: `Hey budy you have a reservation email: ${email} Message: ${message}`,
    html: templateEmail(req.body)
  };
  // sgMail.send(msg);

  reservation.save(function(error, reservation) {
    if (error) {
      return next(error);
    }
    res.send(reservation);
  });
};
