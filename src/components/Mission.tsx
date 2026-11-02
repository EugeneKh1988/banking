import { cn } from '#/lib/utils'
import Container from './Container'
import { TitleBlock } from './Products'
import { Image } from '@unpic/react'
import { Text } from './ui/text'

interface MissionWrapperProps {
  className?: string
}

interface IMission {
  title: string
  description: string
  imageSrc: string
}

const missions: IMission[] = [
  {
    title: 'Mission',
    description: 'At YourBank, our mission is to empower our customers to achieve financial success. We are dedicated to delivering innovative banking solutions that cater to their unique needs. Through personalized services, expert guidance, and cutting-edge technology, we aim to build strong, lasting relationships with our customers. Our mission is to be their trusted partner, helping them navigate their financial journey and realize their dreams.',
    imageSrc: '/mission_1.png',
  },
  {
    title: 'Vision',
    description: 'Our vision at YourBank is to redefine banking by creating a seamless and personalized experience for our customers. We envision a future where banking is accessible, transparent, and tailored to individual preferences. Through continuous innovation and collaboration, we strive to be at the forefront of the industry, setting new standards for customer-centric banking. Our vision is to be the preferred financial institution, known for our unwavering commitment to excellence, trust, and customer satisfaction.',
    imageSrc: '/mission_2.png',
  },
]; 

const MissionWrapper: React.FC<MissionWrapperProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={<span className="text-green-60">Mission & Vision</span>}
        description="We envision being a leading force in the industry, driven by innovation, integrity, and inclusivity, creating a brighter financial future for individuals and businesses while maintaining a strong commitment to customer satisfaction and community development"
      />
      <Missions variants={missions} />
    </Container>
  )
}

interface MissionsProps extends MissionWrapperProps {
  variants: IMission[]
}

const Missions: React.FC<MissionsProps> = ({ className, variants }) => {
  return (
    <div className={cn('mt-60 3xl:mt-80 flex flex-col gap-50 md:gap-0', className)}>
      {variants.map((mission, index) => (
        <Mission variant={mission} key={index} evenRow={index % 2 == 0} />
      ))}
    </div>
  )
}

interface MissionProps extends MissionWrapperProps {
  variant: IMission
  evenRow: boolean
}

const Mission: React.FC<MissionProps> = ({ className, variant, evenRow }) => {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center', 'xl:-mt-60 first:xl:mt-0' ,className)}>
      <MissionImage
        imageSrc={variant.imageSrc}
        className="w-full md:w-1/2 xl:w-auto lg:max-w-545 3xl:max-w-664"
      />
      <MissionDescription
        title={variant.title}
        description={variant.description}
        className={`md:w-1/2 xl:w-auto lg:max-w-735 3xl:max-w-932 ${evenRow ? 'md:pl-40 3xl:pl-50 md:border-l' : 'md:border-r md:pr-40 3xl:pr-50 md:order-first'}`}
      />
    </div>
  )
}

interface MissionImageProps extends MissionWrapperProps {
  imageSrc: string
}

const MissionImage: React.FC<MissionImageProps> = ({
  className,
  imageSrc
}) => {
  return (
    <div
      className={cn(
        'p-20 pb-0 md:p-60 md:pb-0 rounded-t-[50px] md:rounded-b-[20px] relative overflow-hidden border border-grey-15',
        className,
      )}
    >
      {/** abstract design */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-60 from-41% from-grey-11 to-grey-11/0 -z-3"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-120 from-0% from-green-60/2 to-41% to-green-60/0 -z-2"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-1 md:px-22 3xl:px-31">
        <Image
          src="/mission-abstract.svg"
          width={634}
          height={602}
          className="w-full rounded-t-[50px]"
        />
      </div>
      <Image src={imageSrc} width={544} height={561} className="w-full" />
    </div>
  )
}

interface MissionDescriptionProps extends MissionWrapperProps {
  title: string
  description: string
}

const MissionDescription: React.FC<MissionDescriptionProps> = ({
  className,
  title,
  description
}) => {
  return (
    <div
      className={cn(
        'pt-30 md:pt-0 border-t md:border-t-0 border-green-60',
        className,
      )}
    >
      <Text color="white" className="text-center md:text-left font-medium" size='sm3'>
        {title}
      </Text>
      <Text color="grey-70" className="mt-10 3xl:mt-14 font-light text-center md:text-left">
        {description}
      </Text>
    </div>
  )
}

export default MissionWrapper
