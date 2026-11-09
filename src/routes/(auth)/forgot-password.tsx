import Nav from '#/components/Nav'
import { createFileRoute } from '@tanstack/react-router'
import { AbstractContainer, Title } from './login'
import TestimonialsWrapper from '#/components/Testimonials'
import Footer from '#/components/Footer'
import useForgotPasswordForm from '../../hooks/useForgotPasswordForm'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <AbstractContainer>
        <Title
          title="Forgot password"
          description="You will receive email notification"
        />
        <ForgotPasswordForm />
      </AbstractContainer>
      <TestimonialsWrapper />
      <Footer />
    </>
  )
}

interface ForgotPasswordFormProps {
  className?: string
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ className }) => {
  const { form } = useForgotPasswordForm()
  return (
    <form
      id="forgot-password-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('mt-40 md:mt-60 3xl:mt-80', className)}
    >
      <div>
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField placeholder="Enter your Email" />
          )}
        />
      </div>
      <div className='mt-24 md:mt-30 3xl:mt-40 lg:max-w-404 3xl:max-w-518 mx-auto flex flex-col gap-24'>
        <form.AppForm>
          <form.SubscribeButton label="Send email" className="md:w-full" />
        </form.AppForm>
      </div>
    </form>
  )
}
