const mongoose = require("mongoose");

database_url = "mongodb://127.0.0.1:27017/meditrack";
mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB!");
});
module.exports = mongoose;
