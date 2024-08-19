'use client'
import { DatePickerWithRange } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { format, startOfMonth } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export default function Page() {
  const t = useTranslations('Overview')
  const d = useTranslations('Date')
  const formatStr = d('format')
  // search date
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })
  const onSearch = async () => {
    console.log(date)
    if (date) {
      console.log(format(date.from!, formatStr))
      console.log(format(date.to!, formatStr))
    }
  }
  return (
    <div className="flex flex-col p-10 space-y-6 w-full max-w-[1280px] mx-auto">
      {/* search box */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <div className="flex items-center space-x-4">
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            placeholder={d('placeholder')}
            formatStr={formatStr}
          />
          <Button onClick={onSearch}>{t('search')}</Button>
        </div>
      </div>
      {/* cards */}
      <div className="grid grid-cols-4 gap-x-4"></div>
      {/* charts */}
      <div className="grid grid-cols-2 gap-x-4"></div>
    </div>
  )
}
