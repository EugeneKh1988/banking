import Hero from '#/components/Hero'
import Nav from '#/components/Nav'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Nav withBackground />
      <Hero />
    </>
  )
}
