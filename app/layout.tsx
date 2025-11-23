import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Waves Background",
  description: "Interactive waves background component",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full w-full" style={{ height: '100dvh' }}>
      <body className={`${inter.className} h-full w-full m-0 p-0`} style={{ minHeight: '100dvh', backgroundColor: '#0000ff' }}>{children}</body>
    </html>
  )
}

