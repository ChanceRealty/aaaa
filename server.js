const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public')) // Serve static files

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // limit each IP to 5 requests per windowMs
})

// Create transporter
const transporter = nodemailer.createTransport({
	service: 'gmail', // or 'outlook', 'yahoo', etc.
	auth: {
		user: 'your-email@gmail.com', // Your email
		pass: 'your-app-password', // Your app password (not regular password)
	},
})

// Email endpoint
app.post('/send-email', limiter, async (req, res) => {
	try {
		const { name, email, phone, message } = req.body

		// Basic validation
		if (!name || !email || !message) {
			return res.status(400).json({
				success: false,
				message: 'Name, email, and message are required',
			})
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email format',
			})
		}

		// Email options
		const mailOptions = {
			from: `"${name}" <${email}>`,
			to: 'myasnik.ghukasyan.ait@gmail.com',
			subject: `New Contact Form Message from ${name}`,
			html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from contact form</small></p>
      `,
			replyTo: email,
		}

		// Send email
		await transporter.sendMail(mailOptions)

		res.json({
			success: true,
			message: 'Email sent successfully',
		})
	} catch (error) {
		console.error('Error sending email:', error)
		res.status(500).json({
			success: false,
			message: 'Failed to send email',
		})
	}
})

// Health check
app.get('/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
