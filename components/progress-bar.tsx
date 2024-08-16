'use client'

import { useProgressBar } from '@/context/progress-bar-context'
import { Link, useRouter } from '@/navigation'
import { ComponentProps, startTransition } from 'react'
export function ProgressBarLink({ href, children, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter()
  const { start, done } = useProgressBar()
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    start()
    startTransition(() => {
      router.push(href.toString())
      done()
    })
  }
  return (
    <Link href={href} onClick={handleLinkClick} {...rest}>
      {children}
    </Link>
  )
}
export function useProgressRouter() {
  const router = useRouter()
  const { start, done } = useProgressBar()
  const processRouter: ReturnType<typeof useRouter> = {
    push: (...rest) => {
      start()
      startTransition(() => {
        done()
        router.push(...rest)
      })
    },
    replace: (...rest) => {
      start()
      startTransition(() => {
        done()
        router.replace(...rest)
      })
    },
    prefetch: (...rest) => router.prefetch(...rest),
    back: () => {
      start()
      startTransition(() => {
        done()
        router.back()
      })
    },
    forward: () => {
      start()
      startTransition(() => {
        done()
        router.forward()
      })
    },
    refresh: () => {
      start()
      startTransition(() => {
        done()
        router.refresh()
      })
    },
  }
  return processRouter
}
