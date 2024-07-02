const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  aliasTopTours,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').post(createTour).get(getAllTours);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
