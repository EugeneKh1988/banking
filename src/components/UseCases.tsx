import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import Container from './Container'
import Book from './icons/Book'
import Building from './icons/Building'
import City from './icons/City'
import Cup from './icons/Cup'
import Dollar from './icons/Dollar'
import Hands from './icons/Hands'
import Lamp from './icons/Lamp'
import Photo from './icons/Photo'
import { IconContainer, TitleBlock } from './Products'
import { Text } from './ui/text'
import { Image } from '@unpic/react'

interface UseCasesWrapperProps {
  className?: string
}

interface IUseCasesOptions {
  percent: number
  value: string
}

interface IUseCasesFeatures {
  icon: React.ReactNode
  value: string
}

interface IUseCase {
  name: string
  description: string
  options: IUseCasesOptions[]
  features: IUseCasesFeatures[]
}

const use_cases: IUseCase[] = [
  {
    name: 'For Individuals',
    description:
      'For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers',
    options: [
      {
        percent: 78,
        value: 'Secure Retirement Planning',
      },
      {
        percent: 63,
        value: 'Manageable Debt Consolidation',
      },
      {
        percent: 91,
        value: 'Reducing financial burdens',
      },
    ],
    features: [
      {
        icon: <Lamp className='text-green-60 size-24 3xl:size-30' />,
        value: 'Managing Personal Finances',
      },
      {
        icon: <Hands className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Saving for the Future',
      },
      {
        icon: <Building className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Homeownership',
      },
      {
        icon: <Book className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Education Funding',
      },
    ],
  },
  {
    name: 'For Business',
    description:
      ' For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, YourBank is committed to providing the right tools and support to achieve them',
    options: [
      {
        percent: 65,
        value: 'Cash Flow Management',
      },
      {
        percent: 70,
        value: 'Drive Business Expansion',
      },
      {
        percent: 45,
        value: 'Streamline payroll processing',
      },
    ],
    features: [
      {
        icon: <City className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Startups and Entrepreneurs',
      },
      {
        icon: <Photo className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Cash Flow Management',
      },
      {
        icon: <Cup className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Business Expansion',
      },
      {
        icon: <Dollar className='text-green-60 size-24 3xl:size-30'/>,
        value: 'Payment Solutions',
      },
    ],
  },
]

const UseCasesWrapper: React.FC<UseCasesWrapperProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={<span className="text-green-60">Use Cases</span>}
        description="At YourBank, we cater to the diverse needs of individuals and businesses alike, offering a wide range of financial solutions"
      />
      <UseCases variants={use_cases} />
    </Container>
  )
}

interface UseCasesProps extends UseCasesWrapperProps {
  variants: IUseCase[]
}

const UseCases: React.FC<UseCasesProps> = ({ className, variants }) => {
  return (
    <div className={cn('mt-60 3xl:mt-80 flex flex-col gap-40 3xl:gap-60', className)}>
      {variants.map((useCase, index) => (
        <UseCase variant={useCase} key={index} evenRow={index % 2 == 0} />
      ))}
    </div>
  )
}

interface UseCaseProps extends UseCasesWrapperProps {
  variant: IUseCase
  evenRow: boolean
}

const UseCase: React.FC<UseCaseProps> = ({ className, variant, evenRow }) => {
  return (
    <div className={cn('flex flex-col lg:flex-row gap-40 lg:gap-60 3xl:gap-100', className)}>
      <UseCaseFeatures features={variant.features} className="lg:w-1/2" />
      <UseCaseDescription
        name={variant.name}
        description={variant.description}
        options={variant.options}
        className={`lg:w-1/2 ${evenRow ? '': 'lg:order-first'}`}
      />
    </div>
  )
}

interface UseCaseFeaturesProps extends UseCasesWrapperProps {
  features: IUseCasesFeatures[]
  abstractRight?: boolean
}

const UseCaseFeatures: React.FC<UseCaseFeaturesProps> = ({
  className,
  features,
  abstractRight
}) => {
  return (
    <div
      className={cn(
        'p-20 md:p-40 3xl:p-50 rounded-[20px] relative overflow-hidden',
        'grid grid-cols-2 gap-10 3xl:gap-20',
        className,
      )}
    >
      {/** abstract design */}
      <div className="absolute left-0 top-0 bottom-0 right-0 bg-grey-11 -z-2"></div>
      <Image
        src="/usecase-abstract.svg"
        width={224}
        height={213}
        className={`absolute top-0 -z-1 max-w-118 md:max-w-224 ${abstractRight ? 'right-0' : 'left-0'}`}
      />
      {features.map((feature, index) => (
        <UseCaseFeature feature={feature} key={index} />
      ))}
    </div>
  )
}

interface UseCaseFeatureProps extends UseCasesWrapperProps {
  feature: IUseCasesFeatures
}

const UseCaseFeature: React.FC<UseCaseFeatureProps> = ({
  className,
  feature,
}) => {
  return (
    <div
      className={cn(
        'px-14 py-20 md:p-24 3xl:p-30 rounded-[12px] 3xl:rounded-2xl bg-grey-10 border border-grey-15',
        'flex flex-col items-center gap-14 3xl:gap-24',
        className,
      )}
    >
      <IconContainer className="size-64 3xl:size-78">
        {feature.icon}
      </IconContainer>
      <Text color="white" className="3xl:text-[20px] text-center">
        {feature.value}
      </Text>
    </div>
  )
}


interface UseCaseDescriptionProps extends UseCasesWrapperProps {
  name: IUseCase['name']
  description: IUseCase['description']
  options: IUseCase['options']
}

const UseCaseDescription: React.FC<UseCaseDescriptionProps> = ({
  className,
  name,
  description,
  options,
}) => {
  return (
    <div className={cn('flex flex-col gap-50 3xl:gap-62', className)}>
      <div className="flex flex-col items-center md:items-start gap-10 3xl:gap-14">
        <Text
          className="font-medium md:text-[26px] text-center md:text-left"
          color="white"
          size="sm1"
        >
          {name}
        </Text>
        <Text color="grey-70" className="text-center md:text-left">
          {description}
        </Text>
      </div>
      <UseCaseOptions options={options} />
      <Link
        to="/"
        className="bg-grey-11 hover:bg-grey-15 active:bg-grey-15 rounded-[82px] border border-grey-15 px-20 py-14 3xl:px-24 3xl:py-18 w-fit text-white text-[14px] 3xl:text-[18px] mx-auto md:mx-0"
      >
        Learn More
      </Link>
    </div>
  )
}

interface UseCaseOptionsProps extends UseCasesWrapperProps {
  options: IUseCase['options']
}

const UseCaseOptions: React.FC<UseCaseOptionsProps> = ({
  className,
  options,
}) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 px-50 md:px-0', className)}>
      {options.map((option, index) => (
        <UseCaseOption key={index} option={option} />
      ))}
    </div>
  )
}

interface UseCaseOptionProps extends UseCasesWrapperProps {
  option: IUseCase['options'][number]
}

const UseCaseOption: React.FC<UseCaseOptionProps> = ({
  className,
  option,
}) => {
  return (
    <div
      className={cn(
        'py-30 first:pt-0 last:pb-0 md:py-0 md:px-50 first:md:pl-0 last:md:pr-0',
        'border-b border-grey-15 last:border-b-0 md:border-b-0 md:border-r last:border-r-0 border-dashed',
        className,
      )}
    >
      <Text size="xl1" color="green-60" className="text-[40px] text-center md:text-left">
        {option.percent}%
      </Text>
      <Text color="grey-70" className="mt-2 md:mt-5 text-center md:text-left">
        {option.value}
      </Text>
    </div>
  )
}

export default UseCasesWrapper
