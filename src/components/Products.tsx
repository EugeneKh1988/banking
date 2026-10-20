import { ProductProvider, useProduct, type ProductType } from '#/hooks/useProduct'
import { cn } from '#/lib/utils'
import Container from './Container'
import Briefcase from './icons/Briefcase'
import Can from './icons/Can'
import Photo from './icons/Photo'
import { Button } from './ui/button'
import { Text } from './ui/text'

interface ProductsProps {
  className?: string
}

interface IProduct {
  icon: React.ReactNode,
  title: string,
  description: string
}

const products: Record<ProductType, IProduct[]> = {
  individual: [
    {
      icon: <Briefcase className="size-28 3xl:size-34 text-green-60" />,
      title: 'Checking Accounts',
      description:
        'Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.',
    },
    {
      icon: <Can className="size-28 3xl:size-34 text-green-60" />,
      title: 'Savings Accounts',
      description:
        "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
    },
    {
      icon: <Photo className="size-28 3xl:size-34 text-green-60" />,
      title: 'Loans and Mortgages',
      description:
        'Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.',
    },
  ],
  business: [
    {
      icon: <Briefcase className="size-28 3xl:size-34 text-green-60" />,
      title: 'Checking Business Accounts',
      description:
        'Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access.',
    },
    {
      icon: <Can className="size-28 3xl:size-34 text-green-60" />,
      title: 'Savings Business Accounts',
      description:
        "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you.",
    },
    {
      icon: <Photo className="size-28 3xl:size-34 text-green-60" />,
      title: 'Business Loans and Mortgages',
      description:
        'Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need.',
    },
  ],
}

const Products: React.FC<ProductsProps> = ({ className }) => {
  return (
    <Container className={cn('mt-70 md:mt-120 3xl:mt-150', className)}>
      <ProductProvider>
        <TitleBlock
          title={
            <>
              Our <span className="text-green-60">Products</span>
            </>
          }
          description="Discover a range of comprehensive and customizable banking products at
          YourBank, designed to suit your unique financial needs and aspirations"
          buttons={<TitleButtons className='md:self-end' />}
        />
        <ProductsVariety products={products} />
      </ProductProvider>
    </Container>
  )
}


interface TitleBlockProps {
  title: React.ReactNode,
  description: string
  buttons?: React.ReactNode
  className?: string
}

export const TitleBlock: React.FC<TitleBlockProps> = ({ className, title, description, buttons }) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:justify-between gap-20 items-center',
        className,
      )}
    >
      <div className={buttons ? 'md:max-w-831 3xl:max-w-910': 'md:max-w-1030 3xl:max-w-1296'}>
        <Text size="lg" color="white" className='font-medium text-center md:text-left capitalize'>
          {title}
        </Text>
        <Text className='font-light mt-10 3xl:mt-14 text-center md:text-left' color='grey-70'>
          {description}
        </Text>
      </div>
      { buttons }
    </div>
  )
}

export const TitleButtons: React.FC<ProductsProps> = ({ className }) => {
  const {activeType, setActiveType} = useProduct();
  return (
    <div
      className={cn(
        'p-12 3xl:p-14 rounded-[82px] bg-grey-11 border border-grey-15 flex flex-wrap md:flex-nowrap justify-center',
        className,
      )}
    >
      <Button
        className={`min-h-41 3xl:min-h-55 px-18 3xl:px-24 py-10 3xl:py-14 text-[14px] 3xl:text-[18px] leading-[150%] rounded-[140px] ${activeType == 'individual' ? 'bg-green-60  text-grey-11 hover:bg-green-70 active:bg-green-70' : 'bg-transparent text-white hover:bg-grey-10 active:bg-grey-10'}`}
        onClick={() => setActiveType('individual')}
      >
        For Individuals
      </Button>
      <Button
        className={`min-h-41 3xl:min-h-55 px-18 3xl:px-24 py-10 3xl:py-14 text-[14px] 3xl:text-[18px] leading-[150%] rounded-[140px] ${activeType == 'business' ? 'bg-green-60  text-grey-11 hover:bg-green-70 active:bg-green-70' : 'bg-transparent text-white hover:bg-grey-10 active:bg-grey-10'}`}
        onClick={() => setActiveType('business')}
      >
        For Businesses
      </Button>
    </div>
  )
}

interface ProductsVarietyProps extends ProductsProps  {
  products: Record<ProductType, IProduct[]>
}

const ProductsVariety: React.FC<ProductsVarietyProps> = ({ className, products }) => {
  const { activeType } = useProduct();
  return (
    <div className={cn('mt-60 md:mt-80 3xl:mt-100 grid grid-cols-1 md:grid-cols-3', className)}>
      {products[activeType].map((product, index) => (
        <ProductItem product={product} key={index} />
      ))}
    </div>
  )
}

interface ProductItemProps extends ProductsProps  {
  product: IProduct
}

const ProductItem: React.FC<ProductItemProps> = ({ className, product }) => {
  return (
    <div
      className={cn(
        'py-30 px-10 md:py-0 md:px-40 md:first:pl-0 md:last:pr-0 3xl:px-50 3xl:first:pl-0 3xl:last:pr-0',
        'border-b border-b-grey-15 md:border-b-0 md:border-r md:border-r-grey-15 md:last:border-r-0',
        className,
      )}
    >
      <IconContainer className='mx-auto'>{product.icon}</IconContainer>
      <Text
        className="mt-20 md:mt-24 3xl:mt-30 text-[20px] text-center"
        color="white"
        size="sm"
      >
        {product.title}
      </Text>
      <Text className="mt-12 md:mt-16 3xl:mt-20 text-center" color="grey-70">
        {product.description}
      </Text>
    </div>
  )
}

interface IconContainerProps {
  children: React.ReactNode
  className?: string
}

export const IconContainer: React.FC<IconContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'size-72 3xl:size-98 flex justify-center items-center p-8 rounded-full',
        'bg-linear-to-b from-green-60/5 to-green-60/0',
        className,
      )}
    >
      <div className='flex justify-center items-center p-2 rounded-full bg-linear-to-b from-green-60/5 to-67% to-green-60/0'>
        <div className="flex justify-center items-center p-14 rounded-full bg-linear-to-b from-green-60/10 to-67% to-green-60/0">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Products
