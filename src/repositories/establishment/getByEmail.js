const Estasblishment = require("../../models/establishment");

module.exports = async (email) => {
  try {
    return await Estasblishment.findOne({
      email: email,
    });
  } catch (error) {
    return error;
  }
};
