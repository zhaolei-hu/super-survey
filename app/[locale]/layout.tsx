import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'

type Props = {
  params: { locale: string }
  searchParams: unknown
}
export function generateMetadata({ params }: Props) {
  if (params.locale === 'zh') {
    return {
      title: '超级问卷',
      description: '超级问卷...',
    }
  }
  return {
    title: 'Super Survey',
    description: 'Super Survey...',
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/icon.ico" />
      </head>
      <body className={cn('min-h-screen  font-sans antialiased', fontSans.variable)}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
