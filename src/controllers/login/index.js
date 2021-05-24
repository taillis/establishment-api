const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const establishmentRepository = require("../../repositories/establishment");
const sanitizeEstablishment = require("../../helpers/sanitizeEstablishment");

// Schema to validate login params
const schema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

module.exports = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: 400,
      error: true,
      message: error.details[0].message,
    });
  }

  // Try to get establishment by email to check if it exists
  const establishment = await establishmentRepository.getByEmail(
    req.body.email
  );

  if (!establishment) {
    return res.status(404).send({
      status: 404,
      error: true,
      message: "Establishment not found, please, register it!",
    });
  }

  // Verify password provided by user
  const validPassword = await bcrypt.compare(
    req.body.password,
    establishment.password
  );

  if (!validPassword) {
    return res.status(401).send({
      status: 401,
      error: true,
      message: "Email or password is wrong",
    });
  }

  // Generate a token to manage session
  const token = jwt.sign(
    {
      _id: establishment._id,
    },
    process.env.JWT_TOKEN
  );

  res
    .header("auth-token", token)
    .status(200)
    .send({
      status: 200,
      error: false,
      token: token,
      message: "Logged in",
      ...sanitizeEstablishment(establishment),
    });
};
