const http = require("http");

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8000;

MONGO_URL =
  "mongodb+srv://nasa-api:123456789!@cluster0.wfr1lzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const server = http.createServer(app);

const { loadPlanetsData } = require("./models/planets");

mongoose.connection.once("open", () => {
  console.log("Mongo DB connection ready");
});
mongoose.connection.on("error", (error) => {
  console.error(error);
});
async function startServer() {
  await mongoose.connect(MONGO_URL);
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
