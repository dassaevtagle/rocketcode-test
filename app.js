const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const usersRouter = require('./routes/users');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(['production'].includes(process.env.NODE_ENV)){
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.use('/api/users', usersRouter);

module.exports = app;
