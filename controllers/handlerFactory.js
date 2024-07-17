const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');

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

module.exports = { deleteOne };
