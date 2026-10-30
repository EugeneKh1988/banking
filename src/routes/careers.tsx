import BenefitsWrapper from '#/components/Benefits'
import CareerHero from '#/components/CareerHero'
import CTA from '#/components/CTA'
import FaqWrapper from '#/components/Faq'
import Footer from '#/components/Footer'
import JobsWrapper from '#/components/Jobs'
import Nav from '#/components/Nav'
import ValuesWrapper from '#/components/Values'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/careers')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <CareerHero
        title={
          <>
            Welcome to <span className="text-green-60">YourBank</span> Careers!
          </>
        }
        description="Join our team and embark on a rewarding journey in the banking industry. At YourBank, we are committed to fostering a culture of excellence and providing opportunities for professional growth. With a focus on innovation, customer service, and integrity, we strive to make a positive impact in the lives of our customers and communities. Join us today and be a part of our mission to shape the future of banking."
        img="/career-hero.png"
      />
      <ValuesWrapper />
      <BenefitsWrapper />
      <JobsWrapper />
      <FaqWrapper />
      <CTA />
      <Footer />
    </>
  )
}
