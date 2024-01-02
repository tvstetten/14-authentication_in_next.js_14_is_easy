import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from './utils/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LogoutButton from './components/logoutButton'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="p-8">
      <h1 className="my-2">Hello this is the index page - it is a public route</h1>
      {session ? (
        <>
          <h1>You are logged in!</h1>
          <LogoutButton />
        </>
      ) : (
        <>
          <h1>You are not logged in. Please login to see something special</h1>
          <Button asChild>
            <Link href="/auth">Login</Link>
          </Button>
        </>
      )}
    </div>
  )
}
