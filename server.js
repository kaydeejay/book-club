require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const htmlRouter = require('./routes/htmlRoutes');
const apiRouter = require('./routes/apiRoutes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/public')));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bookClub", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use('/', htmlRouter);
app.use('/api', apiRouter);

module.exports = app;
