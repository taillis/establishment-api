const jwt = require("jsonwebtoken");
const establishmentRepository = require("../repositories/establishment");

const auth = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({
      error: true,
      status: 401,
      message: "Access denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      res
        .status(400)
        .send({
          error: true,
          status: 400,
          message: "Invalid token",
        })
        .end();
    }

    const establishment = await establishmentRepository.getById(decoded._id);

    if (!establishment || establishment.error)
      res
        .status(400)
        .send({
          error: true,
          status: 400,
          message:
            (establishment && establishment.error) ||
            "Establishment not found, please, register it!",
        })
        .end();

    req.establishment = establishment;

    next();
  } catch (error) {
    res.status(400).send({
      error: true,
      status: 400,
      stack: error,
      message: error.message,
    });
  }
};

module.exports = auth;
