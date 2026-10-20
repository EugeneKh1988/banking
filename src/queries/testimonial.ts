import { getTestimonial } from '#/utils/testimonial.functions'
import { queryOptions } from '@tanstack/react-query'


export function testimonialOptions({
  limit,
  client,
}: {
  limit: number
  client: string
}) {
  return queryOptions({
    queryKey: ['testimonial', client],
    queryFn: () => getTestimonial({ data: { limit, client } }),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  })
}