'use client'
import { TiArrowLeft } from 'react-icons/ti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function NotFound() {
  return (
    <html>
      <body>
        <div className="py-16 pl-10 flex flex-col space-y-4">
          <span className="text-purple-500 font-medium text-base">404</span>
          <span className="text-2xl font-bold">Page not found</span>
          <span className="text-sm font-normal">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </span>
          <Button
            variant="ghost"
            className="text-purple-500 font-medium text-base hover:text-purple-500 w-[160px]"
          >
            <TiArrowLeft className="w-5 h-5 mr-2" />
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </body>
    </html>
  )
}
