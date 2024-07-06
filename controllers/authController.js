const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { user },
  });
});

module.exports = { signup };
