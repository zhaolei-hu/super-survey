'use client'

import { useTranslations } from 'next-intl'
import Logo from '../logo'
import MainNav from './main-nav'

export default function HeaderLeft() {
  const t = useTranslations('Header')
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 mr-3">
        <Logo />
      </div>
      <span className="text-lg font-bold mr-12">{t('title')}</span>
      <MainNav />
    </div>
  )
}
