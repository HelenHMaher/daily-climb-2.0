const express = require("express");
const favicon = require("express-favicon");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

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

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
