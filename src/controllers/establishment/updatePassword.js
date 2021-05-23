const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");
const sanitizeEstablishment = require("../../helpers/sanitizeEstablishment");

const schema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().min(6).valid(Joi.ref("password")).required(),
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
    const establishment = await establishmentRepository.getById(
      req.establishment._id
    );

    const validPassword = await bcrypt.compare(
      req.body.currentPassword,
      establishment.password
    );

    if (!validPassword) {
      return res.status(401).send({
        status: 401,
        error: true,
        message: "Incorrect current password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await establishmentRepository.update(req.establishment._id, {
      password: hashPassword,
    });

    res.status(200).send({
      error: false,
      status: 200,
      message: "Password updated",
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
