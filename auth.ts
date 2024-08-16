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
      // 在resend主页配置domain的地址要放到这里的from这里，不然不会从验证过的domain发送邮件
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
