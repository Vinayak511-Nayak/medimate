const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
const cron = require("node-cron");
const cronjob = require("./service/cronjob");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", router);
cron.schedule("* * * * *", cronjob);
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
