var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
// For mongodb atlas server setup
// require("./config/database");

//Combind the mongodb atlas server and data seeding
require("./Seeds/seeds");

var indexRouter = require("./routes/index");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/user-router");
// const { config } = require("dotenv");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/user", usersRouter);
//products router
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("This is the server for Project 3!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
