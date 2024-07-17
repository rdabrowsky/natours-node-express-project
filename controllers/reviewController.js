const Review = require('../models/reviewModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');

const setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

const getAllReviews = getAll(Review);

const getReview = getOne(Review);
const createReview = createOne(Review);
const deleteReview = deleteOne(Review);
const updateReview = updateOne(Review);

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview,
  setTourUserIds,
};
