'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { locales } from '@/messages/config'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export default function SidebarNav() {
  const t = useTranslations('UserNav')
  const pathname = usePathname()
  const reg = RegExp(`/(${locales.join('|')})`)
  const noLocalePathName = pathname.replace(reg, '')
  const sidebarNavItems = [
    {
      title: t('profile'),
      href: '/settings',
    },
    {
      title: t('account'),
      href: '/settings/account',
    },
  ]
  return (
    <div className="flex flex-col space-y-1">
      {sidebarNavItems.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            noLocalePathName === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}
