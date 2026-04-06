import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
    title: 'Anime App',
    description: 'Minimal Anime App',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="container mt-4">
                    {children}
                </div>
            </body>
        </html>
    )
}