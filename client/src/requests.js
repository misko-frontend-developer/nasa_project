const API_URL = "http://localhost:8000/v1";

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

async function httpSubmitLaunch(launch) {
  try {
    await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(launch),
      },
    });
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return { ok: false };
  }
}
module.exports = {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
