'use client'

import { useHeaderMenuContext, menuKeys } from '@/context/header-menu-context'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

export default function MainNav() {
  const t = useTranslations('Header')
  const { active } = useHeaderMenuContext()
  return (
    <nav className="flex items-center space-x-6">
      {menuKeys.map((menuKey) => (
        <Link
          key={menuKey}
          href={`/${menuKey}`}
          className={cn(
            'text-sm font-medium transition-colors text-muted-foreground hover:text-primary',
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
