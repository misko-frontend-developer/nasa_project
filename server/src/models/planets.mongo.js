const mongoose = require("mongoose");

const planetSchema = mongoose.Schema({
  keplerName: {
    type: String,
    requried: true,
  },
});

module.exports = mongoose.model("Planet", planetSchema);
