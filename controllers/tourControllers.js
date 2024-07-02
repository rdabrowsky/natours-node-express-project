const EXCLUDED_FIELDS = require('../consts');
const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    const queryObject = { ...req.query };
    EXCLUDED_FIELDS.forEach((el) => delete queryObject[el]);

    // 1B) Advanced filtering
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    let query = Tour.find(JSON.parse(queryString));

    // 2 Sorting
    if (req.query.sort) {
      const sortQuery = req.query.sort.replace(/,/g, ' ');

      query = query.sort(sortQuery);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.replace(/,/g, ' ');

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4 Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const totalTours = await Tour.countDocuments();

      if (skip >= totalTours) {
        throw new Error('This page does not exist');
      }
    }

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(201).json({
      status: 'success',
      results: tours.length,
      page,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const aliasTopTours = (req, res, next) => {
  const queries = {
    limit: '5',
    sort: '-ratingsAverage,price',
    fields: 'name,price,ratingsAverage,summary,difficulty',
  };

  req.query = { ...queries };

  next();
};

const getTour = (req, res) => {};

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
const deleteTour = (req, res) => {};
const updateTour = (req, res) => {};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  aliasTopTours,
};
