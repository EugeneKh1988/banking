import { cn } from "cn"
import Container from "./Container"
import { FeatureProvider, useFeature, type FeatureType } from "#/hooks/useFeature"
import { TitleBlock } from "./Products"
import { Text } from "./ui/text"
import { Button } from "./ui/button"
import ArrowTopRight from "./icons/ArrowTopRight"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"

interface FeatureProps {
  className?: string
}

interface IFeature {
  title: string,
  description: string
}

interface IFeatureButtons {
  name: string
  featureType: FeatureType
}

const features: Record<FeatureType, IFeature[]> = {
  banking: [
    {
      title: '24/7 Account Access',
      description:
        'Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.',
    },
    {
      title: 'Mobile Banking App',
      description:
        'Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.',
    },
    {
      title: 'Secure Transactions',
      description:
        'Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.',
    },
    {
      title: 'Bill Pay and Transfers',
      description:
        'Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.',
    },
  ],
  tools: [
    {
      title: '24/7 Account Access',
      description:
        'Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.',
    },
  ],
  support: [
    {
      title: 'Secure Transactions',
      description:
        'Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.',
    },
  ],
}

const buttons: IFeatureButtons[] = [
  {
    name: 'Online Banking',
    featureType: 'banking',
  },
  {
    name: 'Financial Tools',
    featureType: 'tools',
  },
  {
    name: 'Customer Support',
    featureType: 'support',
  },
]

const FeatureWrapper: React.FC<FeatureProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <FeatureProvider>
        <TitleBlock
          title={
            <>
              Our <span className="text-green-60">Features</span>
            </>
          }
          description="Experience a host of powerful features at YourBank, including seamless online banking, secure transactions, and personalized financial insights, all designed to enhance your banking experience"
        />
        <Features />
      </FeatureProvider>
    </Container>
  )
}

const Features: React.FC<FeatureProps> = ({ className }) => {
  return (
    <div className={cn('mt-50 md:mt-60 3xl:mt-80 flex flex-col md:flex-row md:items-start gap-20 3xl:gap-30', className)}>
      <FeatureSelectors buttons={buttons} />
      <FeatureList features={features} />
    </div>
  )
}

interface FeatureSelectorsProps extends FeatureProps {
    buttons: IFeatureButtons[]
}
const FeatureSelectors: React.FC<FeatureSelectorsProps> = ({ className, buttons }) => {
  return (
    <div
      className={cn(
        'md:w-fit p-20 md:p-40 3xl:p-50 bg-grey-11 rounded-[10px] 3xl:rounded-[12px]',
        className,
      )}
    >
      {/** for tablet and pc */}
      <div className="hidden md:flex flex-col md:gap-20 3xl:gap-24">
        {buttons.map((button, index) => (
          <FeatureSelector button={button} key={index} />
        ))}
      </div>
      {/** for mobile */}
      <Carousel className="md:hidden">
        <CarouselContent className="gap-20">
          {buttons.map((button, index) => (
            <CarouselItem key={index} className="basis-auto">
              <FeatureSelector button={button} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

interface FeatureSelectorProps extends FeatureProps {
    button: IFeatureButtons
}
const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  className,
  button,
}) => {
  const { activeFeature, setActiveFeature } = useFeature()
  return (
    <Button
      className={cn(
        'min-h-49 3xl:min-h-63 px-20 py-14 3xl:py-18 3xl:px-24 rounded-[100px] border border-grey-15 cursor-pointer',
        activeFeature == button.featureType
          ? 'bg-grey-10 hover:bg-grey-15 active:bg-grey-15 text-green-60'
          : 'bg-transparent hover:bg-grey-15 active:bg-grey-15 text-white',
        className,
      )}
      onClick={() => setActiveFeature(button.featureType)}
    >
      {button.name}
    </Button>
  )
}

interface FeatureListProps extends FeatureProps {
  features: Record<FeatureType, IFeature[]>
}

const FeatureList: React.FC<FeatureListProps> = ({ className, features }) => {
  const { activeFeature } = useFeature()
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-20 3xl:gap-30',
        className,
      )}
    >
      {activeFeature &&
        features[activeFeature].map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
    </div>
  )
}

interface FeatureItemProps extends FeatureProps {
  feature: IFeature
}

const FeatureItem: React.FC<FeatureItemProps> = ({ className, feature }) => {
  return (
    <div
      className={cn(
        'p-30 md:p-40 3xl:p-50 bg-grey-11 border border-grey-15 rounded-[10px] 3xl:rounded-[12px]',
        className,
      )}
    >
      <div className="flex justify-between gap-5 items-center">
        <Text color="white" className="md:text-[18px] 3xl:text-[22px]">
          {feature.title}
        </Text>
        <ArrowTopRight className="text-green-60 size-24 3xl:size-34" />
      </div>
      <Text className="mt-20 md:mt-24 3xl:mt-30 font-light" color="grey-70">
        {feature.description}
      </Text>
    </div>
  )
}

export default FeatureWrapper