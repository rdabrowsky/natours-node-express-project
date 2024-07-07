const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourControllers');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').post(createTour).get(protect, getAllTours);
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
