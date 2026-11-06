import Container from '#/components/Container'
import Footer, { type ISocial } from '#/components/Footer'
import Apple from '#/components/icons/Apple'
import ClosedEye from '#/components/icons/ClosedEye'
import Eye from '#/components/icons/Eye'
import Facebook from '#/components/icons/Facebook'
import Google from '#/components/icons/Google'
import Nav from '#/components/Nav'
import { IconContainer } from '#/components/Products'
import TestimonialsWrapper from '#/components/Testimonials'
import { Button } from '#/components/ui/button'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '#/components/ui/input-group'
import { Spinner } from '#/components/ui/spinner'
import { Text } from '#/components/ui/text'
import { useFieldContext, useFormContext } from '#/hooks/useForm'
import useLoginForm from '#/hooks/useLoginForm'
import { cn } from '#/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { motion } from 'motion/react'
import type { HTMLInputTypeAttribute } from 'react'

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

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <AbstractContainer>
        <Title
          title="Login"
          description="Welcome back! Please log in to access your account."
        />
        <LoginForm />
      </AbstractContainer>
      <TestimonialsWrapper />
      <Footer />
    </>
  )
}

interface AbstractContainerProps {
  children: React.ReactNode,
  className?: string
}

const AbstractContainer: React.FC<AbstractContainerProps> = ({ className, children }) => {
  return (
    <Container className={cn('mt-30 md:mt-50 3xl:mt-53', className)}>
      <div className="mx-auto w-full md:max-w-1064 3xl:max-w-1326 p-30 md:px-200 md:py-80 3xl:px-150 3xl:py-100 rounded-2xl border border-grey-15 relative overflow-hidden">
        {/** abstract */}
        <div className="absolute top-0 left-0 bottom-0 right-0 -z-3 bg-grey-11"></div>
        <div className="absolute top-0 left-0 bottom-0 right-0 -z-2 bg-[url(/login-fill.png)] opacity-5 bg-cover"></div>
        <div className="absolute top-0 right-0 -z-1">
          <Image
            src="/login-abstract.svg"
            width={342}
            height={325}
            className="max-w-167 md:max-w-3xs 3xl:max-w-342"
          />
        </div>
        { children }
      </div>
    </Container>
  )
}

interface TitleProps {
  title: string,
  description: string,
  className?: string
}

const Title: React.FC<TitleProps> = ({ className, title, description }) => {
  return (
    <div className={cn('text-center', className)}>
      <Text className="font-medium" color="green-60" size="lg">
        {title}
      </Text>
      <Text
        className="mt-10 md:mt-16 3xl:mt-20 font-light leading-[100%]"
        color="grey-75"
      >
        {description}
      </Text>
    </div>
  )
}

interface LoginFormProps {
  className?: string
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { form, shownPassword, toggleViewPassword } = useLoginForm()
  return (
    <form
      id="login-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('mt-40 md:mt-60 3xl:mt-80', className)}
    >
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-24 3xl:gap-30">
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
      <div className="text-center mt-24 md:mt-30 3xl:mt-40">
        <Link to="/" className="underline underline-offset-2">
          <Text color="white">Forgot Password?</Text>
        </Link>
      </div>
      <div className='mt-24 md:mt-30 3xl:mt-40 lg:max-w-404 3xl:max-w-518 mx-auto flex flex-col gap-24'>
        <form.AppForm>
          <form.SubscribeButton label="Login" className="md:w-full" />
        </form.AppForm>
        <Link to='/' className='w-full text-center cursor-pointer rounded-[63px] text-white leading-[150%] text-[14px] 3xl:text-[18px] px-24 py-14 3xl:py-18 bg-grey-15 hover:bg-grey-20 active:bg-grey-20 border border-grey-20'>
          Sign Up
        </Link>
        <AdditionalAuth />
      </div>
    </form>
  )
}


const AdditionalAuth: React.FC<LoginFormProps> = ({ className }) => {
  return (
    <div className={cn('mt-24', className)}>
      <div className='flex gap-16 justify-between items-center'>
        <div className='h-1 w-full bg-grey-70'></div>
        <Text color='grey-70' className='shrink-0'>Or Continue with</Text>
        <div className='h-1 w-full bg-grey-70'></div>
      </div>
      <Socials socials={socials} className='mt-24 3xl:mt-30' />
    </div>
  )
}

interface SocialsProps extends LoginFormProps {
  socials: ISocial[]
}

const Socials: React.FC<SocialsProps> = ({ className, socials }) => {
  return (
    <div
      className={cn(
        'flex gap-20 3xl:gap-24 flex-wrap md:flex-nowrap items-center justify-center',
        className,
      )}
    >
      {socials.map((social, index) => (
        <a
          href={social.link}
          key={index}
          className="flex items-center justify-center rounded-full"
        >
          <IconContainer className='size-68 3xl:size-94 from-green-60/10' innerCircleClassName='from-green-60/30'>
            {social.icon}
          </IconContainer>
        </a>
      ))}
    </div>
  )
}

interface TextFieldProps {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

export function TextField({ label, placeholder, type }: TextFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Field data-invalid={isInvalid} className="gap-12 3xl:gap-16">
      {label && (
        <FieldLabel
          htmlFor={field.name}
          className="font-medium text-[14px] md:text-[16px] 3xl:text-[18px] leading-[150%] text-white"
        >
          {label}
        </FieldLabel>
      )}
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete="off"
        type={type}
        className="h-auto text-[16px] text-white 3xl:text-[18px] p-16 md:p-20 3xl:py-24 bg-grey-10 border border-grey-15 rounded-[88px] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-grey-40 placeholder:text-grey-35 placeholder:text-[16px] placeholder:font-light placeholder:3xl:text-[18px]"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}

interface InputGroupProps {
  label?: string
  placeholder?: string
  type: HTMLInputTypeAttribute
  button?: {
    viewState?: boolean
    onToggleState?: () => void
    viewIcon?: React.ReactNode
    hideIcon?: React.ReactNode
  }
}

export function InputGroupInlineEnd({ label, placeholder, button, type }: InputGroupProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Field data-invalid={isInvalid} className="gap-12 3xl:gap-16">
      {label && (
        <FieldLabel
          htmlFor={field.name}
          className="font-medium text-[14px] md:text-[16px] 3xl:text-[18px] leading-[150%] text-white"
        >
          {label}
        </FieldLabel>
      )}
      <InputGroup className="min-h-56 md:min-h-64 3xl:min-h-75 text-[16px] text-white 3xl:text-[18px] p-16 md:p-20 3xl:py-24 bg-grey-10 border border-grey-15 rounded-[88px] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-grey-40">
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          className="h-auto placeholder:text-grey-35 placeholder:text-[16px] placeholder:font-light placeholder:3xl:text-[18px]"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="View"
            title="View"
            className="size-30 hover:bg-grey-60"
            onClick={() =>
              button && button.onToggleState && button.onToggleState()
            }
          >
            {button?.viewState ? button?.viewIcon : button?.hideIcon}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}


export function SubscribeButton({ label, className }: { label: string, className?: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          asChild
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full md:w-fit cursor-pointer min-h-49 3xl:min-h-63 rounded-[63px]',
            'text-grey-15 leading-[150%] text-[14px] 3xl:text-[18px] px-24 py-14 3xl:py-18 bg-green-60 hover:bg-green-70 active:bg-green-70',
            className,
          )}
        >
          <motion.button
            whileHover={{ scale: 0.96 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {isSubmitting ? (
              <Spinner data-icon="icon-start" className="size-24" />
            ) : null}
            {label}
          </motion.button>
        </Button>
      )}
    </form.Subscribe>
  )
}
