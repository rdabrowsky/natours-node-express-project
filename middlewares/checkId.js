const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`),
);

const checkID = (req, res, next, val) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }

  next();
};

module.exports = checkID;
