import Header from '@/components/header/header'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header hideUserNav />
      {children}
    </>
  )
}
