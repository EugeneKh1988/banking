import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import Container from './Container'
import FilledCheck from './icons/FilledCheck'
import { Text } from './ui/text'
import Exchange from './icons/Exchange'
import { Image } from '@unpic/react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import RoundedDollarSign from './icons/RoundedDollarSign'
import React from 'react'
import RoundedEuroSign from './icons/RoundedEuroSign'
import RoundedBTCSign from './icons/RoundedBTCSign'
import RoundedEtheriumSign from './icons/RoundedEtheriumSign'

interface HeroProps {
  className?: string
}

interface ITransaction {
  name: string,
  out: number
}

interface IMoney {
  id: number
  name: string
  abbreviation: string
  iconPath: string
}

interface IExchange {
  moneyIds: number[]
  values: number[]
}

interface IValues {
  monthlyIncome: number,
  transactions: ITransaction[],
  money: IMoney[],
  exchange: IExchange[]
}

const values: IValues = {
  monthlyIncome: 5000.0,
  transactions: [
    {
      name: 'Joel Kenley',
      out: 68.0,
    },
    {
      name: 'Mark Smith',
      out: 68.0,
    },
    {
      name: 'Lenen Roy',
      out: 68.0,
    },
  ],
  money: [
    {
      id: 1,
      name: 'Indian Rupees',
      abbreviation: 'INR',
      iconPath: '/flags/india.svg',
    },
    {
      id: 2,
      name: 'United States Dollar',
      abbreviation: 'USD',
      iconPath: '/flags/usa.svg',
    },
  ],
  exchange: [
    {
      moneyIds: [1, 2],
      values: [5.0, 12.0],
    },
  ],
}

const currencyIcons = [
  <RoundedDollarSign className='size-21 lg:size-28 3xl:size-35 text-green-60' />,
  <RoundedEuroSign className='size-21 lg:size-28 3xl:size-35 text-green-60' />,
  <RoundedBTCSign className='size-21 lg:size-28 3xl:size-35 text-green-60' />,
  <RoundedEtheriumSign className='size-21 lg:size-28 3xl:size-35 text-green-60' />
];

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <Container
      className={cn(
        'mt-50 md:mt-60 3xl:mt-100',
        'flex flex-col lg:flex-row lg:items-start gap-80 2xl:gap-100 3xl:gap-120',
        className,
      )}
    >
      <WelcomeBlock className='md:max-w-649 3xl:max-w-825' />
      <div>
        <MoneyBlock values={values} className='w-full lg:max-w-410 3xl:max-w-515' />
        <SupportedCurrency className='ml-auto' />
      </div>
    </Container>
  )
}


const WelcomeBlock: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col items-center md:items-start', className)}>
      {/** badge */}
      <div className="p-8 pr-16 3xl:p-10 3xl:pr-20 3xl:pl-12 rounded-[61px] flex gap-4 bg-grey-15">
        <FilledCheck className="text-green-60 size-20 3xl:size-24" />
        <Text color="white" size="xs" className="text-[12px] leading-24">
          No LLC Required, No Credit Check.
        </Text>
      </div>
      {/** title */}
      <Text
        color="white"
        size="lg"
        className="mt-12 md:mt-16 3xl:mt-20 text-center md:text-left font-medium"
      >
        Welcome to YourBank Empowering Your{' '}
        <span className="text-green-60">Financial Journey</span>
      </Text>
      {/** description */}
      <Text
        color="white-90"
        className="mt-8 md:mt-10 3xl:mt-14 text-center md:text-left font-light"
      >
        At YourBank, our mission is to provide comprehensive banking solutions
        that empower individuals and businesses to achieve their financial
        goals. We are committed to delivering personalized and innovative
        services that prioritize our customers' needs.
      </Text>
      {/** account btn */}
      <Link
        to="/"
        className="mt-30 md:mt-40 3xl:mt-50 px-24 py-14 3xl:px-30 3xl:py-18 bg-green-60 hover:bg-green-70 active:bg-green-70 rounded-[82px]"
      >
        <Text size="xs" color="grey-11">
          Open Account
        </Text>
      </Link>
    </div>
  )
}

interface HeroMoneyProps extends HeroProps {
  values: IValues
}

const MoneyBlock: React.FC<HeroMoneyProps> = ({ className, values }) => {
  return (
    <div className="px-26 lg:pl-0 lg:pr-40 relative">
      <MoneyIncome
        monthlyIncome={values.monthlyIncome}
        className="absolute z-1 -left-10 -top-25 md:-top-40 md:-left-30"
      />
      <Image
        src="/hero-abstract.svg"
        width={417}
        height={382}
        className="absolute -z-1 -top-50 -right-10 max-w-220 lg:max-w-300 md:-right-40 lg:-right-40 xl:-right-100 md:top-30 3xl:max-w-417"
      />
      <div
        className={cn(
          'p-20 border border-grey-15 rounded-[6px] overflow-hidden relative',
          className,
        )}
      >
        <div className="-z-2 absolute bg-grey-10 w-full h-full top-0 left-0"></div>
        <div className="-z-1 absolute w-full h-full top-0 left-0 bg-linear-120 from-grey-10/0 to-40% to-grey-10"></div>
        <Transactions transactions={values.transactions} />
        <ExchangeBlock exchanges={values.exchange} money={values.money} />
        <Button className="mt-14 py-8 lg:py-11 px-15 min-h-30 lg:min-h-41 3xl:min-h-51 text-center w-full rounded-[42px] lg:rounded-[56px] 3xl:rounded-[71px] bg-green-40 hover:bg-green-45 active:bg-green-45 text-green-65 leading-[150%] text-[9px] lg:text-[12px] 3xl:text-[16px]">
          Exchange
        </Button>
      </div>
    </div>
  )
}

interface TransactionsProps extends HeroProps {
  transactions: ITransaction[]
}

const Transactions: React.FC<TransactionsProps> = ({ className, transactions }) => {
  return (
    <div className={cn(className)}>
      <Text color="white" size="xs" className="text-[10px]">
        Your Transactions
      </Text>
      <div className="mt-10 md:mt-14 3xl:mt-18 flex flex-col">
        {transactions.slice(0, 3).map((transaction, index) => (
          <Transaction transaction={transaction} order={index} key={index} />
        ))}
      </div>
    </div>
  )
}

interface TransactionProps extends HeroProps {
  transaction: ITransaction
  order: number
}

const Transaction: React.FC<TransactionProps> = ({ className, transaction, order }) => {
  const paddingStyles = () => {
    if (order == 1) {
      return 'px-10 lg:px-17 3xl:px-21'
    }
    if (order == 2) {
      return 'px-21 lg:px-28 3xl:px-35'
    }
    return ''
  }

  const opacityStyles = () => {
    if (order == 1) {
      return 'opacity-50'
    }
    if (order == 2) {
      return 'opacity-20'
    }
    return ''
  }

  const translateStyles = () => {
    if (order == 1) {
      return '-translate-y-16'
    }
    if (order == 2) {
      return '-translate-y-27'
    }
    return ''
  }

  return (
    <div className={cn(paddingStyles(), className)}>
      <div
        className={cn(
          'px-12 py-8 md:px-16 md:py-11 3xl:px-20 3xl:py-14 bg-grey-11 flex justify-between border border-grey-15 rounded-[6px] lg:rounded-xl 3xl:rounded-[10px]',
          "overflow-hidden",
          opacityStyles(),
          translateStyles()
        )}
      >
        <div className="flex gap-5 3xl:gap-9 items-center">
          <div className="flex items-center justify-center rounded-full bg-green-60 shrink-0 size-23 md:size-30 3xl:size-38">
            <Exchange className="text-grey-11 size-12 md:size-16 3xl:size-21" />
          </div>
          <div>
            <Text className="text-[9px] md:text-[12px] 3xl:text-[16px] font-light">
              Transaction
            </Text>
            <Text size="xs" className="text-[10px]">
              {transaction.name}
            </Text>
          </div>
        </div>
        <Text className="self-end text-[12px] md:text-[16px] 3xl:text-[20px] font-medium">
          -
          {new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'USD',
          }).format(transaction.out)}
        </Text>
      </div>
    </div>
  )
}

interface ExchangeProps extends HeroProps {
  exchanges: IExchange[]
  money: IMoney[]
}

const ExchangeBlock: React.FC<ExchangeProps> = ({ className, exchanges, money }) => {
  return (
    <div className={cn(className)}>
      <Text color="white" size="xs" className="text-[10px]">
        Money Exchange
      </Text>
      <div className="mt-14 lg:mt-20 3xl:mt-25 flex flex-col gap-5">
        {exchanges.map((exchange, index) => (
          <ExchangeItem
            key={index}
            exchange={exchange}
            money={money.filter((i) => exchange.moneyIds.includes(i.id))}
          />
        ))}
      </div>
    </div>
  )
}

interface ExchangeItemProps extends HeroProps {
  exchange: IExchange
  money: IMoney[]
}

const ExchangeItem: React.FC<ExchangeItemProps> = ({ className, exchange, money }) => {
  return (
    <div
      className={cn(
        'bg-grey-11 border border-grey-15 rounded-[6px] lg:rounded-xl 3xl:rounded-[10px]',
        'grid grid-cols-2',
        className,
      )}
    >
      {money.map((currency, index) => (
        <MoneyItem
          currency={currency}
          key={currency.id}
          className={index == 0 ? 'border-r' : ''}
        />
      ))}
      {exchange.values.map((value, index) => (
        <div key={index} className={`p-10 lg:p-14 3xl:p-18 ${index == 0 ? 'border-r border-grey-15': ''}`}>
          <Text color="white" size="xs" className="text-[10px] font-medium">
            {value}
          </Text>
        </div>
      ))}
    </div>
  )
}

interface MoneyItemProps extends HeroProps {
  currency: IMoney
}

const MoneyItem: React.FC<MoneyItemProps> = ({ className, currency }) => {
  return (
    <div className={cn('p-10 lg:p-14 3xl:p-18 border-grey-15 border-b', className)}>
      <div className="flex gap-5 3xl:gap-8 items-center">
        <Image
          src={currency.iconPath}
          width={34}
          height={34}
          className="size-21 lg:size-28 3xl:size-34"
        />
        <Text
          color="white"
          className="text-[9px] md:text-[12px] 3xl:text-[16px]"
        >
          {currency.abbreviation}
        </Text>
      </div>
      <Text
        color="white-90"
        className="mt-5 lg:mt-7 3xl:mt-9 text-[8px] md:text-[11px] 3xl:text-[14px] font-light"
      >
        {currency.name}
      </Text>
    </div>
  )
}

interface MoneyIncomeProps extends HeroProps {
  monthlyIncome: number,
}

const MoneyIncome: React.FC<MoneyIncomeProps> = ({ className, monthlyIncome }) => {
  return (
    <div
      className={cn('py-8 lg:py-11 3xl:py-14 px-10 lg:px-11 3xl:px-18 bg-green-40 flex items-center gap-5 3xl:gap-8 rounded-[6px] lg:rounded-xl 3xl:rounded-[10px]', className)}
    >
      <div className="size-22 lg:size-30 3xl:size-38 bg-green-60 rounded-full flex items-center justify-center">
        <Plus className='size-12 text-grey-10 lg:size-17 3xl:size-21' />
      </div>
      <div>
        <Text color='white' className='text-[10px]' size='xs'>
          +
          {new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'USD',
          }).format(monthlyIncome)}
        </Text>
        <Text color='white-90' className='text-[8px] md:text-[11px] 3xl:text-[14px]'>Monthly Income</Text>
      </div>
    </div>
  )
}


const SupportedCurrency: React.FC<HeroProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'mt-10 lg:mt-14 w-fit p-5 lg:p-6 3xl:p-9 pl-12 lg:pl-16 3xl:pl-21 rounded-[41px] lg:rounded-[55px] 3xl:rounded-[69px] bg-green-40 flex gap-6 lg:gap-9 items-center',
        className,
      )}
    >
      <Text color="white" className="text-[9px] md:text-[12px] 3xl:text-[16px]">
        Supported Currency
      </Text>
      <div className="flex gap-4 lg:gap-5 3xl:gap-7 bg-grey-10 p-5 lg:p-7 3xl:p-9 rounded-[28px] lg:rounded-[37px] 3xl:rounded-[47px]">
        {currencyIcons.map((icon, index) => (
          <React.Fragment key={index}>{icon}</React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Hero
