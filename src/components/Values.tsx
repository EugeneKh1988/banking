import { cn } from '#/lib/utils'
import Container from './Container'
import { TitleBlock } from './Products'
import { Text } from './ui/text'

interface ValuesWrapperProps {
  className?: string
}

interface IValue {
  title: string,
  description: string,
}

const values: IValue[] = [
  {
    title: 'Integrity',
    description:
      'We conduct ourselves with utmost honesty, transparency, and ethical behavior. We believe in doing what is right for our customers, colleagues, and stakeholders, even when faced with difficult choices.',
  },
  {
    title: 'Customer Centricity',
    description:
      'Our customers are at the heart of everything we do. We are dedicated to understanding their needs, providing personalized solutions, and delivering exceptional service that exceeds expectations.',
  },
  {
    title: 'Collaboration',
    description:
      'We foster a collaborative and inclusive work environment, where teamwork and diversity are celebrated. By leveraging the unique strengths and perspectives of our employees, we drive innovation and achieve greater success together.',
  },
  {
    title: 'Innovation',
    description:
      'We embrace change and constantly seek innovative solutions to meet the evolving needs of our customers. We encourage our employees to think creatively, challenge conventions, and explore new ideas to drive the future of banking.',
  },
]

const ValuesWrapper: React.FC<ValuesWrapperProps> = ({className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={
          <>
            Our <span className="text-green-60">Values</span>
          </>
        }
        description="At YourBank, our values form the foundation of our organization and guide our actions. We believe in upholding the highest standards of integrity, delivering exceptional service, and embracing innovation. These values define our culture and shape the way we work together to achieve our goals."
      />
      <Values items={values} />
    </Container>
  )
}

interface ValuesProps extends ValuesWrapperProps {
  items: IValue[]
}

const Values: React.FC<ValuesProps> = ({ className, items }) => {
  return (
    <div
      className={cn(
        'mt-50 md:mt-60 3xl:mt-80',
        'grid grid-cols-1 md:grid-cols-2 gap-50 md:gap-60 3xl:gap-80',
        className,
      )}
    >
      {items.map((item, index) => (
        <Value key={index} item={item} />
      ))}
    </div>
  )
}

interface ValueProps extends ValuesWrapperProps {
  item: IValue
}

const Value: React.FC<ValueProps> = ({ className, item }) => {
  return (
    <div
      className={cn(
        'pl-20 md:pl-24 3xl:pl-30 border-l border-l-green-60',
        className,
      )}
    >
      <Text color="grey-30" className="font-medium" size="xl">
        {item.title}
      </Text>
      <Text color="grey-70" className="font-light mt-14 md:mt-20 3xl:mt-30">
        {item.description}
      </Text>
    </div>
  )
}

export default ValuesWrapper
