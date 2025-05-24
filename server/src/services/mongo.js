const mongoose = require("mongoose");

MONGO_URL = process.env.MONGO_URL;

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
