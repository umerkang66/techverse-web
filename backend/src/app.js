const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/app-error');

const app = express();

app.use(cors());
app.use(cookieParser());

app.get('/umer', (req, res) => {
  res.send('umer did this');
});

app.use((err, req, res) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  console.log('🌟🌟🌟', err);

  res.status(500).json({
    status: 500,
    message: 'Something Went Wrong',
  });
});

module.exports = app;
