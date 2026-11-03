import CareerHero from '#/components/CareerHero'
import FaqWrapper from '#/components/Faq'
import Footer from '#/components/Footer'
import Nav from '#/components/Nav'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/security')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <CareerHero
        title={
          <>
            Your Security is Our{' '}
            <span className="text-green-60">Top Priority</span>
          </>
        }
        description="At YourBank, we understand the importance of keeping your financial information secure. We employ robust security measures and advanced technologies to protect your personal and financial data. Rest assured that when you bank with us, your security is our utmost priority."
        img="/security-abstract.png"
      />
      <FaqWrapper />
      <Footer />
    </>
  )
}
