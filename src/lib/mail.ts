import nodemailer from 'nodemailer'

export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.EMAIL_PORT!),
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  })

  const options = {
    from: 'admin@example.com',
    to,
    subject,
    html,
  }
  transporter.sendMail(options)
}