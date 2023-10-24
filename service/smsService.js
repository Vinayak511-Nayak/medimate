const axios = require("axios");
const accountSid = "AC8ea504bf7a85322caa7be33b3037f010";
const authToken = "1d16ed0a15c3fa1253f8caef2aa308f3";
const client = require("twilio")(accountSid, authToken);

const send_sms = async (number, medication_name) => {
  client.messages
    .create({
      body: `This is the remainder for medicine  + ${medication_name}`,
      from: "+15204411953",
      to: "+91" + number,
    })
    .then((message) => console.log(message.sid));
};
module.exports = send_sms;
