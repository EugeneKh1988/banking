import Nav from '#/components/Nav'
import useResetPasswordForm from '#/hooks/useResetPasswordForm'
import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { AbstractContainer, Title } from './login'
import TestimonialsWrapper from '#/components/Testimonials'
import Footer from '#/components/Footer'
import Eye from '#/components/icons/Eye'
import ClosedEye from '#/components/icons/ClosedEye'

type ResetPasswordSearch = {
  token: string
}

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => {
    return {
      token: (search.token as string) || '',
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <AbstractContainer>
        <Title
          title="Reset password"
          description="You can reset your password"
        />
        <ResetPasswordForm />
      </AbstractContainer>
      <TestimonialsWrapper />
      <Footer />
    </>
  )
}

interface ResetPasswordFormProps {
  className?: string
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ className }) => {
  const { form, shownPassword, toggleViewPassword } = useResetPasswordForm()
  return (
    <form
      id="reset-password-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('mt-40 md:mt-60 3xl:mt-80', className)}
    >
      <div>
        <form.AppField
          name="newPassword"
          children={(field) => (
            <field.InputGroupInlineEnd
              label="Password"
              placeholder="Enter your new password"
              type={shownPassword ? 'text' : 'password'}
              button={{
                viewState: shownPassword,
                onToggleState: toggleViewPassword,
                viewIcon: <Eye className="size-20 3xl:size-24" />,
                hideIcon: <ClosedEye className="size-20 3xl:size-24" />,
              }}
            />
          )}
        />
      </div>
      <div className="mt-24 md:mt-30 3xl:mt-40 lg:max-w-404 3xl:max-w-518 mx-auto flex flex-col gap-24">
        <form.AppForm>
          <form.SubscribeButton label="Change password" className="md:w-full" />
        </form.AppForm>
      </div>
    </form>
  )
}