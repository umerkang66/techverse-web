const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/app-error');
const userRouter = require('./routes/user');
const lostItemRouter = require('./routes/lost-item');

const app = express();

app.use(cors({ origin: 'http://localhost:5173/', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/users', userRouter);
app.use('/lost-item', lostItemRouter);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log('🌟🌟🌟', err);

  res.status(500).json({
    status: 500,
    message: 'Something Went Wrong',
  });
});

module.exports = app;
