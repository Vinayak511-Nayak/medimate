const model = require("./model");
const user = model.User;
const reminder = model.Medication;
const cron = require("node-cron");

cron.schedule("* * * * *", async () => {
  try {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear().toString().slice(-2);
    const month = ("0" + (currentDateTime.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDateTime.getDate()).slice(-2);
    const formattedDate = day + "-" + month + "-" + year;
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedTime = currentDateTime.toLocaleTimeString("en-IN", options);
    const dayOptions = { weekday: "long" };
    const currentDay = new Intl.DateTimeFormat("en-IN", dayOptions).format(
      currentDateTime
    );
    const query = {
      schedule: { $in: [formattedTime] },
      weeks: { $in: [currentDay] },
      $and: [
        { from: { $lte: formattedDate } },
        { to: { $gte: formattedDate } },
      ],
    };

    Medication.find(query, (err, result) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log("Matching medications:", result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
