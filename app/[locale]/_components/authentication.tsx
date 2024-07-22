import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function Authentication() {
  const t = useTranslations('Home')
  return (
    <div className="container relative h-4/5 grid grid-cols-2 items-center rounded-[0.5rem] border px-0 overflow-hidden">
      <Button variant="ghost" className="absolute right-6 top-6">
        {t('login')}
      </Button>
      <div className="w-full h-full bg-zinc-900 p-10 dark:border-r text-white flex flex-col justify-between">
        <div className="flex items-center font-medium">
          <div className="w-6 h-6 mr-3">
            <Logo />
          </div>
          <span className="text-lg">{t('title')}</span>
        </div>
        <div className="mt-auto">
          <span className="text-lg">{t('desc')}</span>
        </div>
      </div>
      <div className="w-full h-[300px] bg-red-300"></div>
    </div>
  )
}
