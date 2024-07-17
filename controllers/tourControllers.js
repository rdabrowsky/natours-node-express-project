const asyncHandler = require('../utils/asyncHandler');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');
const Tour = require('../models/tourModel');

const aliasTopTours = (req, res, next) => {
  const queries = {
    limit: '5',
    sort: '-ratingsAverage,price',
    fields: 'name,price,ratingsAverage,summary,difficulty',
  };

  req.query = { ...queries };

  next();
};

const getTour = getOne(Tour, { path: 'reviews' });

const getAllTours = getAll(Tour);

const createTour = createOne(Tour);

const deleteTour = deleteOne(Tour);

const updateTour = updateOne(Tour);

const getTourStats = asyncHandler(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: {
          $gte: 4.5,
        },
      },
    },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgRating: 1,
      },
    },
  ]);

  res.status(201).json({
    status: 'success',
    data: { stats },
  });
});

const getMonthlyPlan = asyncHandler(async (req, res, next) => {
  const { year } = req.params;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    {
      $project: {
        _id: 0,
      },
    },
    { $sort: { numTourStarts: -1 } },
    { $limit: 12 },
  ]);

  res.status(201).json({
    status: 'success',

    data: { plan },
  });
});

module.exports = {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};
