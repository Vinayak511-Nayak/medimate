const { MongooseError } = require("mongoose");
const mongoose = require("./config");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  mobile: String,
});
const medicationSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  weeks: [String],
  months: [String],
  schedule: [String],
  from: String,
  to: String,
  caretaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "caretaker",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const caretakerSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = {
  User: mongoose.model("User", userSchema, "users"),
  Medication: mongoose.model("Reminder", medicationSchema, "reminders"),
  Caretakers: mongoose.model("Caretaker", caretakerSchema, "caretakers"),
};
