import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('Settings.Account')
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{t('desc')}</p>
      </div>
      <Separator />
      <div>
        <p className="text-sm text-muted-foreground">{t('nothing')}</p>
      </div>
    </div>
  )
}
