import { Body, Button, Container, Head, Html, Preview, Section, Tailwind, Text, Heading } from 'react-email'
import tailwindConfig from './tailwind.config'
import { EmailHeader, EmailSocials } from './VerifyEmail'

interface PasswordResetProps {
  name: string
  url: string
}


const PasswordReset = ({ name, url }: PasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-orange-97">
          <Preview>Click the link to reset your password</Preview>
          <Container className="bg-white rounded-[6px] p-5 mt-3">
            {/** header */}
            <EmailHeader />
            {/** main content */}
            <Section className="bg-orange-97 rounded-[6px] px-4 py-5 mt-3 text-center">
              <Heading as="h1" className="font-28 text-orange-65 m-0 font-sans">
                Reset your password
              </Heading>
              <Text className="text-[16px] text-grey-30 mx-auto mt-2 mb-8 max-w-[380px] text-center font-sans font-medium">
                Hello {name}!
                <br />
                Someone has requested a link to change your
                <br />
                password, and you can do this through the link below.
              </Text>
              <Button
                className="bg-orange-65 text-grey-15 rounded-lg px-7 py-4 text-center font-sans leading-[150%] font-medium"
                href={url}
              >
                Change password
              </Button>
              <Text className="text-[12px] text-grey-15 mx-auto mt-6 mb-0 max-w-[400px] text-center font-sans leading-[150%]">
                If you didn&apos;t request this, please ignore this email.
                <br />
                Your password won't change until you access the link above and create a new one.
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

PasswordReset.PreviewProps = {
  name: 'Eugene',
  url: 'http:/localhost:3000',
} as PasswordResetProps

export default PasswordReset;