const Estasblishment = require("../../models/establishment");

module.exports = async (_id) => {
  try {
    return await Estasblishment.findById(_id);
  } catch (error) {
    return {
      error,
    };
  }
};
