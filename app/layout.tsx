import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Next.js 16 router cache repro',
  description: 'Repro for vercel/next.js#92152',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          maxWidth: 640,
          margin: '0 auto',
          padding: '2rem 1rem',
          lineHeight: 1.7,
        }}
      >
        {children}
      </body>
    </html>
  )
}
