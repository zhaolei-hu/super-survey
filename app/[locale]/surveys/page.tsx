import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('Surveys')
  return (
    <div className="flex flex-col p-10 space-y-6 w-full max-w-[1280px] mx-auto">
      {/* search box */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
      </div>
    </div>
  )
}
