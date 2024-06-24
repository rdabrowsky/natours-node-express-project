const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
} = require('../controllers/tourControllers');

const checkID = require('../middlewares/checkId');
const checkBody = require('../middlewares/checkBody');

const router = express.Router();

router.param('id', checkID);

router.route('/').post(checkBody, createTour).get(getAllTours);
router.route('/:id').get(getTour);

module.exports = router;
