const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')
admin.initializeApp()

// Configure SMTP settings for Nodemailer (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhijeet007abhi@gmail.com', // Your Gmail account
    pass: 'wcoq jfil qvzh nfad' // Your Gmail password or app-specific password
  }
})

// Cloud Function to send email
exports.sendEmail = functions.https.onRequest((req, res) => {
  // Handle CORS preflight request (OPTIONS)
  cors(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      res.set('Access-Control-Max-Age', '3600')
      return res.status(204).send('')
    }
    try {
      const { to, subject, text, html, attachment } = req.body

      // Email options
      const mailOptions = {
        from: 'abhijeet007abhi@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html // HTML body
      }

      // Add attachment if available
      if (attachment) {
        mailOptions.attachments = [
          {
            filename: attachment.filename,
            content: attachment.content,
            encoding: 'base64' // Ensure the attachment is base64 encoded
          }
        ]
      }

      // Send email via Nodemailer
      await transporter.sendMail(mailOptions)

      res.set('Access-Control-Allow-Origin', '*')
      res.status(200).send({ success: true, message: 'Email sent successfully!' })
    } catch (error) {
      res.set('Access-Control-Allow-Origin', '*')
      res.status(500).send({
        success: false,
        message: 'Failed to send email',
        error: error.message
      })
    }
  })
})
