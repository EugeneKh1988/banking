import CareerHero from '#/components/CareerHero'
import CTA from '#/components/CTA'
import FaqWrapper from '#/components/Faq'
import Footer from '#/components/Footer'
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
      <FaqWrapper />
      <CTA />
      <Footer />
    </>
  )
}
