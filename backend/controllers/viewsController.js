const Tour = require('../models/tourModel');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');

const getOverview = asyncHandler(async (req, res, next) => {
  // 1) Get tour data
  const tours = await Tour.find({});
  // 2) Build template

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Sign in',
  });
};
const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
    user: req.user,
  });
};

const getMyTours = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIds = bookings.map((el) => el.tour.id);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});
module.exports = { getTour, getOverview, getLoginForm, getAccount, getMyTours };
