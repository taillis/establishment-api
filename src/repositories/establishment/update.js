const Establishment = require("../../models/establishment");

module.exports = async (_id, data) => {
  try {
    return await Establishment.findByIdAndUpdate(_id, data);
  } catch (error) {
    return {
      error,
    };
  }
};
