import React from 'react'
import './styles.css'

export const metadata = {
  title: { default: 'Furt někde', template: '%s · Furt někde' },
  description: 'Praktická pomoc pro rodiče, kteří chtějí cestovat s malými dětmi.',
  robots: { index: false, follow: false },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
