'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'
import { FaSpinner, FaGithub } from 'react-icons/fa'
export default function AuthForm() {
  const t = useTranslations('Auth')
  const [isLoading, setIsLoading] = useState(false)
  // email
  const [email, setEmail] = useState('')
  const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const signInByEmail = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  return (
    <div className="grid gap-6">
      {/* sign in by email */}
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={emailChange}
            />
          </div>
          <Button onClick={signInByEmail} disabled={isLoading}>
            {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            {t('sign_in')}
          </Button>
        </div>
      </form>
      {/* continue with */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t('other_way')}</span>
        </div>
      </div>
      {/* github */}
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGithub className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button>
    </div>
  )
}
