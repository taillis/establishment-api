const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");

module.exports = asyncHandler(async (req, res) => {
  try {
    const estasblishment = await establishmentRepository.delete(
      req.estasblishment._id
    );

    res.send(estasblishment);
  } catch (error) {
    res.status(400).send({
      error: true,
      status: 400,
      stack: error,
      message: error.message,
    });
  }
});
