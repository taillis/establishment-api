const Estasblishment = require("../../models/establishment");

module.exports = async (establishment) => {
  try {
    const estasblishment = new Estasblishment(establishment);

    return await estasblishment.save();
  } catch (error) {
    return error;
  }
};
