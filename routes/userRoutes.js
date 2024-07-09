const express = require('express');
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userControllers');
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
