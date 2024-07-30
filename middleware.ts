import createMiddleware from 'next-intl/middleware'
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './messages/config'
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
})
const authMiddleware = auth((req) => {
  console.log('auth:', req.auth)
  // req.auth:
  // {
  //   user: {
  //     name: '',
  //     email: '',
  //     image: ''
  //   },
  //   expires: ''
  // }
  if (req.auth) {
    return intlMiddleware(req)
  }
  // redirect auth page
  return NextResponse.redirect(new URL(req.nextUrl.origin))
})
// not need auth
const publicPages = ['/', '/error']
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}
export const config = {
  // Match only internationalized pathnames
  // default: '/', '/(zh|en)/:path*',
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
