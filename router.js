const express = require("express");
const jwt = require("jsonwebtoken");
const model = require("./model");
const user = model.User;
const reminder = model.Medication;
const caretaker = model.Caretakers;
const router = express.Router();
const authorization = require("./auth");

router.get("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const find_user = await user.find({ username: username, password: password });
  console.log(find_user);
  if (!find_user) res.send("invalid credentials").status(400);
  const token = await authorization.generate_token(username);
  res.send({ token: token }).status(200);
});

router.get("/reminder", (req, res) => {
  const token = req.headers["authorization"];
});
router.get("/", async (req, res) => {
  const token = req.headers["authorization"];
  const user = await authorization.verify_token(token);
  res.json(user);
});
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const add_user = await user.create({
    username: username,
    password: password,
    email: email,
    mobile: mobile,
  });
  res.send("succesfull").status(200);
});

router.post("/addreminder", async (req, res) => {
  const token = req.headers["authorization"];
  const username = await authorization.verify_token(token);
  const { body } = req.body;
  const name = req.body.name;
  const weeks = req.body.weeks;
  const months = req.body.months;
  const schedule = req.body.schedule;
  const from = req.body.from;
  const to = req.body.to;

  const find_user = await user.find({ username: username });
  const user_id = find_user[0]._id;
  const care_taker_name = req.body.care_taker_name;
  const care_taker_find = await caretaker.find({ name: care_taker_name });
  console.log(care_taker_find);
  const care_taker_id = care_taker_find[0]._id;

  const add_remainder_payload = {
    name: name,
    schedule: schedule,
    user: user_id,
    weeks: weeks,
    months: months,
    from: from,
    to: to,
    caretaker: care_taker_id,
  };
  const add_remainder = await reminder.create(add_remainder_payload);
  const allUsers = await reminder.find({});
  console.log(allUsers);
  res.send(add_remainder_payload).status(200);
});

router.post("/caretaker", async (req, res) => {
  const care_taker_name = req.body.care_taker_name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const name = req.body.name;
  const token = req.headers["authorization"];
  const username = await authorization.verify_token(token);
  const find_user = await user.find({ username: username });
  const user_id = find_user[0]._id;

  const care_taker_payload = {
    name: name,
    mobile: mobile,
    email: email,
    user: user_id,
  };

  const care_taker_add = await caretaker.create(care_taker_payload);
  res.send(care_taker_add);
});
module.exports = router;
