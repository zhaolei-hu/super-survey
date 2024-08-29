'use client'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { BsBrush, BsArrowUpRight, BsArrowBarUp, BsCaretRight } from 'react-icons/bs'
import { FiBarChart } from 'react-icons/fi'
import { CiStop1 } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import { SurveyActionEnum } from '@/enums/enums'
export function SurveyItem({ handleAction }: { handleAction: (action: SurveyActionEnum) => void }) {
  const t = useTranslations('Surveys.surveyItem')
  const status = useTranslations('Surveys.status')
  const surveyActions = useMemo(() => {
    const updateAction = {
      label: t('update'),
      icon: <BsBrush />,
      action: SurveyActionEnum.UPDATE,
      disabled: false,
    }
    const dataAction = {
      label: t('data'),
      icon: <FiBarChart />,
      action: SurveyActionEnum.DATA,
      disabled: false,
    }
    const shareAction = {
      label: t('share'),
      icon: <BsArrowUpRight />,
      action: SurveyActionEnum.SHARE,
      disabled: false,
    }
    const deleteAction = {
      label: t('delete'),
      icon: <AiOutlineDelete />,
      action: SurveyActionEnum.DELETE,
      disabled: false,
    }
    const publishAction = {
      label: t('publish'),
      icon: <BsArrowBarUp />,
      action: SurveyActionEnum.PUBLISH,
      disabled: false,
    }
    const startAction = {
      label: t('start'),
      icon: <BsCaretRight />,
      action: SurveyActionEnum.START,
      disabled: false,
    }
    const stopAction = {
      label: t('stop'),
      icon: <CiStop1 />,
      action: SurveyActionEnum.STOP,
      disabled: false,
    }
    const unPublishedActions = [
      updateAction,
      { ...dataAction, disabled: true },
      { ...shareAction, disabled: true },
      deleteAction,
      publishAction,
    ]
    // const ongoingActions = [updateAction, dataAction, shareAction, deleteAction, stopAction]
    // const finishedActions = [updateAction, dataAction, shareAction, deleteAction, startAction]
    return unPublishedActions
  }, [t])
  return (
    <div className="group relative overflow-hidden w-full  px-5 py-6 pb-4 border rounded-lg">
      <div className="flex">
        <div className="flex-1 px-3 flex flex-col justify-center ellipsis">
          <span className="text-base font-medium ellipsis">这里是标题</span>
          <span className="text-[12px] text-gray-500 ellipsis">
            {t('updateAt') + ' ' + '2020/03/02 12:10:10'}
          </span>
        </div>
        <div className="w-[100px] h-[28px] rounded-[14px] bg-gray-500/5 dark:bg-gray-300/5 leading-[28px] text-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">{status('ongoing')}</span>
        </div>
      </div>
      <div className="w-full h-[60px] mt-4 grid grid-cols-3">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="text-2xl font-bold">20</span>
          <span className="text-[12px] text-gray-500">{t('views')}</span>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="text-2xl font-bold">20</span>
          <span className="text-[12px] text-gray-500">{t('submissions')}</span>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="text-2xl font-bold">20</span>
          <span className="text-[12px] text-gray-500">{t('today_submissions')}</span>
        </div>
      </div>
      <div className="my-2 w-full h-[1px] bg-gray-500/5"></div>
      <div className="flex justify-between items-center space-x-1">
        {surveyActions.map((item) => (
          <TooltipProvider key={item.action}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    handleAction(item.action)
                  }}
                  disabled={item.disabled}
                  variant="ghost"
                >
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}
