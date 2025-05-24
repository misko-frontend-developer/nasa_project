const mongoose = require("mongoose");

MONGO_URL =
  "mongodb+srv://nasa-api:123456789!@cluster0.wfr1lzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connection.once("open", () => {
  console.log("Mongo DB connection ready");
});
mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function monogoDisconnect() {
  await mongoose.disconnect(MONGO_URL);
}
module.exports = {
  mongoConnect,
  monogoDisconnect,
};
