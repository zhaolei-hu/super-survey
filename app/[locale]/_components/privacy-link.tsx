'use client'

import { useToast } from '@/components/ui/use-toast'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

export default function PrivacyLink() {
  const { toast } = useToast()
  const t = useTranslations('Auth')
  return (
    <Link
      href=""
      className="underline underline-offset-4 hover:text-primary"
      onClick={() => {
        toast({
          description: t('privacy_notice'),
          duration: 2000,
        })
      }}
    >
      {t('privacy')}
    </Link>
  )
}
