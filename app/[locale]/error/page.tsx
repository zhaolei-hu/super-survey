'use client'
import { TiArrowLeft } from 'react-icons/ti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Verification = 'Verification',
  Default = 'Default',
}
export default function Page() {
  const t = useTranslations('Error')
  const searchParams = useSearchParams()
  const errorType = searchParams.get('error') as Error
  return (
    <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
      <div className="flex flex-col space-y-4 items-center">
        <span className="text-2xl font-bold">{t('title')}</span>
        <span className="text-base">
          {t('code')}&nbsp;
          <span className="text-purple-500 font-medium">{errorType}</span>
        </span>
        <Button
          variant="ghost"
          className="text-purple-500 font-medium text-base hover:text-purple-500 w-[160px]"
        >
          <TiArrowLeft className="w-5 h-5 mr-2" />
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
