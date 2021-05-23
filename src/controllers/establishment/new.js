const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");
const sanitizeEstablishment = require("../../helpers/sanitizeEstablishment");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().min(6).valid(Joi.ref("password")).required(),
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

  const emailExist = await establishmentRepository.getByEmail(req.body.email);

  if (emailExist) {
    return res.status(400).send({
      status: 400,
      error: true,
      message: "Email already registered, please, go to login page",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const establishment = await establishmentRepository.create({
      name: req.body.name,
      searchName: req.body.name.toLowerCase(),
      email: req.body.email,
      password: hashPassword,
      location: {
        type: "Point",
        coordinates: [req.body.location.longitude, req.body.location.latitude],
      },
    });

    const token = jwt.sign(
      {
        _id: establishment._id,
      },
      process.env.JWT_TOKEN
    );

    establishment.token = token;
    console.log(establishment);
    res.status(200).send({
      token: token,
      ...sanitizeEstablishment(establishment),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: true,
      status: 400,
      stack: error,
      message: error.message,
    });
  }
});
