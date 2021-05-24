const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");
const sanitizeEstablishment = require("../../helpers/sanitizeEstablishment");

// Method to get logged establishment's data
module.exports = asyncHandler(async (req, res) => {
  try {
    const establishment = await establishmentRepository.getById(
      req.establishment._id
    );

    if (!establishment || establishment.error)
      res
        .status(404)
        .send({
          error: true,
          status: 404,
          message:
            (establishment && establishment.error) ||
            "Establishment not found!",
        })
        .end();

    res.status(200).send(sanitizeEstablishment(establishment));
  } catch (error) {
    res.status(400).send({
      error: true,
      status: 400,
      stack: error,
      message: error.message,
    });
  }
});
