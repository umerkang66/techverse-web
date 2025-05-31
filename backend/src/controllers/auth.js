const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/user');
const AppError = require('../utils/app-error');

const jwtVerifyPromisified = promisify(jwt.verify);

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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !email.includes('@')) {
    return next(new AppError('Please provide valid email and password', 400));
  }

  const user = await User.findOne({ email }).select('password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);
};

exports.signup = async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  if (!email.endsWith('@umt.edu.pk'))
    return next(new AppError('Only UMT emails are allowed'));

  if (password !== passwordConfirm)
    return next(new AppError('Password and PasswordConfirm are not Equal'));

  if (role.toLowerCase() === 'admin')
    return next(new AppError('You cannot signup as Admin', 400));

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });

  createSendToken(newUser, 201, req, res);
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

exports.me = async (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;

    try {
      const decoded = await jwtVerifyPromisified(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);

      return res.send({
        data: { user: currentUser || null },
      });
      // don't do anything in the catch, just return the null user
    } catch (error) {}
  }

  res.send({
    data: { user: null },
  });
};

exports.currentUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access', 401)
    );
  }

  try {
    const decoded = await jwtVerifyPromisified(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist',
          401
        )
      );
    }

    req.user = currentUser;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return next(
        new AppError(
          "You don't have the permission to perform this action",
          401
        )
      );
    }

    next();
  };
};
