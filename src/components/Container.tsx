import { cn } from '#/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn('container px-16 2xl:px-80 3xl:px-162 mx-auto', className)}
    >
      {children}
    </div>
  )
}

export default Container
