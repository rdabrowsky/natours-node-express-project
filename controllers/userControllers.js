const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { deleteOne, updateOne, getOne, getAll } = require('./handlerFactory');

const filterObj = (object, ...allowedFields) => {
  const newObj = {};

  Object.keys(object).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = object[el];
    }
  });

  return newObj;
};

const updateMe = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates', 400));
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: 'success', data: null });
});

const createUser = asyncHandler(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: 'user created',
  });
});

const getMe = (req, res, next) => {
  req.params.id = req.user.id;

  next();
};

const getAllUsers = getAll(User);

const getUser = getOne(User);

const deleteUser = deleteOne(User);

// Don't update password with this
const updateUser = updateOne(User);

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  updateMe,
  deleteMe,
  getMe,
};
