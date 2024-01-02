'use client'
// Need to be hydrated on the client

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function SignInWithGithub() {
  return (
    <Button
      onClick={() => signIn('github', { callbackUrl: `${window.location.origin}` })}
      variant="secondary"
    >
      <Github className="w-4 h-4 mx-2" />
      Login with Github
    </Button>
  )
}
