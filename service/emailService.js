const axios = require("axios");
const apiKey =
  "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";

function email_notification(email, name, medication_name) {
  const emailData = {
    sender: {
      name: "medication",
      email: "vinayakn511@gmail.com",
    },
    to: [
      {
        email: email,
        name: name,
      },
    ],
    subject: "Hello this is medication reminder",
    htmlContent: `<html><head></head><body><p>Hello,</p>This is reminder for medication name ${medication_name}.</p></body></html>`,
  };

  const brevoApiEndpoint = "https://api.brevo.com/v3/smtp/email";
  const headers = {
    accept: "application/json",
    "api-key": apiKey,
    "content-type": "application/json",
  };

  axios
    .post(brevoApiEndpoint, emailData, { headers })
    .then((response) => {
      console.log("Email sent successfully");
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Email sending failed");
      console.error("Error:", error);
    });
}
module.exports = email_notification;
