const Joi = require("@hapi/joi");
const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");
const sanitizeEstablishment = require("../../helpers/sanitizeEstablishment");

// Schema to validate request data to update establishment
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  location: Joi.object()
    .keys({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    })
    .required(),
});

module.exports = asyncHandler(async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: 400,
      error: true,
      message: error.details[0].message,
    });
  }

  try {
    // Try to update establishment data on its own repository
    const establishment = await establishmentRepository.update(
      req.establishment._id,
      {
        name: req.body.name,
        email: req.body.email,
        location: {
          type: "Point",
          coordinates: [
            req.body.location.longitude,
            req.body.location.latitude,
          ],
        },
      }
    );

    res.status(200).send({
      message: "Profile updated",
      ...sanitizeEstablishment(establishment),
    });
  } catch (error) {
    res.status(400).send({
      error: true,
      status: 400,
      stack: error,
      message: error.message,
    });
  }
});
