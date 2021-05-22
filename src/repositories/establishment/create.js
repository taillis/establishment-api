const Establishment = require("../../models/establishment");

module.exports = async (establishment) => {
  try {
    const savedEstablishment = new Establishment(establishment);

    return await savedEstablishment.save();
  } catch (error) {
    return error;
  }
};
