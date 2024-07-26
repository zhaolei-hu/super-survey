'use client'
import { usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'

export default function LanguageSwitcher() {
  const localeActive = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const onChangeLanguage = () => {
    const nextLocale = localeActive === 'en' ? 'zh' : 'en'
    router.replace(pathname, {
      locale: nextLocale,
      scroll: false,
    })
  }
  return (
    <span
      className="text-sm hover:scale-[1.15] active:scale-105 transition-all cursor-pointer h-6 leading-6"
      onClick={onChangeLanguage}
    >
      {localeActive === 'en' ? 'EN' : 'ZH'}
    </span>
  )
}
