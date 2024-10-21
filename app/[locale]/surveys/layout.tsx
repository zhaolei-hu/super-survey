import Header from '@/components/header/header'
import HeaderLeft from '@/components/header/header-left'
import { auth } from '@/auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <>
      <Header>{(session && session.user && <HeaderLeft />) ?? null}</Header>
      {children}
    </>
  )
}
