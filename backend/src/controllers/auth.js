const jwt = require('jwt');
const User = require('../models/user');

const signToken = userId => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || !email.includes('@')) {
    return next(new AppError('Please provide valid email and password', 400));
  }

  const user = User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);
};

exports.signup = (req, res) => {};
