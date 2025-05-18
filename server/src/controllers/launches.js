const { launches } = require("../models/launches");

function getAllLaunches(req, res) {
  console.log(Array.from(launches.values), 555);
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = { getAllLaunches };
