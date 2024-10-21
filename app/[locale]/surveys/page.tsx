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
import { SurveyItem } from './_components/survey-item'
import { SurveyActionEnum } from '@/enums/enums'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { buttonVariants } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'

export default function Page() {
  const { toast } = useToast()
  const t = useTranslations('Surveys')
  const [status, setStatus] = useState('all')
  const handleSelectValueChange = (value: string) => {
    setStatus(value)
    // load new
  }
  // action
  const handleAction = (action: SurveyActionEnum) => {
    switch (action) {
      case SurveyActionEnum.UPDATE:
        break
      case SurveyActionEnum.DATA:
        break
      case SurveyActionEnum.PUBLISH:
        break
      case SurveyActionEnum.DELETE:
        toast({
          variant: 'destructive',
          title: t('deleteNotice.title'),
          description: t('deleteNotice.desc'),
          action: <ToastAction altText="delete">{t('deleteNotice.action')}</ToastAction>,
        })
        break
      case SurveyActionEnum.SHARE:
        break
      case SurveyActionEnum.START:
        break
      case SurveyActionEnum.STOP:
        break
    }
  }
  const cards = new Array(30).fill(1)
  return (
    <div className="flex flex-col p-10 space-y-10 w-full max-w-[1280px] mx-auto">
      {/* search box */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <div className="flex items-center space-x-4">
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
          <Link href="/surveys-create" target="_blank" prefetch className={cn(buttonVariants())}>
            <FiPlus className="w-4 h-4 mr-2" />
            {t('create')}
          </Link>
        </div>
      </div>
      {/* cards */}
      <div className="grid grid-cols-3 gap-4">
        {cards.map((_, index) => (
          <SurveyItem
            key={index}
            handleAction={(action: SurveyActionEnum) => {
              handleAction(action /** , 数据id */)
            }}
          />
        ))}
      </div>
    </div>
  )
}
