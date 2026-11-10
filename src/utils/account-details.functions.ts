import { createServerFn } from '@tanstack/react-start'
import { auth } from '#/lib/auth'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { accountDetailsSchema } from '#/hooks/useAccountDetailsForm'

export const changeAccountDetails = createServerFn({ method: 'POST' })
  .validator(accountDetailsSchema)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders()
    const { email, current_password, password, password_confirm } = data

    // get user id
    const session = await auth.api.getSession({
      headers,
    })

    if (!session) {
      throw new Error('Unauthorized')
    }
    const operations = [
      {
        action: () =>
          changePassword({
            current_password,
            password,
            password_confirm,
            headers,
          }),
        message: 'Failed to change password',
      },
      {
        action: () =>
          changeEmail({
            newEmail: email,
            oldEmail: session.user.email,
            headers,
          }),
        message: 'Failed to change email',
      },
    ]

    for (const operation of operations) {
      try {
        await operation.action()
      } catch (error) {
        const message =
          typeof error === 'object' && error !== null && 'message' in error
            ? (error.message as string)
            : operation.message
        throw new Error(message)
      }
    }
    return { status: 'OK' }
  })

const changePassword = async ({
  current_password,
  password,
  password_confirm,
  headers,
}: {
  current_password?: string
  password?: string
  password_confirm?: string
  headers: Headers
}) => {
  if (
    current_password &&
    password &&
    password_confirm &&
    password == password_confirm
  ) {
    return await auth.api.changePassword({
      body: {
        newPassword: password,
        currentPassword: current_password,
        revokeOtherSessions: true,
      },
      headers,
    })
  }
  return null
}

const changeEmail = async ({
  newEmail,
  oldEmail,
  headers,
}: {
  newEmail?: string
  oldEmail?: string
  headers: Headers
}) => {
  if (newEmail && oldEmail != newEmail) {
    return await auth.api.changeEmail({
      body: {
        newEmail,
      },
      headers: headers,
    })
  }
  return null
}