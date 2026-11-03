import CareerHero from '#/components/CareerHero'
import Footer from '#/components/Footer'
import MissionWrapper from '#/components/Mission'
import Nav from '#/components/Nav'
import PressWrapper from '#/components/Press'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Nav />
      <CareerHero
        title={
          <>
            Where Banking Meets <span className="text-green-60">Excellence!</span>
          </>
        }
        description="At YourBank, we believe that banking should be more than just transactions. It should be an experience that empowers individuals and businesses to thrive and reach their financial goals. As a trusted financial institution, we are committed to delivering exceptional banking services that go beyond expectations. With a focus on innovation, personalized solutions, and unwavering integrity, we strive to provide the best banking experience for our valued customers. Join us on this exciting journey and discover a new level of banking excellence."
        img="/about-hero.png"
        subtitle='Welcome to YourBank'
      />
      <MissionWrapper />
      <PressWrapper />
      <Footer />
    </>
  )
}
