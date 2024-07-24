const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const { getCheckoutSession } = require('../controllers/bookingController');

const router = express.Router({
  mergeParams: true,
});

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

module.exports = router;
