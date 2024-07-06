const express = require('express');
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userControllers');
const { signup } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
