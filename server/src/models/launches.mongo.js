const mongoose = require("mongoose");

const launchesSchema = mongoose.Schema({
  flightNumber: {
    type: Number,
    requried: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: {
    type: [String],
  },
  upcoming: {
    type: Boolean,
    requried: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Launch", launchesSchema);
