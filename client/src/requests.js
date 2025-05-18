const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const data = await response.json();
  return data.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

module.exports = {
  httpGetPlanets,
  httpGetLaunches,
};
