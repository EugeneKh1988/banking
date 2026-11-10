import { createFileRoute } from '@tanstack/react-router'
import { Text } from '#/components/ui/text';
import { FieldGroup } from '#/components/ui/field';
import useAccountDetailsForm from '#/hooks/useAccountDetailsForm';

export const Route = createFileRoute('/dashboard/_auth/account')({
  component: RouteComponent,
})

function RouteComponent() {
  const { form } = useAccountDetailsForm()
  return (
    <form
      id="account-details-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="w-full"
    >
      <Text size="lg" className="mb-20" color='green-60'>
        Personal Information
      </Text>
      <FieldGroup className="grid grid-cols-1 xl:grid-cols-2 gap-15">
        <form.AppField
          name="name"
          children={(field) => (
            <field.TextField label="Name" placeholder="Change your name" />
          )}
        />
        <form.AppField
          name="lastName"
          children={(field) => (
            <field.TextField label="Last name" placeholder="Change your last name" />
          )}
        />
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField label="Email" placeholder="Change your email" />
          )}
        />
      </FieldGroup>
      <Text size="lg" className="my-20" color='green-60'>
        Password change
      </Text>
      <FieldGroup className="grid grid-cols-1 xl:grid-cols-2 gap-15">
        <form.AppField
          name="current_password"
          validators={{
            onChangeListenTo: ['password', 'password_confirm'],
            onChange: ({ value, fieldApi }) => {
              if (
                !value &&
                (fieldApi.form.getFieldValue('password') ||
                fieldApi.form.getFieldValue('password_confirm'))
              ) {
                return { message: 'Must not be empty' }
              }
              return undefined
            },
          }}
          children={(field) => (
            <field.TextField
              type='password'
              label="Current password"
              placeholder="Enter your current password"
            />
          )}
        />
        <form.AppField
          name="password"
          validators={{
            onChangeListenTo: ['current_password', 'password_confirm'],
            onChange: ({ value, fieldApi }) => {
              if (
                !value &&
                (fieldApi.form.getFieldValue('current_password') ||
                fieldApi.form.getFieldValue('password_confirm'))
              ) {
                return { message: 'Must not be empty' }
              }
              return undefined
            },
          }}
          children={(field) => (
            <field.TextField
              type='password'
              label="New password"
              placeholder="Enter your new password"
            />
          )}
        />
        <form.AppField
          name="password_confirm"
          validators={{
            onChangeListenTo: ['password'],
            onChange: ({ value, fieldApi }) => {
              if (value !== fieldApi.form.getFieldValue('password')) {
                return { message: 'Passwords not match' }
              }
              return undefined
            },
          }}
          children={(field) => (
            <field.TextField
              type='password'
              label="Confirm new password"
              placeholder="Confirm your new password"
            />
          )}
        />
      </FieldGroup>
      <form.AppForm>
        <form.SubscribeButton label="Save" className="md:w-fit md:px-40 mt-20" />
      </form.AppForm>
    </form>
  )
}
