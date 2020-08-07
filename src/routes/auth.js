const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    db.collection("climber-profiles").findOne(
      { _id: new ObjectID(id) },
      (err, doc) => {
        done(null, doc);
      }
    );
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      db.collection("climber-profiles").findOne({ username }, (err, user) => {
        if (err) {
          console.log("User " + username + " attempted to log in (error).");
          return done(err);
        }
        if (!user) {
          console.log("Unknown user " + username + " attempted to log in.");
          return done(null, false, { message: "Invalid username." });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          console.log(
            "User " + username + " attempted to log in (invalid password)."
          );
          return done(null, false, { message: "Invalid password." });
        }
        console.log("User " + username + " logged in.");
        return done(null, user);
      });
    })
  );
};
