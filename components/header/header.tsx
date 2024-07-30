'use client'
import { useLocale } from 'next-intl'
import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import HeaderLeft from './header-left'
import UserNav from './user-nav'
import { useSession } from 'next-auth/react'

export default function Header() {
  const activeLocale = useLocale()
  const pathname = usePathname()
  const session = useSession()
  const isAuthPage = useMemo(() => {
    const pathArr = pathname.split(activeLocale)
    if (pathArr.length > 1 && pathArr[1].startsWith('/')) {
      return false
    }
    return true
  }, [activeLocale, pathname])
  return (
    <header className="w-full sticky top-0 bg-background z-10">
      <div className="w-full  h-14 flex box-border items-center justify-between px-8">
        {!isAuthPage && session.data && session.data.user ? <HeaderLeft /> : <div></div>}
        {/* <HeaderLeft /> */}
        <div className="flex items-center space-x-4">
          {session.data && session.data.user && <UserNav />}
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
