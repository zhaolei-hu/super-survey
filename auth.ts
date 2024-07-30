import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import prisma from './db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Resend from 'next-auth/providers/resend'
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Resend({
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    error: '/error',
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
})
