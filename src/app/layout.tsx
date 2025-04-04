import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Ane',
    description: 'Ane'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="dark">
                <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                    <div className="container mx-auto py-6 px-4 max-w-6xl">{children}</div>
                </div>
            </body>
        </html>
    )
}
