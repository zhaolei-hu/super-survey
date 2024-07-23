'use client'

import { useHeaderMenuContext, menuKeys } from '@/context/header-menu-context'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function MainNav() {
  const t = useTranslations('Header')
  const activeLocale = useLocale()
  const { active } = useHeaderMenuContext()
  return (
    <nav className="flex items-center space-x-6">
      {menuKeys.map((menuKey) => (
        <Link
          key={menuKey}
          href={`/${activeLocale}/${menuKey}`}
          className={cn(
            'text-base font-medium transition-colors text-muted-foreground hover:text-primary',
            {
              'text-primary': active === menuKey,
            },
          )}
        >
          {t(menuKey)}
        </Link>
      ))}
    </nav>
  )
}
