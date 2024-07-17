const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(
        new AppError(`Document with that id (${req.params.id}) not found`, 404),
      );
    }

    await Model.deleteOne({ _id: req.params.id });

    res.status(203).json({
      status: 'success',
      data: null,
    });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(
        new AppError(`Document with that id (${req.params.id}) not found`, 404),
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { data: document },
    });
  });

const getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);

    const document = await query;

    if (!document) {
      return next(
        new AppError(`Document with that id (${req.params.id}) not found`, 404),
      );
    }

    res.status(200).json({ status: 'success', data: { data: document } });
  });

const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    // To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.id) filter = { tour: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query);

    features.filter().sort().limitFields().paginate();

    // EXECUTE QUERY
    const document = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: document.length,
      data: { data: document },
    });
  });

module.exports = { deleteOne, updateOne, createOne, getOne, getAll };
