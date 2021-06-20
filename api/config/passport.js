const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { Admin } = require("../models/Admin");

const jwtSecret = process.env.PERSONAL_WEBSITE_JWT_SECRET;

// done() signature: done( error, user, info )

module.exports = passport => {
  passport.serializeUser((admin, done) => {
    const tokenKey = admin._id;
    return done(null, tokenKey);
  });

  passport.deserializeUser((tokenKey, done) => {
    Admin.findById(tokenKey, (err, admin) => {
      return done(err, admin);
    });
  });

  passport.use(
    new LocalStrategy(
      // Options:
      {
        usernameField: "adminName",
        passwordField: "password"
      },
      // Verify Callback:
      (adminName, password, done) => {
        Admin.findOne({ adminName }).exec((err, admin) => {
          if (!admin)
            return done(null, false, {
              messagge: "This username is not assigned to any account."
            });
          bcrypt.compare(password, admin.passwordHash, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) return done(null, admin);
            else return done(null, false, { message: "Incorrect password." });
          });
        });
      }
    )
  );

  passport.use(
    new JwtStrategy(
      // Options:
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // NOTE: Generate a new secret for every project online.
        secretOrKey: jwtSecret
      },
      // Verify Callback:
      (payload, done) => {
        Admin.findById({ _id: payload.adminId }).exec((err, admin) => {
          if (err) return done(err, false);
          if (!admin) return done(null, false);
          return done(null, admin);
        });
      }
    )
  );
};
