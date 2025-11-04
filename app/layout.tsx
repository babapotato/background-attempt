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
    <html lang="en" className="h-full w-full">
      <body className={`${inter.className} h-full w-full m-0 p-0 bg-black`}>{children}</body>
    </html>
  )
}

