const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const getToken = (auth) => {
  let token;
  if (auth && auth.startsWith('Bearer')) {
    token = auth.split(' ')[1];
  }

  return token;
};

const signUp = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user },
  });
});

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Provide email and password`, 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Email or password is incorrect.`, 401));
  }
  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
  });
});

const protect = asyncHandler(async (req, res, next) => {
  // 1) Getting token and check if exist
  const { authorization } = req.headers;
  const token = getToken(authorization);

  if (!token) {
    return next(new AppError(`You are not logged in.`, 401));
  }
  // 2) Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError(
        `The user belonging to this token does no longer exits.`,
        401,
      ),
    );
  }
  // 4) Check if user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError(`User recently changed password. Please log in again.`, 401),
    );

  req.user = user;
  next();
});

const restrictTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403),
      );
    }

    next();
  });

const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  next();
});

const resetPassword = asyncHandler(async (req, res, next) => {
  next();
});

module.exports = {
  signUp,
  signIn,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
};
