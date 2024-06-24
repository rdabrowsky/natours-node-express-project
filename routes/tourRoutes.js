const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/').post(createTour).get(getAllTours);
router.route('/:tourId').get(getTour);

module.exports = router;
