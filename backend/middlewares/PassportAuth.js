const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const user = require("../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.USER_SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    user
      .findOne({ email: jwt_payload.email })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
