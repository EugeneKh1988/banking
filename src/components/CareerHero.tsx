import { cn } from '#/lib/utils'
import { Image } from '@unpic/react'
import Container from './Container'
import { Text } from './ui/text'

interface CareerHeroProps {
  className?: string
}

const CareerHero: React.FC<CareerHeroProps> = ({ className }) => {
  return (
    <Container className={cn('mt-30 md:mt-50 3xl:mt-53 ', className)}>
      <div className="p-14 md:p-40 3xl:p-50 rounded-[20px] overflow-hidden relative">
        {/** abstract */}
        <div className="top-0 left-0 right-0 bottom-0 bg-grey-11 absolute -z-3"></div>
        <Image src='/career-abstract.svg' width={505} height={480} className='absolute right-0 top-0 max-w-199 md:max-w-334 3xl:max-w-505' />
        <div className='relative flex flex-col lg:flex-row lg:justify-between lg:items-start md:gap-20 lg:gap-0'>
          <WelcomeBlock
            title={
              <>
                Welcome to <span className="text-green-60">YourBank</span>{' '}
                Careers!
              </>
            }
            description="Join our team and embark on a rewarding journey in the banking industry. At YourBank, we are committed to fostering a culture of excellence and providing opportunities for professional growth. With a focus on innovation, customer service, and integrity, we strive to make a positive impact in the lives of our customers and communities. Join us today and be a part of our mission to shape the future of banking."
            className="w-full lg:max-w-658 3xl:max-w-791 lg:absolute left-0 top-0"
          />
          <div className='hidden lg:block'></div>
          <Image
            src="/career-hero.png"
            width={968}
            height={716}
            className="order-first md:order-last w-full rounded-2xl lg:max-w-715 3xl:max-w-968"
          />
        </div>
      </div>
    </Container>
  )
}

interface WelcomeBlockProps extends CareerHeroProps {
  title: React.ReactNode,
  description: string
}

const WelcomeBlock: React.FC<WelcomeBlockProps> = ({ className, title, description }) => {
  return (
    <div
      className={cn(
        '-mt-41 md:mt-0 p-24 md:p-60 3xl:p-80 bg-grey-10',
        'rounded-[20px] lg:rounded-tr-none md:rounded-br-[60px] 3xl:rounded-br-[80px]',
        className,
      )}
    >
      <Text size="xl1" className="font-medium text-center md:text-left" leading="leading-130">
        {title}
      </Text>
      <Text
        className="font-light mt-14 md:mt-20 3xl:mt-23 text-center md:text-left"
        color="grey-70"
      >
        {description}
      </Text>
    </div>
  )
}

export default CareerHero
