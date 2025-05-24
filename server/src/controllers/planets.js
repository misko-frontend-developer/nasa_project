const { getPlanets } = require("../models/planets.js");

async function getAllPlanets(req, res) {
  const data = await getPlanets();
  res.status(200).json(data);
}

module.exports = {
  getAllPlanets,
};
