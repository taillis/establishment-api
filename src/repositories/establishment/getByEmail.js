const Establishment = require("../../models/establishment");

module.exports = async (email) => {
  try {
    return await Establishment.findOne({
      email: email,
    });
  } catch (error) {
    return error;
  }
};
