const checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing name and price property',
    });
  }
  next();
};

module.exports = checkBody;
