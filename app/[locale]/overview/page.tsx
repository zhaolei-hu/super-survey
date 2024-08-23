'use client'
import { DatePickerWithRange } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { startOfMonth } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { StatisticsCard, StatisticsItem } from './_components/statistics-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SurveyRecords } from './_components/records'
import { SurveysStatisticsChart } from './_components/surveys-statistics-chart'

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
    // console.log(date)
    if (date) {
      // console.log(format(date.from!, formatStr))
      // console.log(format(date.to!, formatStr))
    }
  }
  const surveyStatistics: StatisticsItem[] = [
    {
      title: t('cards.surveys'),
      count: 200,
    },
    {
      title: t('cards.ongoing_surveys'),
      count: 200,
    },
    {
      title: t('cards.views'),
      count: 200,
    },
    {
      title: t('cards.submissions'),
      count: 200,
    },
  ]
  return (
    <div className="grid grid-rows-[minmax(0,_1fr)_minmax(0,_1.5fr)_minmax(0,_4fr)] gap-y-6 p-10 h-[calc(100vh-3.5rem)] w-full max-w-[1280px] mx-auto">
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
      <div className="grid grid-cols-4 gap-x-4">
        {surveyStatistics.map((item, index) => {
          return <StatisticsCard item={item} key={index} />
        })}
      </div>
      {/* charts */}
      <div className="grid grid-cols-2 gap-x-4 w-full h-full">
        <Card className="flex flex-col w-full h-full overflow-hidden">
          <CardHeader>
            <CardTitle>
              <span>{t('chart')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pl-1 h-[calc(100%-72px)]">
            <SurveysStatisticsChart />
          </CardContent>
        </Card>
        <Card className="flex flex-col w-full h-full overflow-hidden">
          <CardHeader>
            <CardTitle>
              <span>{t('record')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-72px)]">
            <SurveyRecords />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
