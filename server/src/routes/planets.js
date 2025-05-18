const express = require("express");

const planetsRouter = express.Router();

const { getAllPlanets } = require("../controllers/planets.js");

planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;
