const http = require("http");

const app = require("./app");

const { mongoConnect } = require("./services/mongo");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const { loadPlanetsData } = require("./models/planets");

const { loadLaunchesData } = require("./models/launches");

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT} `);
  });
}

startServer();
