'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const localeActive = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const onChangeLanguage = () => {
    const nextLocale = localeActive === 'en' ? 'zh' : 'en'
    const newPath = pathname.replace(/^\/(en|zh)/, `/${nextLocale}/`)
    router.replace(newPath, {
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
