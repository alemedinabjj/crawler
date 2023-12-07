import path from 'path'
import { fileURLToPath } from 'url'
import { getTransporter } from '../libs/nodemailer'
import Handlebars from 'handlebars'
import * as fs from 'fs'

async function sendEmail({ subject, template, body }: any) {
  const transporter = await getTransporter()

  const templatePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    `../templates/${template}.hbs`,
  )

  const templateSource = fs.readFileSync(templatePath, 'utf-8')

  const templateCompiled = Handlebars.compile(templateSource)

  const compiled = templateCompiled(body)

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject,
    html: compiled,
  }

  await transporter.sendMail(mailOptions)
}

export const emailService = {
  sendEmail,
}
