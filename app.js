const createError = require("http-errors");
const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";

// Using Promise for Mongoose connection
mongoose.Promise = global.Promise;

// Connecting to Mongoose
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("Succesfully connected to mongo DB"))
  .catch(err => console.log(err));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

var hbs = require("hbs");

hbs.registerHelper("formatDate", function(taskDate) {
  let year = taskDate.getFullYear();
  let month =
    `${taskDate.getMonth() + 1}`.length < 2
      ? `0${taskDate.getMonth() + 1}`
      : `${taskDate.getMonth() + 1}`;
  let day =
    `${taskDate.getDate() + 1}`.length < 2
      ? `0${taskDate.getDate()}`
      : `${taskDate.getDate()}`;
  return `${year}-${month}-${day}`;
  // return new Date(taskDate).toLocaleDateString();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
