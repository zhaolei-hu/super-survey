'use client'

import { useTranslations } from 'next-intl'
import Logo from '../logo'
import MainNav from './main-nav'

export default function HeaderLeft() {
  const t = useTranslations('Header')
  return (
    <div className="flex items-center">
      <div className="w-7 h-7 mr-3">
        <Logo />
      </div>
      <span className="text-2xl font-bold mr-12">{t('title')}</span>
      <MainNav />
    </div>
  )
}
