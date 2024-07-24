import Logo from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { useLocale, useTranslations } from 'next-intl'
import PrivacyLink from './privacy-link'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import AuthForm from './auth-form'

export default function Authentication() {
  const activeLocale = useLocale()
  const t = useTranslations('Auth')
  return (
    <div className="container relative h-4/5 grid grid-cols-2 items-center rounded-[0.5rem] border px-0 overflow-hidden">
      <Link
        href={`/${activeLocale}/overview`}
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4')}
      >
        {t('enter')}
      </Link>
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
      <div className="w-full p-6 box-border flex justify-center">
        <div className="flex flex-col justify-center space-y-6 w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{t('create_account')}</h1>
            <p className="text-sm text-muted-foreground">{t('create_account_msg')}</p>
          </div>
          <AuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t('statement')}
            <PrivacyLink />
          </p>
        </div>
      </div>
    </div>
  )
}
