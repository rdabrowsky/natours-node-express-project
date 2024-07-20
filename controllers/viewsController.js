const Tour = require('../models/tourModel');
const asyncHandler = require('../utils/asyncHandler');

const getOverview = asyncHandler(async (req, res, next) => {
  // 1) Get tour data
  const tours = await Tour.find({});
  // 2) Build template

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});
const getTour = (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours',
  });
};

module.exports = { getTour, getOverview };
