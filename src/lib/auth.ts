import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '#/db/index'
import { admin } from 'better-auth/plugins'
import { render } from 'react-email'
import PasswordReset from '#/emails/PasswordReset'
import VerifyEmail from '#/emails/VerifyEmail'
import { sendMail } from './mail'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      //console.log(user, url)
      const html = await render(PasswordReset({ name: user.name, url }))
      sendMail({ to: user.email, subject: 'Reset Password Notification', html })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      //console.log(user, url)
      const html = await render(VerifyEmail({ name: user.name, url }))
      sendMail({ to: user.email, subject: 'Verify Email Address', html })
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  database: drizzleAdapter(db, { provider: 'pg' }),
  plugins: [
    admin(/**{ adminUserIds: ['yQAEWjgYaFM1G1obLnf6tShb34JmmlJd']} */),
    tanstackStartCookies(),
  ],
})
