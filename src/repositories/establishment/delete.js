const Estasblishment = require("../../models/establishment");

module.exports = async (_id) => {
  try {
    return await Estasblishment.deleteOne({ _id });
  } catch (error) {
    return error;
  }
};
