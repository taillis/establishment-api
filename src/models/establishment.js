const mongoose = require("mongoose");

const EstablishmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    searchName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, require: true },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Establishment",
  EstablishmentSchema,
  "Establishment"
);
