const express = require("express");
const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require('passport');
const cors = require("cors");
require('dotenv').config();

const user = require('./api/routes/user.route');
const upload = require("./api/routes/upload.route");
const repo = require('./api/routes/repo.route')

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(passport.initialize());


app.use('/api/v1/auth', user);
app.use('/api/v1/upload', upload);
app.use('/api/v1/repository', repo)
app.get("/", (req, res) => res.send("Hello welcome"));
app.get("*", (req, res) => {
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
