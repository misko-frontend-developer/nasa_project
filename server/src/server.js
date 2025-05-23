const http = require("http");

const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const { loadPlanetsData } = require("./models/planets");

mongoose.connection.once("open", () => {
  console.log("Mongo DB connection ready");
});
mongoose.connection.on("error", (error) => {
  console.error(error);
});
async function startServer() {
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT} `);
  });
}

startServer();
// async function activate() {
//   await loadPlanetsData();
// }

// activate();
