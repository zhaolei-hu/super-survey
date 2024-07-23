'use client'
import { useLocale, useTranslations } from 'next-intl'
import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'
import Logo from './logo'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
export default function Header() {
  const t = useTranslations('Main')
  const activeLocale = useLocale()
  const pathname = usePathname()
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
        <div className="flex items-center">
          {!isAuthPage ? (
            <>
              <div className="w-7 h-7 mr-3">
                <Logo />
              </div>
              <span className="text-2xl font-bold">{t('title')}</span>
            </>
          ) : null}
        </div>
        <div className="flex space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
