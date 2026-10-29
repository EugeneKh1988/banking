import { cn } from '#/lib/utils'
import Container from './Container'
import Briefcase from './icons/Briefcase'
import { TitleBlock } from './Products'
import { Button } from './ui/button'
import { Text } from './ui/text'

interface JobsWrapperProps {
  className?: string
}

interface IJob {
  id: number,
  title: string,
  location?: string,
  department?: string,
  description: string,
  requirements: string[]
}

const jobs: IJob[] = [
  {
    id: 1,
    title: 'Relationship Manager',
    location: 'India',
    department: 'Retail Banking',
    description: 'As a Relationship Manager at YourBank, you will be responsible for developing and maintaining relationships with our valued customers. You will proactively identify their financial needs and offer tailored solutions to help them achieve their goals. We are seeking individuals with excellent communication skills, a strong sales acumen, and a passion for delivering exceptional customer service.',
    requirements: [
      "Bachelor's degree in Business, Finance, or a related field",
      "Minimum of 3 years of experience in sales or relationship management in the banking industry",
      "Proven track record of meeting and exceeding sales targets",
      "Excellent interpersonal and negotiation skills",
      "Strong knowledge of banking products and services"
    ],
  },
  {
    id: 2,
    title: 'Risk Analyst',
    location: 'India',
    department: 'Risk Management',
    description: 'As a Risk Analyst at YourBank, you will play a vital role in identifying and assessing potential risks to our organization. You will analyze data, conduct risk assessments, and develop strategies to mitigate risks. We are looking for detail-oriented individuals with strong analytical skills and a solid understanding of risk management principles.',
    requirements: [
      "Bachelor's degree in Finance, Economics, or a related field",
      "Minimum of 2 years of experience in risk management or a similar role",
      "Proficiency in risk analysis tools and techniques",
      "Strong analytical and problem-solving skills",
      "Knowledge of regulatory requirements and industry best practices"
    ],
  },
  {
    id: 3,
    title: 'IT Security Specialist',
    location: 'India',
    department: 'Information Technology',
    description: 'As an IT Security Specialist at YourBank, you will be responsible for ensuring the security and integrity of our information systems. You will develop and implement security protocols, conduct vulnerability assessments, and respond to security incidents. We are seeking individuals with a strong technical background, knowledge of cybersecurity best practices, and a commitment to maintaining the confidentiality of customer data.',
    requirements: [
      "Bachelor's degree in Computer Science, Information Security, or a related field",
      "Minimum of 5 years of experience in IT security or a similar role",
      "In-depth knowledge of network security protocols and technologies",
      "Familiarity with regulatory frameworks such as PCI DSS and GDPR",
      "Professional certifications such as CISSP or CISM are preferred"
    ],
  },
]; 

const JobsWrapper: React.FC<JobsWrapperProps> = ({ className }) => {
  return (
    <Container className={cn('mt-80 md:mt-120 3xl:mt-150', className)}>
      <TitleBlock
        title={
          <span className="text-green-60">Job Openings</span>
        }
        description="Explore exciting job openings at YourBank, where we value talent, innovation, and a passion for customer service. Join our team and be part of shaping a brighter future in the banking industry"
      />
      <Jobs items={jobs} />
    </Container>
  )
}

interface JobsProps extends JobsWrapperProps {
  items: IJob[]
}

const Jobs: React.FC<JobsProps> = ({ className, items }) => {
  return (
    <div
      className={cn(
        'mt-60 3xl:mt-80',
        'grid grid-cols-1 lg:grid-cols-2 gap-20 3xl:gap-30',
        className,
      )}
    >
      {items.map((item, index) => (
        <Job key={index} item={item} />
      ))}
    </div>
  )
}

interface JobProps extends JobsWrapperProps {
  item: IJob
}

const Job: React.FC<JobProps> = ({ className, item }) => {
  return (
    <div
      className={cn(
        'p-24 md:p-40 3xl:p-50 bg-grey-11 border border-grey-15 rounded-2xl',
        className,
      )}
    >
      <Text color="white" className="font-semibold" size="sm1">
        {item.title}
      </Text>
      <JobOptions location={item.location} department={item.department} />
      {/** about job */}
      <Text
        color="white"
        className="font-semibold mt-30 3xl:mt-50 md:mt-40"
        size="sm"
      >
        About This Job
      </Text>
      <Text color="grey-70" className="font-light mt-8 md:mt-16 3xl:mt-20">
        {item.description}
      </Text>
      <Requirements items={item.requirements} />
      <Button className="mt-30 md:mt-64 3xl:mt-77 min-h-45 3xl:min-h-59 px-20 py-12 3xl:px-30 3xl:py-16 bg-green-60 hover:bg-green-70 active:bg-green-70 rounded-[82px]">
        <Text size="xs" color="grey-11">
          Apply Now
        </Text>
      </Button>
    </div>
  )
}

interface RequirementsProps extends JobsWrapperProps {
  items: string[]
}

const Requirements: React.FC<RequirementsProps> = ({ className, items }) => {
  return (
    <div className={cn('mt-30 md:mt-40', className)}>
      <Text
        color="white"
        className="font-semibold mt-30 3xl:mt-50 md:mt-40"
        size="sm"
      >
        Requirements & Qualifications
      </Text>
      <div className='flex flex-col gap-14 3xl:gap-20 mt-10 md:mt-16 3xl:mt-20'>
        {items.map((item, index) => (
          <div className="flex items-center gap-8 3xl:gap-10" key={index}>
            <Briefcase className="size-20 text-grey-70 shrink-0" />
            <Text color="grey-70" className="font-light">
              {item}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}

interface JobOptionsProps extends JobsWrapperProps {
  location?: string
  department?: string
}

const JobOptions: React.FC<JobOptionsProps> = ({ className, location, department }) => {
  return (
    <div
      className={cn(
        'mt-10 3xl:mt-14 flex flex-col xl:flex-row gap-6 md:gap-8 3xl:gap-10',
        className,
      )}
    >
      {location && <JobOption value={`Location: ${location}`} />}
      {department && <JobOption value={` Department: ${department}`} />}
    </div>
  )
}

interface JobOptionProps extends JobsWrapperProps {
  value: string
}

const JobOption: React.FC<JobOptionProps> = ({ className, value }) => {
  return (
    <div
      className={cn(
        'px-10 py-6 3xl:px-16 3xl:py-8 rounded-[68px] bg-grey-10 border border-grey-15 w-fit',
        className,
      )}
    >
      <Text color="grey-70" className="font-light">
        {value}
      </Text>
    </div>
  )
}

export default JobsWrapper
