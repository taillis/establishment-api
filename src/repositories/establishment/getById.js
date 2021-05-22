const Establishment = require("../../models/establishment");

module.exports = async (_id) => {
  try {
    return await Establishment.findById(_id);
  } catch (error) {
    return {
      error,
    };
  }
};
