/* 
In dev-Mode there is a Problem using a "const prisma = PrismaClient()"  
because every time the source gets compiled a new instance is created
that will lead to an error because of too many connections.

This file replaces the direct Access to the PrismaClient by 
a solution that also works in development mode.
*/
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()

  // To extend the object you could use something like:
  // return new PrismaClient().$extends({
  //   result: {
  //     user: {
  //       fullName: {
  //         needs: { firstName: true, lastName: true },
  //         compute(user) {
  //           return `${user.firstName} ${user.lastName}`
  //         },
  //       },
  //     },
  //   },
  // })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
