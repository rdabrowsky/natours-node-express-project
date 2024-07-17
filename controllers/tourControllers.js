const APIFeatures = require('../utils/apiFeatures');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const { deleteOne } = require('./handlerFactory');
const Tour = require('../models/tourModel');

const getAllTours = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query);
  features.filter().sort().limitFields().paginate();

  // EXECUTE QUERY
  const tours = await features.query;

  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

const aliasTopTours = (req, res, next) => {
  const queries = {
    limit: '5',
    sort: '-ratingsAverage,price',
    fields: 'name,price,ratingsAverage,summary,difficulty',
  };

  req.query = { ...queries };

  next();
};

const getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');

  if (!tour) {
    return next(
      new AppError(`Tour with that id (${req.params.id}) not found`, 404),
    );
  }

  res.status(200).json({ status: 'success', data: tour });
});

const createTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { tour },
  });
});

// const deleteTour = asyncHandler(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id);
//
//   if (!tour) {
//     return next(
//       new AppError(`Tour with that id (${req.params.id}) not found`, 404),
//     );
//   }
//
//   await Tour.deleteOne({ _id: req.params.id });
//
//   res.status(203).json({
//     status: 'success',
//     message: `Tour with id (${req.params.id}) deleted successfully.`,
//     data: null,
//   });
// });

const deleteTour = deleteOne(Tour);

const updateTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(
      new AppError(`Tour with that id (${req.params.id}) not found`, 404),
    );
  }
});

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
