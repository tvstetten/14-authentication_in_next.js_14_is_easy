/*
This file implements the options for the NextAuth lib
Using this file enables the usage of the session-object and 
thus the auth-handling on the server instead of the client 
*/
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'

import prisma from './db'

// const prisma = new PrismaClient()

export const authOptions = {
  // "as Adapter" is a workaround
  // https://github.com/nextauthjs/next-auth/issues/8136
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        // secure: false,
        // requireTLS: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
} satisfies NextAuthOptions
