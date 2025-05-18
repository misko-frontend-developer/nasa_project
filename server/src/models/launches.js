const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Super mission",
  rocket: "Rocket 1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler 1 ",
  customer: ["ZTM", "NASA"],
  upcomming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}
function abortLaunch(launchId) {
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcomming = false;
  return aborted;
}
function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, { flightNumber: latestFlightNumber, upcomming: true, success: true }));
}
module.exports = { launches, getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunch };
