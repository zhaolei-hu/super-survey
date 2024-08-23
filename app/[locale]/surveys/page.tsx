'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function Page() {
  const t = useTranslations('Surveys')
  const [status, setStatus] = useState('all')
  const handleSelectValueChange = (value: string) => {
    setStatus(value)
    // load new
  }
  return (
    <div className="flex flex-col p-10 space-y-6 w-full max-w-[1280px] mx-auto">
      {/* search box */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <Select value={status} onValueChange={handleSelectValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('status.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('status.all')}</SelectItem>
            <SelectItem value="unPublished">{t('status.unpublish')}</SelectItem>
            <SelectItem value="ongoing">{t('status.ongoing')}</SelectItem>
            <SelectItem value="finished">{t('status.finish')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
