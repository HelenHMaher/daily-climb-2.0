const passport = require("passport");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("express-favicon");
const express = require("express");

module.exports = (app, db) => {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("logged in");
      next();
    } else {
      console.log("not logged in");
      res.redirect("/login");
    }
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(favicon(__dirname + "/build/favicon.png"));

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
    })
  );

  app.get("/logout", function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/login");
  });

  app.post(
    "/register",
    function (req, res, next) {
      db.collection("climber-profiles").findOne(
        { username: req.body.username },
        (err, user) => {
          if (err) {
            next(err);
          } else if (user) {
            console.log("username has already been taken");
            res.redirect("/login");
          } else {
            const hash = bcrypt.hashSync(req.body.password, 12);
            db.collection("climber-profiles").insertOne(
              {
                username: req.body.username,
                password: hash,
              },
              (err, doc) => {
                if (err) {
                  res.redirect("/login");
                } else {
                  console.log("new user " + req.body.username + " logged in");
                  next(null, user);
                }
              }
            );
          }
        }
      );
    },
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/login",
    })
  );

  app.use("/", ensureAuthenticated, express.static(__dirname + "/build"));

  app.get("/profile", function (req, res, next) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
