const asyncHandler = require('../utils/asyncHandler');
const Review = require('../models/reviewModel');

const createReview = asyncHandler(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;

  const { review, rating, tour, user } = req.body;

  const newReview = await Review.create({
    user,
    tour,
    review,
    rating,
  });

  res.status(201).json({ status: 'success', data: { review: newReview } });
});

const getAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    data: reviews,
    length: reviews.length,
  });
});

module.exports = {
  getAllReviews,
  createReview,
};
