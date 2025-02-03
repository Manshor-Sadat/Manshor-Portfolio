const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a transporter using your email provider
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail, Outlook, Yahoo
      auth: {
        user: 'manshor.sadat@gmail.com',
        pass: 'Manshor@308985', // Use an App Password, NOT your email password
      },
    });

    // Configure the email
    const mailOptions = {
      from: email,
      to: 'manshor.sadat@gmail.com', // Your email
      subject: `New Message from ${name}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
