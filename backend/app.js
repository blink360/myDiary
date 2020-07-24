var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//import routers
app.use("/user", require("./routes/user"));
app.use("/entries", require("./routes/diaryEntry"));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
