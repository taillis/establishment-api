const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");

module.exports = asyncHandler(async (req, res) => {
  try {
    const establishment = await establishmentRepository.delete(
      req.establishment._id
    );

    res.send(establishment);
  } catch (error) {
    res.status(400).send({
      error: true,
      status: 400,
      stack: error,
      message: error.message,
    });
  }
});
