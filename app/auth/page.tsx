import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignInWithGithub } from '../components/signInWithGithub'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../utils/auth'
import { SignInForm } from '../components/signInForm'
import { Separator } from '@/components/ui/separator'

export default async function AuthRoute() {
  const session = await getServerSession(authOptions)
  if (session) {
    return redirect('/')
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To access the private page you have to be authenticated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <SignInForm />
            <Separator className="my-4" />
            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
