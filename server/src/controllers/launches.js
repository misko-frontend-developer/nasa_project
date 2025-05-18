const { addNewLaunch, existsLaunchWithId, getAllLaunches, abortLaunch } = require("../models/launches");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}
function httpNewLaunch(req, res) {
  const launch = req.body;
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
    return res.status(400).json({
      error: "Missing required property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunch(launchId);
  return res.status(200).json(aborted);
}
module.exports = { httpGetAllLaunches, httpNewLaunch, httpAbortLaunch };
