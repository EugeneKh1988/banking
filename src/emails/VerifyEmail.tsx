import { Body, Button, Column, Container, Head, Html, Preview, Row, Section, Tailwind, Text, Img, Heading, Link } from 'react-email'
import tailwindConfig from './tailwind.config'
import { baseEmailUrl, cn } from '#/lib/utils'

interface VerifyEmailProps {
  name: string
  url: string
}

const socials = [
  {
    href: 'https://www.facebook.com',
    icon: "/facebook.png",
  },
  {
    href: 'https://x.com/',
    icon: "/xcom.png",
  },
  {
    href: 'https://linkedin.com',
    icon: "/linkedin.png",
  },
]

const VerifyEmail = ({ name, url }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-orange-97">
          <Preview>Verify your email address</Preview>
          <Container className="bg-white rounded-[6px] p-5 mt-3">
            {/** header */}
            <EmailHeader />
            {/** main content */}
            <Section className="bg-orange-97 rounded-[6px] px-4 py-5 mt-3 text-center">
              <Heading as="h1" className="font-28 text-orange-65 m-0 font-sans">
                We&apos;re almost there!
              </Heading>
              <Text className="text-[16px] text-grey-30 mx-auto mt-2 mb-8 max-w-[380px] text-center font-sans font-medium">
                Hello {name}!
                <br />
                Thank you for signing up for our school site.
                <br />
                To verify your account, we just need to confirm your email
                address.
              </Text>
              <Button
                className="bg-orange-65 text-grey-15 rounded-lg px-7 py-4 text-center font-sans leading-[150%] font-medium"
                href={url}
              >
                Confirm
              </Button>
              <Text className="text-[12px] text-grey-15 mx-auto mt-6 mb-0 max-w-[400px] text-center font-sans leading-[150%]">
                If you didn&apos;t request this,
                <br />
                please ignore this email.
              </Text>
            </Section>
            {/** Footer */}
            <EmailSocials />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

interface EmailProps {
  className?: string
}

export const EmailSocials: React.FC<EmailProps> = ({ className }) => {
  return (
    <Section className={cn('bg-white py-6', className)}>
      <Row>
        <Column className="text-center">
          {socials.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className="inline-block px-2 align-middle"
            >
              <Img
                src={`${baseEmailUrl()}${social.icon}`}
                alt="social icon"
                width={24}
                className="block"
              />
            </Link>
          ))}
        </Column>
      </Row>
      <Text className="text-[12px] text-grey-15 mx-auto m-0 mt-2 text-center font-sans leading-[150%]">
        123 Market Street, Floor 1
        <br />
        Tech City, CA, 94102
      </Text>
    </Section>
  )
}

export const EmailHeader: React.FC<EmailProps> = ({ className }) => {
  return (
    <Section className={cn(className)}>
      <Row className="py-[8px]">
        <Column className="w-1/2">
          <Img src={`${baseEmailUrl()}/Logo.png`} width={130} />
        </Column>
      </Row>
    </Section>
  )
}

VerifyEmail.PreviewProps = {
  name: 'Eugene',
  url: 'http:/localhost:3000',
} as VerifyEmailProps

export default VerifyEmail;