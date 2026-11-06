import Nav from '#/components/Nav'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AbstractContainer, AdditionalAuth, Title } from './login'
import TestimonialsWrapper from '#/components/Testimonials'
import Footer, { type ISocial } from '#/components/Footer'
import useRegisterForm from '#/hooks/useRegisterForm'
import { cn } from '#/lib/utils'
import Eye from '#/components/icons/Eye'
import ClosedEye from '#/components/icons/ClosedEye'
import Google from '#/components/icons/Google'
import Facebook from '#/components/icons/Facebook'
import Apple from '#/components/icons/Apple'

const socials: ISocial[] = [
  {
    icon: <Google className='size-24 text-green-60 3xl:size-30' />,
    link: '/',
  },
  {
    icon: <Facebook className='size-24 text-green-60 3xl:size-30' />,
    link: '/',
  },
  {
    icon: <Apple className='size-24 text-green-60 3xl:size-30' />,
    link: '/',
  },
];

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <AbstractContainer>
        <Title
          title="Sign Up"
          description="Join our community today! Create an account to unlock exclusive features and personalized experiences."
        />
        <RegisterForm />
      </AbstractContainer>
      <TestimonialsWrapper />
      <Footer />
    </>
  )
}

interface RegisterFormProps {
  className?: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ className }) => {
  const { form, shownPassword, toggleViewPassword } = useRegisterForm()
  return (
    <form
      id="register-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('mt-40 md:mt-60 3xl:mt-80', className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-x-24 lg:gap-y-30 3xl:gap-30">
        <form.AppField
          name="name"
          children={(field) => (
            <field.TextField placeholder="Enter First Name" />
          )}
        />
        <form.AppField
          name="lastName"
          children={(field) => (
            <field.TextField placeholder="Enter Last Name" />
          )}
        />
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField placeholder="Enter your Email" />
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.InputGroupInlineEnd
              placeholder="Enter your Password"
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
      <div className='mt-24 md:mt-30 3xl:mt-40 lg:max-w-404 3xl:max-w-518 mx-auto flex flex-col gap-24'>
        <form.AppForm>
          <form.SubscribeButton label="Sign Up" className="md:w-full" />
        </form.AppForm>
        <Link to='/login' className='w-full text-center cursor-pointer rounded-[63px] text-white leading-[150%] text-[14px] 3xl:text-[18px] px-24 py-14 3xl:py-18 bg-grey-15 hover:bg-grey-20 active:bg-grey-20 border border-grey-20'>
          Login
        </Link>
        <AdditionalAuth socials={socials} />
      </div>
    </form>
  )
}
