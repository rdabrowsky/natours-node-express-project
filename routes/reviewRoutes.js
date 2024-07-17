const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  getReview,
  setTourUserIds,
} = require('../controllers/reviewController');

const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(protect, restrictTo('user admin'), deleteReview)
  .patch(protect, updateReview);

module.exports = router;
