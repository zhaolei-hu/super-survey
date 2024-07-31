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
import { useRouter } from '@/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
export default function UserNav() {
  const router = useRouter()
  const session = useSession()
  const t = useTranslations('UserNav')
  const handleLogOut = async () => {
    await signOut()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session.data && session.data.user && session.data.user.image ? (
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage src={session.data?.user?.image ?? ''} alt="@shadcn" />
            <AvatarFallback>{session.data?.user?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="cursor-pointer w-8 h-8 bg-zinc-900 text-white rounded-full flex justify-center items-center">
            <span className="font-medium text-sm">
              {session.data?.user?.name?.slice(0, 1) ?? session.data?.user?.email?.slice(0, 1)}
            </span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
            onClick={() => {
              router.push(`/settings`)
            }}
          >
            {t('profile')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/settings/account`)
            }}
          >
            {t('account')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>{t('sign_out')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
