'use client'
import { useTheme } from 'next-themes'
import { BsSun, BsMoon } from 'react-icons/bs'
export default function ThemeSwitcher() {
  const { setTheme } = useTheme()
  return (
    <div className="cursor-pointer hover:scale-[1.15] active:scale-105 transition-all h-6">
      <BsSun
        className="dark:hidden h-6"
        onClick={() => {
          setTheme('dark')
        }}
      />

      <BsMoon
        className="hidden -translate-y-[2px] dark:inline-block h-6"
        onClick={() => {
          setTheme('light')
        }}
      />
    </div>
  )
}
