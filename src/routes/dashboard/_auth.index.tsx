import { createFileRoute } from '@tanstack/react-router'
import { Text } from '#/components/ui/text'
import { authClient } from '#/lib/auth-client'

export const Route = createFileRoute('/dashboard/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div>
      <Text size="xl" color='green-60'>Welcome{user && user.name ? `, ${user.name}!`: "!"}</Text>
      <Text className='mt-10'>Choose option in the menu</Text>
    </div>
  )
}