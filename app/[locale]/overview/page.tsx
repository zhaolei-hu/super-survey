import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('Overview')
  return (
    <div className="flex flex-col p-10 space-y-6 w-full max-w-[1280px] mx-auto">
      {/* search box */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
      </div>
      {/* cards */}
      <div className="grid grid-cols-4 gap-x-4"></div>
      {/* charts */}
      <div className="grid grid-cols-2 gap-x-4"></div>
    </div>
  )
}
