const express = require("express");

const { getAllLaunches } = require("../controllers/launches");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLaunches);

module.exports = launchesRouter;
