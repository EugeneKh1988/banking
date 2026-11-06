import { authClient } from '#/lib/auth-client'
import { createFormHook, formOptions } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import z from 'zod'
import { useState } from 'react'
import { fieldContext, formContext } from './useForm'
import { InputGroupInlineEnd, SubscribeButton, TextField } from '#/routes/(auth)/login'

const formSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Min 8 symbols').max(255, 'Max 255 symbols'),
})

export type TLoginForm = z.infer<typeof formSchema>

const defaultValues: TLoginForm = { email: '', password: '' }

const formOpts = formOptions({ defaultValues })

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    InputGroupInlineEnd,
  },
  formComponents: {
    SubscribeButton,
  },
})

export default function useLoginForm() {
  const [shownPassword, setViewPassword] = useState<boolean>(false);

  const toggleViewPassword = () => {
    setViewPassword((prev) => !prev)
  }
  // navigate
  const navigate = useNavigate({ from: '/login' })

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      //console.log(value);

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: '/',
        },
        {
          onSuccess: () => {
            // go to home page
            navigate({ to: '/' })
          },
          onError: (ctx) => {
            if (ctx.error.status == 403) {
              toast.error(ctx.error?.message ?? 'Login error', {
                position: 'bottom-right',
                action: {
                  label: 'Resend Email',
                  onClick: async () => {
                    await authClient.sendVerificationEmail({
                      email: value.email,
                      callbackURL: '/', // The redirect URL after verification
                    })
                  },
                },
              })
            } else {
              toast.error(ctx.error?.message ?? 'Login error', {
                position: 'bottom-right',
              })
            }
          },
        },
      )
    },
    validators: {
      onSubmit: formSchema,
    },
  })

  return { form, shownPassword, toggleViewPassword }
}
