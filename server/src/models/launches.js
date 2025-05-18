const launches = new Map();

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

module.exports = { launches };
