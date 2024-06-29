const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/').post(createTour).get(getAllTours);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
