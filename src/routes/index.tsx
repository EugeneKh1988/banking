import FaqWrapper from '#/components/Faq'
import FeatureWrapper from '#/components/Features'
import Hero from '#/components/Hero'
import Nav from '#/components/Nav'
import Products from '#/components/Products'
import TestimonialsWrapper from '#/components/Testimonials'
import UseCasesWrapper from '#/components/UseCases'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Nav withBackground />
      <Hero />
      <Products />
      <UseCasesWrapper />
      <FeatureWrapper />
      <FaqWrapper />
      <TestimonialsWrapper />
    </>
  )
}
