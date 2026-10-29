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
      <CareerHero />
      <ValuesWrapper />
      <BenefitsWrapper />
      <JobsWrapper />
      <FaqWrapper />
      <CTA />
      <Footer />
    </>
  )
}
