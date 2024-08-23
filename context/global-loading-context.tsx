'use client'

import { useTranslations } from 'next-intl'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
type GlobalLoadingContextType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}
const GlobalLoadingContext = createContext<GlobalLoadingContextType | null>(null)
export function GlobalLoadingContextProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const t = useTranslations('GlobalLoading')
  return (
    <GlobalLoadingContext.Provider value={{ visible, setVisible }}>
      {visible && (
        <div className="fixed w-screen h-screen left-0 top-0 bg-black/80 inset-0 z-50 flex flex-col justify-center items-center space-y-4">
          <AiOutlineLoading3Quarters className="text-white animate-spin" />
          <span className="text-white">{t('desc')}</span>
        </div>
      )}
      {children}
    </GlobalLoadingContext.Provider>
  )
}

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext)
  if (!context) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingContextProvider')
  }
  return context
}
