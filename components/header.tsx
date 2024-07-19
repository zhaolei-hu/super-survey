import { useTranslations } from 'next-intl'
import ThemeSwitcher from './theme-switcher'
import LanguageSwitcher from './language-switcher'
import Logo from './logo'
type HeaderProps = {
  isHome: boolean
}
export default function Header({ isHome }: HeaderProps) {
  const t = useTranslations('Home')
  return (
    <header className="w-full">
      <div className="w-full  h-14 flex box-border items-center justify-between px-8">
        <div className="flex items-center">
          {!isHome ? (
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
