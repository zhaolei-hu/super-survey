'use client'

import { useHeaderMenuContext, menuKeys } from '@/context/header-menu-context'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ProgressBarLink } from '../progress-bar'

export default function MainNav() {
  const t = useTranslations('Header')
  const { active } = useHeaderMenuContext()
  return (
    <nav className="flex items-center space-x-6">
      {menuKeys.map((menuKey) => (
        <ProgressBarLink
          key={menuKey}
          href={`/${menuKey}`}
          prefetch
          className={cn(
            'text-sm font-medium transition-colors text-muted-foreground hover:text-primary',
            {
              'text-primary': active === menuKey,
            },
          )}
        >
          {t(menuKey)}
        </ProgressBarLink>
      ))}
    </nav>
  )
}
