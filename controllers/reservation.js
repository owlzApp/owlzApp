const Reservation = require("../models/Reservation");
const sgMail = require("@sendgrid/mail");
const config = require("../config/keys");
const templateEmail = require("../services/templateEmail");

exports.send = function(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const message = req.body.message;
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
    message: message
  });

  // Send Email
  sgMail.setApiKey(config.sendGrid);
  const msg = {
    to: "owlz.service@gmail.com",
    from: "owlz.service@gmail.com",
    subject: `You have new reservation from ${firstName} ${lastName}`,
    text: `Hey budy you have a reservation email: ${email} Message: ${message}`,
    html: `<strong>Hey budy you have a reservation email: ${email} Message: ${message}</strong>`
  };
  sgMail.send(msg);

  reservation.save(function(error) {
    if (error) {
      return next(error);
    }
  });
};
