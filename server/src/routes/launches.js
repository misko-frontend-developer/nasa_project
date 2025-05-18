const express = require("express");

const { httpGetAllLaunches, httpNewLaunch, httpAbortLaunch } = require("../controllers/launches");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
