import Container from '#/components/Container'
import Footer from '#/components/Footer'
import Nav from '#/components/Nav'
import { authClient } from '#/lib/auth-client'
import { cn } from '#/lib/utils'
import { authMiddleware } from '#/middleware/auth'
import { createFileRoute, Link, Outlet, redirect, type LinkOptions } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_auth')({
  beforeLoad: async () => {
    const session = await authClient.getSession()

    if (!session) {
      throw redirect({ to: '/login' })
    }
  },
  server: {
    middleware: [authMiddleware],
  },
  component: RouteComponent,
})

interface MenuItem extends LinkOptions {
  label: string
  admin?: boolean
}
const menu: MenuItem[] = [
  {
    label: 'Account details',
    to: '/dashboard/account',
  },
]

function RouteComponent() {
  return (
    <>
      <Nav />
      <Container className="min-h-200 py-40 md:py-60 3xl:py-80 flex flex-col md:flex-row gap-15 xl:gap-25 3xl:gap-40 items-start">
        <ul className="w-full md:max-w-300 p-20 rounded-[6px] bg-grey-11 border-2 border-grey-15">
          {menu.map((item, index) => (
            <li key={index}>
              <AuthLink link={item} />
            </li>
          ))}
        </ul>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

interface AuthLinkProps {
  link: MenuItem,
  className?: string
}

const AuthLink: React.FC<AuthLinkProps> = ({ className, link }) => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <>
      {(!link.admin || (link.admin && user?.role == 'admin')) && (
        <Link
          to={link.to}
          className={cn(
            'px-10 py-20 3xl:px-34 3xl:py-25 capitalize block rounded-[6px] hover:bg-grey-15 text-[14px] md:text-[16px] 3xl:text-[18px]',
            className,
          )}
          activeProps={{
            className: 'bg-grey-15 hover:bg-grey-20 active:bg-grey-20',
          }}
        >
          {link.label}
        </Link>
      )}
    </>
  )
}

