const express = require('express');
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateProfile,
  deleteProfile,
} = require('../controllers/userControllers');
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('/update-password', protect, updatePassword);
router.patch('/update-profile', protect, updateProfile);
router.delete('/delete-profile', protect, deleteProfile);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
