const asyncHandler = require('../utils/asyncHandler');

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: '',
    data: 'users',
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: '',
    data: 'user with id',
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: '',
    data: 'deleteUser',
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: '',
    data: 'updateUser',
  });
};

const createUser = asyncHandler(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: 'user created',
  });
});

module.exports = { getAllUsers, getUser, deleteUser, updateUser, createUser };
