import { createTransport } from 'nodemailer'
import 'dotenv/config'

export const getTransporter = async () => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  return transporter
}
