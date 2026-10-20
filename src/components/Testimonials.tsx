import { ProductProvider, useProduct } from '#/hooks/useProduct'
import { cn } from '#/lib/utils'
import { Suspense } from 'react'
import Container from './Container'
import { TitleBlock, TitleButtons } from './Products'
import { ErrorBoundary } from 'react-error-boundary'
import FallbackError from './FallbackError'
import Loading from './Loading'
import useTestimonial from '#/hooks/useTestimonial'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import type { ITestimonial, TUser } from '#/utils/interfaces'
import { Text } from './ui/text'
import Quotes from './icons/Quotes'

interface TestimonialsWrapperProps {
  className?: string
}

const TestimonialsWrapper: React.FC<TestimonialsWrapperProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <ProductProvider>
        <TitleBlock
          title={
            <>
              Our <span className="text-green-60">Testimonials</span>
            </>
          }
          description="Discover how YourBank has transformed lives with innovative digital solutions and personalized customer service. See why our clients trust us for a secure and prosperous financial journey"
          buttons={<TitleButtons className="md:self-end" />}
        />
        <Suspense fallback={<Loading />}>
          <ErrorBoundary FallbackComponent={FallbackError}>
            <Testimonials />
          </ErrorBoundary>
        </Suspense>
      </ProductProvider>
    </Container>
  )
}

const Testimonials: React.FC<TestimonialsWrapperProps> = ({ className }) => {
  const limit = 9
  const { activeType } = useProduct();
  const { items } = useTestimonial(limit, activeType);

  //console.log(items);

  return (
    <Carousel
      className={cn(
        'mt-40 md:mt-80 3xl:mt-100 md:px-92 3xl:px-112 relative',
        className,
      )}
    >
      <CarouselContent className="md:items-stretch md:-ml-60 3xl:-ml-80">
        {items.map(({ testimonial, user }) => (
          <CarouselItem
            key={testimonial.id}
            className="basis-full md:basis-1/2 lg:basis-1/3 md:pl-60 3xl:pl-80"
          >
            <Testimonial item={testimonial} user={user} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex gap-20 justify-center  h-52 3xl:h-62 w-full items-center md:justify-between mt-30 md:mt-0 md:absolute md:top-1/2 md:-left-12 md:-translate-y-1/2'>
        <CarouselPrevious className="relative top-0 left-0 translate-y-0 size-52 3xl:size-62 p-12 3xl:p-14 bg-grey-11 hover:bg-grey-15 active:bg-grey-15 border border-grey-15" />
        <CarouselNext className="relative top-0 right-0 translate-y-0 size-52 3xl:size-62 p-12 3xl:p-14 bg-grey-11 hover:bg-grey-15 active:bg-grey-15 border border-grey-15" />
      </div>
    </Carousel>
  )
}

interface TestimonialProps extends TestimonialsWrapperProps {
  item: ITestimonial
  user?: TUser
}

export const Testimonial: React.FC<TestimonialProps> = ({ className, item, user }) => {
  return (
    <div
      className={cn(
        'p-20 md:p-0 rounded-[12px] 3xl:rounded-[12px] border md:border-none border-grey-15',
        'flex flex-col justify-between items-stretch gap-30 md:gap-40 3xl:gap-50 h-full',
        className,
      )}
    >
      <div className="flex gap-16 items-center">
        <div className="h-1 w-full bg-grey-15"></div>
        <Quotes className="size-44 3xl:size-60 shrink-0" />
        <div className="h-1 w-full bg-grey-15"></div>
      </div>
      <Text color="white" className="text-center">
        {item.body}
      </Text>
      <Text color="green-60" className="font-medium text-[16px] text-center">
        {user?.name}
      </Text>
    </div>
  )
}

export default TestimonialsWrapper
