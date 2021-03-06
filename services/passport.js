// const mongoose = require('mongoose');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const localStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new localStrategy(localOptions, function(
  email,
  password,
  done
) {
  // verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    // compare passwords - is password is equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

// setup option for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.secret,
  passReqToCallback: true
};

// Create Jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(req, payload, done) {
  // See if the user Id in the payload exists in our database
  // If does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      req.user = user; // <= Add this line
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

// Generate token
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    user.whatever = 'you like';
    done(null, user);
  });
});

// Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('access Token', accessToken);
      console.log('refresh Token', refreshToken);
      console.log('profile', profile);
      // don't have double User with same profileId
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // We aleready have record with given profile ID
        done(null, existingUser);
      } else {
        // we don't have a user with ID, make a new record
        const user = await new User({
          googleId: profile.id,
          email: profile._json.email,
          avatar: profile._json.picture,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name
        }).save();
        done(null, user);
      }
    }
  )
);
