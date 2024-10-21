import { Separator } from '@/components/ui/separator'
import SidebarNav from './_components/sidebar-nav'
import Header from '@/components/header/header'
import HeaderLeft from '@/components/header/header-left'
import { auth } from '@/auth'
import { getTranslations } from 'next-intl/server'
export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const t = await getTranslations('Settings')
  return (
    <>
      <Header>{(session && session.user && <HeaderLeft />) ?? null}</Header>
      <div className="w-full p-10 max-w-[1280px] mx-auto">
        <div className="w-full flex flex-col space-y-0.5">
          <span className="text-2xl font-bold tracking-tight">{t('title')}</span>
          <span className="text-base text-muted-foreground">{t('desc')}</span>
        </div>
        <Separator className="my-6" />
        <div className="flex space-x-12">
          <aside className="w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
