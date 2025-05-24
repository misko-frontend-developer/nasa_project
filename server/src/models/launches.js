const launches = new Map();
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const axios = require("axios");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  console.log("Downloading data....");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("rpoblem downloading launch data");
    throw Error("Launch data failed");
  }
  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];

    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    console.log(launch);

    await saveLaunch(launch);
  }
}
async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 101,
  });

  if (firstLaunch) {
    console.log("Data already loaded!");
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function getAllLaunches(skip, limit) {
  return await launchesDatabase
    .find({}, { _id: 0, __v: 0 })
    .skip(skip)
    .limit(limit);
}
async function abortLaunch(launchId) {
  const launch = await launchesDatabase.findOne({ flightNumber: launchId });
  if (!launch) {
    throw new Error("No matching launch found");
  }
  return await launchesDatabase.findOneAndDelete({ flightNumber: launchId });
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found");
  }

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
  loadLaunchesData,
};
