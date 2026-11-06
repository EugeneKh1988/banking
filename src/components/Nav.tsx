import { cn } from '#/lib/utils'
import { Image } from '@unpic/react'
import { Link, linkOptions } from '@tanstack/react-router';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import { authClient } from '#/lib/auth-client';
import Bar from './icons/Bar';
import Close from './icons/Close';
import Container from './Container';
import { Text } from './ui/text';
import { AnimatePresence, motion } from "motion/react"

interface NavProps {
  className?: string
}

export const links = linkOptions([
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/careers",
    label: "Careers",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/security",
    label: "Security",
  },
  {
    to: "/",
    label: "Dashboard",
    auth: true,
  },
]);

interface NavBarProps extends NavProps {
  withBackground?: boolean
}

const Nav: React.FC<NavBarProps> = ({ className, withBackground }) => {
  return (
    <div {...{ className: withBackground ? 'relative' : undefined }}>
      {withBackground && (
        <Image
          src="/home-abstract.svg"
          width={759}
          height={610}
          className="absolute -z-1 w-382 h-307 md:w-546 md:h-440 -top-20 left-0 3xl:w-759 3xl:h-610"
        />
      )}
      <Container className="pt-40 md:pt-30 3xl:pt-50">
        <div
          className={cn(
            'flex justify-between items-center gap-10 overflow-hidden bg-grey-11 border border-grey-15 rounded-[100px] p-14 pl-24 md:px-24 3xl:py-20 3xl:px-34',
            className,
          )}
        >
          <Image
            src="/Logo.svg"
            width={101}
            height={26}
            className="max-w-101 md:min-w-116 3xl:min-w-156"
          />
          <NavDesktopMenu className="hidden lg:block" />
          <div className="flex items-center gap-20">
            <NavAuthButtons className="hidden lg:flex" />
            <NavMobileMenu className="lg:hidden" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Nav



const NavDesktopMenu: React.FC<NavProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="flex text-white text-[14px] 3xl:text-[18px] leading-[1.5em]">
        {links.map((link, index) => (
          <NavDesktopLink key={index} link={link} />
        ))}
      </div>
    </div>
  )
}

const NavAuthButtons: React.FC<NavProps> = ({ className }) => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <AnimatePresence>
      {user && user?.id ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={cn('gap-20 md:gap-30 items-center', className)}
        >
          <Button
            className="min-h-45 3xl:min-h-55 px-24 py-12 3xl:px-30 3xl:py-14 bg-green-60 rounded-[82px] hover:bg-green-80 active:bg-green-80 cursor-pointer"
            onClick={async () => await authClient.signOut()}
          >
            <Text size='xs' color="grey-11">Logout</Text>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={cn('gap-20 3xl:gap-30 items-center', className)}
        >
          <Link to="/register">
            <Text size='xs' color='white'>Sign Up</Text>
          </Link>
          <Link
            to="/login"
            className="px-24 py-12 3xl:px-30 3xl:py-14 bg-green-60 rounded-[82px]"
          >
            <Text size='xs' color="grey-11">Login</Text>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface NavLinkProps extends NavProps {
  link: {
    to: string,
    label: string,
    auth?: boolean
  },
}

const NavDesktopLink: React.FC<NavLinkProps> = ({ className, link }) => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <>
      {(!link.auth || (link.auth && user?.id)) && (
        <Link
          to={link.to}
          className={cn(
            'px-18 py-10 3xl:px-24 3xl:py-12 capitalize',
            className,
          )}
          activeProps={{
            className: 'bg-grey-15 hover:bg-grey-20 active:bg-grey-20 md:rounded-[82px]',
          }}
        >
          {link.label}
        </Link>
      )}
    </>
  )
}

const NavMobileMenu: React.FC<NavProps> = ({
  className,
}) => {
    return (
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'shrink-0 rounded-[82px] w-56 h-40 bg-green-60 hover:bg-green-70 active:bg-green-70 cursor-pointer',
              className,
            )}
          >
            <Bar className="size-28 text-grey-20" />
          </Button>
        </DrawerTrigger>
        <DrawerOverlay />
        <DrawerContent className="bg-grey-10 border-l-grey-15">
          <DrawerHeader className="px-9 md:px-24 py-12">
            <div className="flex justify-between items-center">
              <DrawerTitle>
                <Image src="/Logo.svg" width={101} height={26} />
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  className="size-26 bg-grey-15 hover:bg-grey-20 cursor-pointer"
                >
                  <Close className="size-18" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="pt-77 md:pt-147 pb-30 md:pb-35 px-9 md:px-24 overflow-y-auto no-scrollbar">
            <div className="font-semibold text-[16px] leading-16">
              {links.map((navItem, index) => (
                <NavMobileLink key={index} link={navItem} />
              ))}
            </div>
            <NavAuthButtons className='mt-20 flex lg:hidden' />
          </div>
        </DrawerContent>
      </Drawer>
    )
}

const NavMobileLink: React.FC<NavLinkProps> = ({ className, link }) => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <>
      {(!link.auth || (link.auth && user?.id)) && (
        <Link
          to={link.to}
          className={cn(
            'py-20 rounded-lg capitalize block tracking-[-0.01em] text-white',
            className,
          )}
          activeProps={{
            className:
              'bg-grey-15 hover:bg-grey-20 active:bg-grey-20 border border-grey-15',
          }}
        >
          <span className="ps-10">{link.label}</span>
        </Link>
      )}
    </>
  )
}