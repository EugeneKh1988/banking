import { cn } from '#/lib/utils'
import Container from './Container'
import Briefcase from './icons/Briefcase'
import Cup from './icons/Cup'
import Hat from './icons/Hat'
import Lamp2 from './icons/Lamp2'
import { IconContainer, TitleBlock } from './Products'
import { Text } from './ui/text'

interface BenefitsWrapperProps {
  className?: string
}

interface IBenefit {
  icon: React.ReactNode,
  title: string,
  description: string,
}

const values: IBenefit[] = [
  {
    icon: <Cup className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Competitive Compensation',
    description:
      'We provide a competitive salary package that recognizes the skills and expertise of our employees. YourBank believes in rewarding exceptional performance and offering opportunities for financial growth.',
  },
  {
    icon: <Lamp2 className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Health and Wellness',
    description:
      'We prioritize the health and well-being of our employees by providing comprehensive medical, dental, and vision insurance plans. We also offer wellness programs, gym memberships, and resources to support a healthy lifestyle.',
  },
  {
    icon: <Briefcase className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Retirement Planning',
    description:
      'YourBank is committed to helping employees plan for their future. We offer a retirement savings plan with a generous employer match to help them build a secure financial foundation for the long term.',
  },
  {
    icon: <Hat className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Work-Life Balance',
    description:
      'We understand the importance of maintaining a healthy work-life balance. YourBank offers flexible work arrangements, paid time off, parental leave, and other programs that support employees in managing their personal and professional commitments.',
  },
]

const BenefitsWrapper: React.FC<BenefitsWrapperProps> = ({className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={
          <>
            Our <span className="text-green-60">Benefits</span>
          </>
        }
        description="At YourBank, we value our employees and are dedicated to their well-being and success. We offer a comprehensive range of benefits designed to support their personal and professional growth."
      />
      <Benefits items={values} />
    </Container>
  )
}

interface BenefitsProps extends BenefitsWrapperProps {
  items: IBenefit[]
}

const Benefits: React.FC<BenefitsProps> = ({ className, items }) => {
  return (
    <div
      className={cn(
        'mt-50 md:mt-60 3xl:mt-80',
        'grid grid-cols-1 md:grid-cols-2 items-stretch',
        className,
      )}
    >
      {items.map((item, index) => (
        <Benefit key={index} item={item} />
      ))}
    </div>
  )
}

interface BenefitProps extends BenefitsWrapperProps {
  item: IBenefit
}

const Benefit: React.FC<BenefitProps> = ({ className, item }) => {
  return (
    <div className="py-24 first:pt-0 last:pb-0 md:p-30 3xl:p-50 md:first:pt-0 3xl:first:pt-0 md:first:pl-0 3xl:first:pl-0 md:nth-[2]:pr-0 3xl:nth-[2]:pr-0 md:nth-[2]:pt-0 3xl:nth-[2]:pt-0 md:nth-[3]:pb-0 3xl:nth-[3]:pb-0 md:nth-[3]:pl-0 3xl:nth-[3]:pl-0 md:last:pr-0 3xl:last:pr-0 border-b last:border-b-0 md:nth-[3]:border-b-0 md:first:border-r md:nth-[3]:border-r border-dashed border-grey-15">
      <div
        className={cn(
          'p-24 md:p-40 3xl:p-50 border border-grey-15',
          'rounded-t-[40px] rounded-b-[14px] md:rounded-tl-[14px] md:rounded-tr-[40px] md:rounded-bl-[40px] md:rounded-br-[14px]',
          '3xl:rounded-tl-[20px] 3xl:rounded-tr-[50px] 3xl:rounded-bl-[50px] 3xl:rounded-br-[20px]',
          'relative overflow-hidden',
          className,
        )}
      >
        {/** abstract */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-linear-60 from-41% from-grey-11 to-grey-11/0 -z-2'></div>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-linear-30 from-0% from-green-60/2 to-41% to-green-60/0 -z-1'></div>
        <div className='flex gap-10 md:gap-14 3xl:gap-20 items-center'>
          <IconContainer>{item.icon}</IconContainer>
          <Text color="white" className="" size="sm">
            {item.title}
          </Text>
        </div>
        <Text color="grey-70" className="font-light mt-20 md:mt-24 3xl:mt-30">
          {item.description}
        </Text>
      </div>
    </div>
  )
}

export default BenefitsWrapper
