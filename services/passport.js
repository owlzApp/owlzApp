// const mongoose = require('mongoose');
const keys = require("../config/keys");
const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const localStrategy = require("passport-local");

// Create local strategy
const localOptions = { usernameField: "email" };
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
const jwtLogin = new JwtStrategy(jwtOptions, function(req,payload, done) {
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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("access Token", accessToken);
      console.log("refresh Token", refreshToken);
      console.log("profile", profile);
      // don't have double User with same profileId
      const existingUser = await User.findOne({ googleId: profile.id});

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
        }).save()
          done(null, user);
      }
    }
  )
);

// Instagram Auth
passport.use(
  new InstagramStrategy(
    {
      clientID: keys.instagramClientID,
      clientSecret: keys.instagramClientSecret,
      callbackURL: "/auth/instagram/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done)=>{
      console.log('access token',accessToken);
      console.log('refresh token',refreshToken);
      console.log('profile:',profile);

      // don't have double User with same profileID
      const existingUser = await User.findOne({ instagramId: profile.id })
        if (existingUser) {
          // We already have record with given profile ID
          done(null, existingUser);
        } else {
          // We don't have a user with this ID, make a new record
          const user = await new User({ 
            instagramId: profile.id,
            avatar: profile._json.data.profile_picture,
            firstName: profile._json.data.full_name
            }).save()
            done(null, user);
        }
    }
  )
);

// Facebook Auth
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('access token',accessToken);
      console.log('refresh token',refreshToken);
      console.log('profile:',profile);
      // don't have double User with same profileID
      const existingUser = await User.findOne({ facebookId: profile.id })
        if (existingUser) {
          // We already have record with given profile ID
          done(null, existingUser);
        } else {
          // We don't have a user with this ID, make a new record
          const user = await new User({ 
            facebookId: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            email: profile._json.email,
            avatar: "https://graph.facebook.com/"+profile.id+"/picture?type=large&width=720&height=720"
          }).save()
            done(null, user);
        }
    }
  )
);

// Linkedin Auth
passport.use(
  new LinkedInStrategy(
    {
      clientID: keys.linkedinClientID,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: "/auth/linkedin/callback",
      scope: [ 'r_liteprofile', 'r_emailaddress', 'w_member_social'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
       console.log('access token',accessToken);
        console.log('refresh token',refreshToken);
        console.log('profile:',profile);
      // don't have double User with same profileID
      const existingUser = await User.findOne({ linkedinId: profile.id})
        if (existingUser) {
          // We already have record with given profile ID
          done(null, existingUser);
        } else {
          // We don't have a user with this ID, make a new record
          const user = await new User({ 
            linkedinId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            avatar: profile.photos[1].value            
          }).save()
            done(null, user);
        }
    }
  )
);