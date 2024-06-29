const fs = require('fs');
const Tour = require('../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`),
);

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({});

    res.status(201).json({
      status: 'success',
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
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

module.exports = { getAllTours, getTour, createTour, deleteTour, updateTour };
