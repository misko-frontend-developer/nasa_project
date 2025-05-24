const {
  scheduleNewLaunch,
  getAllLaunches,
  abortLaunch,
  existsLaunchWithId,
} = require("../models/launches");

async function httpGetAllLaunches(req, res) {
  const data = await getAllLaunches();
  return res.status(200).json(data);
}
async function httpNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Missing required property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid launch date",
    });
    ``;
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existInLaunch = await existsLaunchWithId(launchId);

  if (!existInLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunch(launchId);
  return res.status(200).json(aborted);
}
module.exports = { httpGetAllLaunches, httpNewLaunch, httpAbortLaunch };
