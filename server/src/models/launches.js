// const launches = new Map();

const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Super mission",
  rocket: "Rocket 1",
  launchDate: new Date("December 27, 2030"),
  destination: "Unknown",
  customer: ["ZTM", "NASA"],
  upcomming: true,
  // keplerName: "Kepler-442 b",
  success: true,
};

saveLunch(launch);

// launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}
function abortLaunch(launchId) {
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcomming = false;
  return aborted;
}

async function saveLunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, { flightNumber: latestFlightNumber, upcomming: true, success: true }));
}
module.exports = { launches, getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunch };
