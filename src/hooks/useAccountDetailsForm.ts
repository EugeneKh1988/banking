import { createFormHook, formOptions } from '@tanstack/react-form'
import z from 'zod'
import { fieldContext, formContext } from './useForm'
import { useEffect } from 'react'
import { authClient } from '#/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SubscribeButton, TextField } from '#/routes/(auth)/login'
import { changeAccountDetails } from '#/utils/account-details.functions'

export const accountDetailsSchema = z.object({
  name: z
    .string()
    .min(3, 'Min 3 symbols')
    .max(255, 'Max 255 symbols')
    .optional(),
  lastName: z
    .string()
    .min(3, 'Min 3 symbols')
    .max(255, 'Max 255 symbols')
    .optional(),
  email: z.email('Invalid email').optional(),
  current_password: z
    .string()
    .optional()
    .refine((v) => !v || (v && v.length >= 8), {
      message: 'Min 8 symbols',
    }),
  password: z
    .string()
    .optional()
    .refine((v) => !v || (v && v.length >= 8), {
      message: 'Min 8 symbols',
    }),
  password_confirm: z
    .string()
    .optional()
    .refine((v) => !v || (v && v.length >= 8), {
      message: 'Min 8 symbols',
    }),
})

type TAccountDetailsForm = z.infer<typeof accountDetailsSchema>

const defaultValues: TAccountDetailsForm = {
  name: '',
  lastName: '',
  email: '',
  current_password: '',
  password: '',
  password_confirm: '',
}

const formOpts = formOptions({ defaultValues })

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
})

export default function useAccountDetailsForm() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  // change user details
  const accountDetails = useMutation({
    mutationFn: changeAccountDetails,
  })

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      //console.log(value)
      try {
        // change user name
        await changeUser({
          oldName: user?.name,
          newName: value.name,
          oldLastName: user?.lastName,
          newLastName: value.lastName,
        })

        // POST request to server
        await accountDetails.mutateAsync({ data: { ...value } })
        toast.success('Data was changed!')
        // update session
        await authClient.getSession({
          query: {
            disableCookieCache: true,
          },
        })
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
          toast.error(String(error.message))
        } else {
          toast.error('Unknown error')
        }
      }
    },
    validators: {
      onSubmit: accountDetailsSchema,
    },
  })

  // update form fields
  useEffect(() => {
    if (!user) return

    if (
      form.getFieldValue('name') != user.name ||
      form.getFieldValue('lastName') != user.lastName ||
      form.getFieldValue('email') != user.email
    ) {
      form.reset({
        name: user.name ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
        current_password: '',
        password: '',
        password_confirm: '',
      })
    }
  }, [user])

  return { form }
}

const changeUser = async ({
  newName,
  oldName,
  oldLastName,
  newLastName
}: {
  newName?: string
  oldName?: string
  oldLastName?: string
  newLastName?: string 
}) => {
  if ((newName && oldName != newName) || (newLastName && oldLastName != newLastName)) {
    return await authClient.updateUser({
      name: newName,
      lastName: newLastName,
    })
  }
  return null
}