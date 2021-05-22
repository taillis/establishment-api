const asyncHandler = require("express-async-handler");
const Establishment = require("../../models/establishment");

module.exports = asyncHandler(async (req, res) => {
  let establishment = [];
  try {
    establishment = await Establishment.find();
  } catch (error) {}

  res.send(establishment);
});
