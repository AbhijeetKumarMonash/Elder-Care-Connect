const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')
const cors = require('cors')({ origin: true })

// Set your SendGrid API Key
sgMail.setApiKey(functions.config().sendgrid.key)

// Function to send email
exports.sendEmail = functions.https.onRequest((req, res) => {
  // Handle preflight request (OPTIONS request)
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '3600')
    return res.status(204).send('') // Respond to the preflight request
  }

  // Use CORS middleware to enable cross-origin requests
  cors(req, res, async () => {
    try {
      const { to, subject, text, html, attachment } = req.body

      const msg = {
        to,
        from: 'abhijeet007abhi@gmail.com', // Your verified sender email from SendGrid
        subject,
        text,
        html
      }

      if (attachment) {
        msg.attachments = [
          {
            content: attachment.content,
            filename: attachment.filename,
            type: attachment.type,
            disposition: 'attachment'
          }
        ]
      }

      await sgMail.send(msg)

      // Set CORS header and send success response
      res.set('Access-Control-Allow-Origin', '*')
      res.status(200).send({ success: true, message: 'Email sent successfully!' })
    } catch (error) {
      // Set CORS header and send error response
      res.set('Access-Control-Allow-Origin', '*')
      res.status(500).send({
        success: false,
        message: 'Failed to send email',
        error: error.message
      })
    }
  })
})
