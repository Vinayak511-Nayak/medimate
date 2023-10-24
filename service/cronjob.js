const model = require("../model");
const user = model.User;
const reminder = model.Medication;
const caretaker = model.Caretakers;
const email_service = require("./emailService");
const sms_service = require("./smsService");
const cronjob = async () => {
  try {
    console.log("run");
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
    currentDateTime.setSeconds(0);
    const query = {
      schedule: { $in: [formattedTime] },
      weeks: { $in: [currentDay] },

      $and: [
        { from: { $lte: formattedDate } },
        { to: { $gte: formattedDate } },
      ],
    };

    const medication_result = await reminder.find(query);
    if (medication_result) {
      medication_result.forEach(async (item) => {
        const medication_name = item.name;
        const care_taker = await caretaker.find({ _id: item.caretaker });
        email_service(care_taker[0].email, care_taker[0].name, medication_name);
        sms_service(care_taker[0].mobile, medication_name);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = cronjob;
