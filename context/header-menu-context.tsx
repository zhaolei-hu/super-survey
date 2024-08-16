'use client'

import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type HeaderMenuContexxtProviderProps = {
  children: React.ReactNode
}
type HeaderMenuContextType = {
  active: string
  setActive: Dispatch<SetStateAction<string>>
}
const menuKeys = ['overview', 'surveys', 'settings']
const HeaderMenuContext = createContext<HeaderMenuContextType | null>(null)
const HeaderMenuContextProvider = ({ children }: HeaderMenuContexxtProviderProps) => {
  const [active, setActive] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    let key = ''
    for (let i = 0; i < menuKeys.length; i++) {
      const reg = new RegExp(`\/${menuKeys[i]}`)
      if (reg.test(pathname)) {
        key = menuKeys[i]
        break
      }
    }
    setActive(key)
  }, [pathname])
  return (
    <HeaderMenuContext.Provider value={{ active, setActive }}>
      {children}
    </HeaderMenuContext.Provider>
  )
}
const useHeaderMenuContext = () => {
  const context = useContext(HeaderMenuContext)
  if (!context) {
    throw new Error('useHeaderAction must be used within a HeaderActionContextProvider')
  }
  return context
}

export { menuKeys, HeaderMenuContextProvider, useHeaderMenuContext }
