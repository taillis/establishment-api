const asyncHandler = require("express-async-handler");
const establishmentRepository = require("../../repositories/establishment");
const establishmentConstants = require("../../constants/establishment");

module.exports = asyncHandler(async (req, res) => {
  try {
    const lng = req.query.lng || establishmentConstants.defaultLatLng.lng;
    const lat = req.query.lat || establishmentConstants.defaultLatLng.lat;
    const distance =
      req.query.distance || establishmentConstants.defaultDistance;
    const name = req.query.name || "";

    const establishment = await establishmentRepository.getNear(
      parseFloat(lng),
      parseFloat(lat),
      name.toLowerCase(),
      parseInt(distance * 1000)
    );

    res.send(establishment);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
