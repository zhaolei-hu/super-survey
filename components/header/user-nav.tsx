'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProgressBarLink } from '@/components/progress-bar'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
export default function UserNav() {
  const session = useSession()
  const [open, setOpen] = useState(false)
  const t = useTranslations('UserNav')
  const handleLogOut = async () => {
    setOpen(false)
    await signOut()
  }
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger
        asChild
        onClick={() => {
          setOpen(true)
        }}
      >
        {session.data && session.data.user && session.data.user.image ? (
          <Avatar className="w-6 h-6 cursor-pointer">
            <AvatarImage src={session.data?.user?.image ?? ''} alt="@shadcn" />
            <AvatarFallback>{session.data?.user?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="cursor-pointer w-6 h-6 bg-zinc-900 text-white rounded-full flex justify-center items-center">
            <span className="font-medium text-sm">
              {session.data?.user?.name?.slice(0, 1) ?? session.data?.user?.email?.slice(0, 1)}
            </span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.data?.user?.name ?? '-'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user?.email ?? '-'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-sm p-0"
            onClick={() => {
              setOpen(false)
            }}
          >
            <ProgressBarLink href="/settings" className="w-full h-full px-2 py-1.5">
              {t('profile')}
            </ProgressBarLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm  p-0"
            onClick={() => {
              setOpen(false)
            }}
          >
            <ProgressBarLink href="/settings/account" className="w-full h-full px-2 py-1.5">
              {t('account')}
            </ProgressBarLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm cursor-pointer" onClick={handleLogOut}>
          {t('sign_out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
