'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export function SignInForm() {
  const [email, setEmail] = useState<null | string>('null')

  async function signInWithEmail() {
    const signInResult = await signIn('email', {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    })

    if (!signInResult?.ok) {
      return toast({
        title: 'Well, this did not work.',
        description: 'Something went wrong, please try again.',
        variant: 'destructive',
      })
    }

    return toast({
      title: 'This worked.',
      description: 'please check your email.',
      variant: 'default',
    })
  }

  return (
    <form action={signInWithEmail}>
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="your email-address"
          onChange={e => setEmail(e.target.value)}
        ></Input>
      </div>
      <Button
        type="submit"
        className="mt-2 w-full"
      >
        Login with Email
      </Button>
    </form>
  )
}
