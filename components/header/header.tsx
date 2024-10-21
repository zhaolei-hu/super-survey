'use client'
import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import UserNav from './user-nav'
import { useSession } from 'next-auth/react'

export default function Header({
  children,
  hideUserNav,
}: {
  children?: React.ReactNode
  hideUserNav?: boolean
}) {
  const pathname = usePathname()
  const session = useSession()
  const isFeedbackOrCreatePage = useMemo(() => {
    return pathname.includes('/feedback') || pathname.includes('/surveys/create')
  }, [pathname])
  return (
    <header className="w-full sticky top-0 bg-background z-10">
      <div className="w-full h-14 flex box-border items-center justify-between px-8 border-b">
        {/* <HeaderLeft /> */}
        {children ?? <div></div>}
        {/* HeaderRight */}
        <div className="flex items-center space-x-4">
          {!hideUserNav && session.data && session.data.user && <UserNav />}
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
