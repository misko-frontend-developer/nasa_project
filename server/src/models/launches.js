const launches = new Map();
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function getAllLaunches() {
  return await launchesDatabase.find({});
}
async function abortLaunch(launchId) {
  const launch = await launchesDatabase.findOne({ flightNumber: launchId });
  if (!launch) {
    throw new Error("No matching launch found");
  }
  return await launchesDatabase.findOneAndDelete({ flightNumber: launchId });
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestLaunch()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcomming: true,
    customers: ["NASA", "TEST"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function getLatestLaunch() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
module.exports = {
  launches,
  getAllLaunches,
  existsLaunchWithId,
  abortLaunch,
  scheduleNewLaunch,
};
