import { FaqProvider, useFaq } from '#/hooks/useFaq'
import { cn } from '#/lib/utils'
import Container from './Container'
import CaretDown from './icons/CaretDown'
import { TitleBlock } from './Products'
import { Button } from './ui/button'
import { Text } from './ui/text'

interface FaqWrapperProps {
  className?: string
}

interface IFaq {
  question: string,
  answer: string,
}

const questions: IFaq[] = [
  {
    question: 'How do I open an account with YourBank?',
    answer:
      'Opening an account with YourBank is easy. Simply visit our website and click on the "Open an Account" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help.',
  },
  {
    question: 'What documents do I need to provide to apply for a loan?',
    answer:
      'The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver\'s license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.',
  },
  {
    question: 'How can I access my accounts online?',
    answer:
      'Accessing your accounts online is simple and secure. Visit our website and click on the "Login" button. Enter your username and password to access your accounts. If you haven\'t registered for online banking, click on the "Enroll Now" button and follow the registration process. If you need assistance, our customer support team is available to guide you.',
  },
  {
    question: 'Are my transactions and personal information secure?',
    answer:
      'At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place.',
  },
  {
    question: 'What documents do I need to provide to apply for a loan?',
    answer:
      'The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver\'s license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process.',
  },
]

const FaqWrapper: React.FC<FaqWrapperProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={
          <>
            <span className="text-green-60">Frequently</span> Asked Questions
          </>
        }
        description="Still you have any questions? Contact our Team via support@yourbank.com"
      />
      <FaqProvider>
        <Faq questions={questions} />
        <FaqButton />
      </FaqProvider>
    </Container>
  )
}

interface FaqProps extends FaqWrapperProps {
  questions: IFaq[]
}

const Faq: React.FC<FaqProps> = ({ className, questions }) => {
  const {loadedAllFaq} = useFaq();
  return (
    <div
      className={cn(
        'mt-50 md:mt-60 3xl:mt-80',
        'grid grid-cols-1 lg:grid-cols-2 gap-20 3xl:gap-30',
        'relative',
        className,
      )}
    >
      {!loadedAllFaq && (
        <div className="absolute bg-linear-to-b from-50% from-[#191919/0] to-[#191919] top-0 left-0 right-0 bottom-0"></div>
      )}
      {(loadedAllFaq ? questions : questions.slice(0, 4)).map(
        (question, index) => (
          <FaqItem key={index} question={question} />
        )
      )}
    </div>
  )
}

interface FaqItemProps extends FaqWrapperProps {
  question: IFaq
}

const FaqItem: React.FC<FaqItemProps> = ({ className, question }) => {
  return (
    <div
      className={cn(
        'p-30 md:p-40 3xl:p-50 rounded-[10px] 3xl:rounded-[14px] border border-grey-15',
        className,
      )}
    >
      <Text color="white" className="font-medium" size="xs1">
        {question.question}
      </Text>
      <div className="h-1 w-full bg-grey-15 my-20 md:my-24 3xl:my-30"></div>
      <Text color="grey-70" className="font-light">
        {question.answer}
      </Text>
    </div>
  )
}

const FaqButton: React.FC<FaqWrapperProps> = ({ className }) => {
  const {loadedAllFaq, setLoadState} = useFaq();
  return (
    <div className="text-center mt-5">
      <Button
        className={cn(
          'min-h-49 3xl:min-h-63 px-20 py-14 3xl:px-24 3xl:py-18 bg-grey-11 hover:bg-grey-15 active:bg-grey-15 rounded-[100px] border border-grey-15',
          'text-[14px] 3xl:text-[18px] text-white leading-[150%]',
          className,
        )}
        onClick={() => setLoadState(!loadedAllFaq)}
      >
        <span className="flex gap-4 items-center">
          {loadedAllFaq ? 'Show less FAQ’s' : 'Load All FAQ’s'}
          <CaretDown
            className={`size-18 3xl:size-22 ${loadedAllFaq ? 'rotate-180' : ''}`}
          />
        </span>
      </Button>
    </div>
  )
}

export default FaqWrapper
