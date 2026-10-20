import { testimonialOptions } from '#/queries/testimonial'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function useTestimonial(limit: number, client: string) {
  const query = useSuspenseQuery(testimonialOptions({ limit, client }))
  const { testimonials, users } = query.data

  const usersMap = useMemo(
    () => new Map(users.map((user) => [user.id, user])),
    [users],
  )

  const items = useMemo(
    () =>
      testimonials.map((testimonial) => ({
        testimonial,
        user: usersMap.get(testimonial.userId),
      })),
    [testimonials, usersMap],
  )
  
  return { items };
}