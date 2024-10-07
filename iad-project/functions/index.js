const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {sendEmail} = require("./sendEmail");

// HTTP Trigger to send email
exports.sendEmail = onRequest((request, response) => {
  logger.info("Sending email...", {structuredData: true});

  // Call the sendEmail function and handle the response
  sendEmail(request, response)
      .then((result) => {
        response.status(200).send(result);
      })
      .catch((error) => {
        logger.error("Error sending email", error);
        response.status(500).send("Email sending failed");
      });
});
