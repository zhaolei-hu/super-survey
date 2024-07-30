import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    error: '/en/error',
  },
  callbacks: {
    jwt({ token, user }) {
      // 只有执行signIn的这一次调用能获取到user.id
      // 将id保存到token
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      // 将在jwt中保存到token上的id，保存到session上
      session.user.id = token.id as string
      return session
    },
  },
})
