import { cn } from '#/lib/utils'
import Container from './Container'
import { TitleBlock } from './Products'
import { Image } from '@unpic/react'
import { Text } from './ui/text'

interface PressWrapperProps {
  className?: string
}

interface IPress {
  imgSrc: string,
  title: string,
  location?: string
  date?: string,
  description: string 
}

const values: IPress[] = [
  {
    imgSrc: '/press/press1.png',
    title: 'YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction',
    location: 'India',
    date: '06/11/2024',
    description: 'YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to delivering exceptional value and building lasting relationships with our valued customers.',
  },
  {
    imgSrc: '/press/press2.png',
    title: 'YourBank Expands Branch Network with Opening of New Location in Chennai',
    location: 'India',
    date: '12/11/2024',
    description: 'YourBank is excited to announce the grand opening of our newest branch in [City]. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking, further strengthening our presence in the local community.',
  },
  {
    imgSrc: '/press/press3.png',
    title: 'YourBank Partners with Local Nonprofit to Support Financial Education Initiatives',
    location: 'India',
    date: '24/12/2024',
    description: 'YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.',
  },
  {
    imgSrc: '/press/press4.png',
    title: 'YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility',
    location: 'India',
    date: '28/12/2024',
    description: 'YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.',
  },
];

const PressWrapper: React.FC<PressWrapperProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={<span className="text-green-60">Press Releases</span>}
        description="Stay updated with the latest happenings and exciting developments at YourBank through our press releases."
      />
      <PressReleases variants={values} />
    </Container>
  )
}

interface PressReleasesProps extends PressWrapperProps {
  variants: IPress[]
}

const PressReleases: React.FC<PressReleasesProps> = ({
  className,
  variants,
}) => {
  return (
    <div
      className={cn(
        'mt-40 md:mt-60 3xl:mt-80 grid grid-cols-1 md:grid-cols-2 gap-20 3xl:gap-30',
        className,
      )}
    >
      {variants.map((press, index) => (
        <Press item={press} key={index} />
      ))}
    </div>
  )
}

interface PressProps extends PressWrapperProps {
  item: IPress
}

const Press: React.FC<PressProps> = ({
  className,
  item
}) => {
  return (
    <div
      className={cn(
        'p-20 md:p-24 3xl:p-30 rounded-t-[40px] rounded-b-2xl bg-grey-11 border border-grey-15',
        className,
      )}
    >
      <Image src={item.imgSrc} width={723} height={333} className="w-full" />
      <Text color="white" className="mt-18 md:mt-40 3xl:mt-51" size="sm">
        {item.title}
      </Text>
      <PressOptions location={item.location} date={item.date} />
      <Text color="grey-70" className="font-light mt-24 3xl:mt-30">
        {item.description}
      </Text>
    </div>
  )
}

interface PressOptionsProps extends PressWrapperProps {
  location?: string
  date?: string
}

const PressOptions: React.FC<PressOptionsProps> = ({ className, location, date }) => {
  return (
    <div
      className={cn(
        'mt-10 md:mt-14 3xl:mt-20 flex flex-wrap xl:flex-nowrap gap-6 3xl:gap-10',
        className,
      )}
    >
      {location && <PressOption value={`Location: ${location}`} />}
      {date && <PressOption value={`Date: ${date}`} />}
    </div>
  )
}

interface PressOptionProps extends PressWrapperProps {
  value: string
}

const PressOption: React.FC<PressOptionProps> = ({ className, value }) => {
  return (
    <div
      className={cn(
        'px-12 py-6 md:px-14 3xl:px-16 3xl:py-8 rounded-[68px] bg-grey-10 border border-grey-15 w-fit',
        className,
      )}
    >
      <Text color="grey-70" className="font-light">
        {value}
      </Text>
    </div>
  )
}

export default PressWrapper
