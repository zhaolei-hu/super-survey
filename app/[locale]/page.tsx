import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Authentication from './_components/authentication'

export default function Page() {
  const t = useTranslations('Home')
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <Header isHome />
      <div className="flex-grow min-h-[560px] w-2/3 flex items-center">
        <Authentication />
      </div>
    </main>
  )
}
