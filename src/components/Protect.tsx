import { cn } from '#/lib/utils'
import { type IBenefit } from './Benefits'
import Container from './Container'
import Blocks from './icons/Blocks'
import Layers from './icons/Layers'
import Sign from './icons/Sign'
import Stars from './icons/Stars'
import { IconContainer, TitleBlock } from './Products'
import { Text } from './ui/text'

interface ProtectWrapperProps {
  className?: string
}

const values: IBenefit[] = [
  {
    icon: <Blocks className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Competitive Compensation',
    description:
      'We provide a competitive salary package that recognizes the skills and expertise of our employees. YourBank believes in rewarding exceptional performance and offering opportunities for financial growth.',
  },
  {
    icon: <Layers className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Health and Wellness',
    description:
      'We prioritize the health and well-being of our employees by providing comprehensive medical, dental, and vision insurance plans. We also offer wellness programs, gym memberships, and resources to support a healthy lifestyle.',
  },
  {
    icon: <Stars className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Retirement Planning',
    description:
      'YourBank is committed to helping employees plan for their future. We offer a retirement savings plan with a generous employer match to help them build a secure financial foundation for the long term.',
  },
  {
    icon: <Sign className='text-green-60 size-24 md:size-28 3xl:size-34' />,
    title: 'Work-Life Balance',
    description:
      'We understand the importance of maintaining a healthy work-life balance. YourBank offers flexible work arrangements, paid time off, parental leave, and other programs that support employees in managing their personal and professional commitments.',
  },
]

const ProtectWrapper: React.FC<ProtectWrapperProps> = ({className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={
          <>
            How We <span className="text-green-60">Protect You</span>
          </>
        }
        description="At YourBank, we prioritize the security and confidentiality of your financial information. Our state-of-the-art encryption technology and stringent data protection measures ensure your assets and transactions are safeguarded at all times"
      />
      <Protects items={values} />
    </Container>
  )
}

interface ProtectsProps extends ProtectWrapperProps {
  items: IBenefit[]
}

const Protects: React.FC<ProtectsProps> = ({ className, items }) => {
  return (
    <div
      className={cn(
        'mt-40 md:mt-60 3xl:mt-117',
        'grid grid-cols-1 md:grid-cols-2 items-stretch gap-20 3xl:gap-30',
        'relative md:px-30 md:pt-30 lg:px-80 lg:pt-80 3xl:pt-100 3xl:px-100',
        className,
      )}
    >
      <div className="absolute top-0 left-0 right-0 bottom-100 3xl:bottom-200 md:bg-linear-120 from-41% from-grey-11 to-grey-11/0 -z-2 rounded-t-[50px] rounded-b-[20px]"></div>
      <div className='absolute top-0 left-0 right-0 bottom-100 3xl:bottom-200 md:bg-linear-120 from-0% from-green-60/2 to-41% to-green-60/0 -z-1 rounded-t-[50px] rounded-b-[20px]'></div>
      {items.map((item, index) => (
        <Protect key={index} item={item} />
      ))}
    </div>
  )
}

interface ProtectProps extends ProtectWrapperProps {
  item: IBenefit
}

const Protect: React.FC<ProtectProps> = ({ className, item }) => {
  return (
    <div
      className={cn(
        'p-24 md:p-40 3xl:p-50 border border-grey-15 rounded-[20px]',
        'relative overflow-hidden',
        className,
      )}
    >
      {/** abstract */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-120 from-41% from-grey-11 to-grey-11/0 -z-2"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-120 from-0% from-green-60/2 to-41% to-green-60/0 -z-1"></div>
      <div className="flex gap-14 3xl:gap-20 items-center">
        <IconContainer className="size-68 md:size-76 3xl:size-98">
          {item.icon}
        </IconContainer>
        <Text color="white" className="" size="sm">
          {item.title}
        </Text>
      </div>
      <Text color="grey-70" className="font-light mt-18 md:mt-20 3xl:mt-24">
        {item.description}
      </Text>
    </div>
  )
}

export default ProtectWrapper
