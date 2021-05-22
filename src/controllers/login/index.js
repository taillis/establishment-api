const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Establishment = require("../../models/establishment");

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

  const user = await Establishment.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).send({
      status: 400,
      error: true,
      message: "Establishment not found, please, register it!",
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send({
      status: 400,
      error: true,
      message: "Email or password is wrong",
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_TOKEN
  );

  res.header("auth-token", token).status(200).send({
    status: 200,
    error: false,
    token: token,
    message: "Logged in",
  });
};
