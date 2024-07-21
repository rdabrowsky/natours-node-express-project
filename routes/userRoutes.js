const express = require('express');
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userControllers');
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  logout,
  restrictTo,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.get('/logout', logout);
router.post('/login', signIn);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/update-password', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);

// Restrict all routes after this middleware
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
