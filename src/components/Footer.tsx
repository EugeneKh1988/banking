import { cn } from '#/lib/utils'
import { Image } from '@unpic/react'
import Container from './Container'
import { links } from './Nav'
import { authClient } from '#/lib/auth-client'
import { Link } from '@tanstack/react-router'
import Email from './icons/Email'
import Phone from './icons/Phone'
import Location from './icons/Location'
import { Text } from './ui/text'
import Facebook from './icons/Facebook'
import Twitter from './icons/Twitter'
import Linkedin from './icons/Linkedin'

interface FooterProps {
  className?: string
}

interface IContact {
  icon: React.ReactNode,
  value: string
}

export interface ISocial {
  icon: React.ReactNode,
  link: string
}

const contacts: IContact[] = [
  {
    icon: <Email className='size-20 text-green-60 3xl:size-24' />,
    value: 'hello@skillbirdge.com',
  },
  {
    icon: <Phone className='size-20 text-green-60 3xl:size-24' />,
    value: '+91 91813 23 2309',
  },
  {
    icon: <Location className='size-20 text-green-60 3xl:size-24' />,
    value: 'Somewhere in the World',
  },
];

const socials: ISocial[] = [
  {
    icon: <Facebook className='size-20 text-grey-15 3xl:size-24' />,
    link: '/',
  },
  {
    icon: <Twitter className='size-20 text-grey-15 3xl:size-24' />,
    link: '/',
  },
  {
    icon: <Linkedin className='size-20 text-grey-15 3xl:size-24' />,
    link: '/',
  },
];

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'mt-80 md:mt-120 3xl:mt-150 bg-grey-11 pt-50 md:pt-60 3xl:pt-100 pb-30 3xl:pb-50',
        className,
      )}
    >
      <Container className="flex flex-col items-center">
        <Image
          src="/Logo.svg"
          width={155}
          height={40}
          className="max-w-132 3xl:max-w-155"
        />
        <FooterMenu menu={links} className='mt-24 md:mt-40 3xl:mt-50' />
        <Separator />
        <Contacts contacts={contacts} />
        <Separator />
        <BottomBlock socials={socials} />
      </Container>
    </div>
  )
}

interface FooterMenuProps extends FooterProps {
  menu: typeof links
}

const FooterMenu: React.FC<FooterMenuProps> = ({ className, menu }) => {
  return (
    <div
      className={cn(
        'flex gap-14 3xl:gap-26 flex-wrap md:flex-nowrap text-white-90 text-[14px] md:text-[16px] 3xl:text-[18px] leading-[1.5em]',
        className,
      )}
    >
      {menu.map((link, index) => (
        <FooterLink key={index} link={link} />
      ))}
    </div>
  )
}

interface FooterLinkProps extends FooterProps {
  link: {
    to: string,
    label: string,
    auth?: boolean
  },
}

const FooterLink: React.FC<FooterLinkProps> = ({ className, link }) => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <>
      {(!link.auth || (link.auth && user?.id)) && (
        <Link to={link.to} className={cn('capitalize', className)}>
          {link.label}
        </Link>
      )}
    </>
  )
}


const Separator: React.FC<FooterProps> = ({ className }) => {
  return <div className={cn('w-full h-1 bg-grey-15 my-30 md:my-40 3xl:my-50', className)}></div>
}

interface ContactsProps extends FooterProps {
  contacts: IContact[]
}

const Contacts: React.FC<ContactsProps> = ({ className, contacts }) => {
  return (
    <div className={cn('flex gap-20 flex-wrap md:flex-nowrap items-center justify-center', className)}>
      {contacts.map((contact, index) => (
        <div key={index} className="flex gap-6 items-center">
          {contact.icon}
          <Text color="white-90">{contact.value}</Text>
        </div>
      ))}
    </div>
  )
}

interface BottomBlockProps extends FooterProps {
  socials: ISocial[]
}

const BottomBlock: React.FC<BottomBlockProps> = ({ className, socials }) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-20 md:gap-5 md:justify-between w-full items-center',
        'bg-grey-10 border border-grey-15 rounded-[12px] md:rounded-[100px]',
        'pl-12 pr-24 pt-50 pb-30 md:p-12 md:pr-24 3xl:p-16 3xl:pr-30',
        className,
      )}
    >
      <Socials socials={socials} className='-mt-70 md:mt-0' />
      <Text className="font-light" color="grey-70" size="xs">
        YourBank All Rights Reserved
      </Text>
      <div className="flex gap-8">
        <Link to="/" className='border-r border-r-grey-70 pr-8'>
          <Text className="font-light" color="grey-70" size="xs">
            Privacy Policy
          </Text>
        </Link>
        <Link to="/">
          <Text className="font-light" color="grey-70" size="xs">
            Terms of Service
          </Text>
        </Link>
      </div>
    </div>
  )
}

interface SocialsProps extends FooterProps {
  socials: ISocial[]
}

const Socials: React.FC<SocialsProps> = ({ className, socials }) => {
  return (
    <div
      className={cn(
        'flex gap-8 3xl:gap-14 flex-wrap md:flex-nowrap items-center',
        className,
      )}
    >
      {socials.map((social, index) => (
        <a
          href={social.link}
          key={index}
          className="flex items-center justify-center size-44 3xl:size-52 bg-green-60 rounded-full p-12 3xl:p-14"
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}

export default Footer
