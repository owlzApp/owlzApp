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
  const interest = req.body.interest;
  const date = req.body.date;
  const dateEnd = req.body.dateEnd;
  const dateCall = req.body.dateCall;
  const timeCall = req.body.timeCall;
  const peopleFemale = req.body.peopleFemale;
  const peopleMale = req.body.peopleMale;
  const people = req.body.people;
  const city = req.body.city;

  console.log(req.body);

  if (!phone || !firstName) {
    return res
      .status(422)
      .send({ error: "You must provide email and firstname and phone" });
  }

  // Create Reservation into the database
  const reservation = new Reservation({
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    interest: interest,
    city: city,
    date: date,
    dateEnd: dateEnd,
    people: people,
    peopleFemale: peopleFemale,
    peopleMale: peopleMale,
    message: message,
    dateCall: dateCall,
    timeCall: timeCall
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
  sgMail.send(msg);

  reservation.save(function(error, reservation) {
    if (error) {
      return next(error);
    }
    res.send(reservation);
  });
};

exports.getAllReservation = function(req, res, next) {
  Reservation.find()
    .then(function(dbReservation) {
      res.json(dbReservation);
    })
    .catch(function(error) {
      res.json(error);
    });
};

exports.editReservation = function(req, res, next) {
  console.log(req.body);
  Reservation.findByIdAndUpdate(req.body.id, {
    $set: { book: req.body.form }
  }).then(function(reservation) {
    res.json(reservation);
  });
};

exports.deleteReservation = function(req, res, next) {
  console.log(req.params.id);
  Reservation.findByIdAndRemove(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      res.json(err);
    });
};
