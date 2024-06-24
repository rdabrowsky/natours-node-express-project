const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/').post(createTour).get(getAllTours);
router.route('/:id').get(getTour);

module.exports = router;
