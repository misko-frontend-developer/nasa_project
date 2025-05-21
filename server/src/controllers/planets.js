const { getAllPlanets: getPlanets } = require("../models/planets.js");

async function getAllPlanets(req, res) {
  const data = await getPlanets();
  await res.status(200).json(data);
}

module.exports = {
  getAllPlanets,
};
