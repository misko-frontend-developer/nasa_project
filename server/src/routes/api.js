const express = require("express");

const planetsRouter = require("./planets");
const launchesRouter = require("./launches");

const api = express.Router();
api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
