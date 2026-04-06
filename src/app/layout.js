import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import BootstrapLoader from '@/components/BootstrapLoader'

export const metadata = {
    title: 'Otaku',
    description: 'Minimal Anime App',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <BootstrapLoader />
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