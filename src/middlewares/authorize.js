const jwt = require("jsonwebtoken");
const establishmentRepository = require("../repositories/establishment");

// Auth middleware to verify if user if logged based on its token
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
    // Decode token to get its data
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      res
        .status(401)
        .send({
          error: true,
          status: 401,
          message: "Invalid token",
        })
        .end();
    }

    // Find establishment using decoded data
    const establishment = await establishmentRepository.getById(decoded._id);

    if (!establishment || establishment.error)
      res
        .status(404)
        .send({
          error: true,
          status: 404,
          message:
            (establishment && establishment.error) ||
            "Establishment not found, please, register it!",
        })
        .end();

    // Set establishment on request object to use it on all application
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
