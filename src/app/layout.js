import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
    title: 'Otacku',
    description: 'Minimal Anime App',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <div className="app-wrapper">
                        <Navbar />

                        <main>
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}