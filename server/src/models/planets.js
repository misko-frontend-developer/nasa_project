const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const Planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) =>
    fs
      .createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await Planets.create({
            keplerName: data.kepler_name,
          });
        }
      })
      .on("error", (err) => {
        reject(err);
        console.log(err);
      })
      .on("end", () => {
        resolve();
      })
  );
}

async function getPlanets() {
  return await Planets.find({});
}

module.exports = { getPlanets, loadPlanetsData };
