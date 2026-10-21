import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import Container from './Container'
import { Text } from './ui/text'
import { Image } from '@unpic/react'

interface CTAProps {
  className?: string
}

const CTA: React.FC<CTAProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <div className="p-30 lg:p-60 3xl:p-80 rounded-[20px] overflow-hidden relative flex flex-col md:flex-row md:justify-between gap-24 items-center">
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-3 bg-grey-11"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-2 bg-linear-60 from-41% from-grey-11 to-grey-11/0"></div>
        <Image src='/cta-abstract.svg' width={298} height={283} className='absolute top-0 left-0 max-w-151 md:max-w-202 3xl:max-w-298' />
        <div className="md:max-w-874 3xl:max-w-1103">
          <Text
            size="sm2"
            color="white"
            className="text-center md:text-left capitalize"
          >
            Start your financial journey with{' '}
            <span className="text-green-60">YourBank today!</span>
          </Text>
          <Text
            className="font-light mt-14 md:mt-10 3xl:mt-14 text-center md:text-left"
            color="grey-70"
          >
            Lorem ipsum dolor sit amet consectetur. Blandit odio semper risus
            pellentesque elit. Pellentesque eget ut imperdiet nulla penatibus.
            Nascetur viverra arcu sed amet cursus purus.
          </Text>
        </div>
        <Link
          to="/"
          className="shrink-0 px-24 py-14 md:px-20 3xl:px-30 3xl:py-18 bg-green-60 hover:bg-green-70 active:bg-green-70 rounded-[82px]"
        >
          <Text size="xs" color="grey-11">
            Open Account
          </Text>
        </Link>
      </div>
    </Container>
  )
}

export default CTA
