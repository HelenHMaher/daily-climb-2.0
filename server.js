const express = require("express");
const favicon = require("express-favicon");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongo = require("mongodb").MongoClient;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

mongo.connect(
  process.env.MONGO_URI,
  { useNewURLParser: true, useUnifiedTopology: true },
  (err, client) => {
    let db = client.db("my-daily-climb");
    if (err) {
      console.log("Database err: " + err);
    } else {
      console.group("Successful database connection");

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use(favicon(__dirname + "/build/favicon.ico"));
      app.use("/", express.static(path.join(__dirname, "build")));
      app.get("/heartbeat", function (req, res) {
        res.send("<3");
      });
      app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "build", "login.html"));
      });

      app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "build", "index.html"));
      });

      app.listen(process.env.PORT || 3000, () =>
        console.log("Server is running...")
      );
    }
  }
);
