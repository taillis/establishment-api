const Establishment = require("../../models/establishment");

module.exports = async (long, lat, name, distance) => {
  try {
    return await Establishment.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [long, lat],
          },
          distanceField: "dist.calculated",
          maxDistance: distance,
          spherical: true,
        },
      },
      { $match: { searchName: { $regex: new RegExp(name, "i") } } },
      { $project: { password: 0, __v: 0, searchName: 0 } },
    ]);
  } catch (error) {
    return {
      error,
    };
  }
};
