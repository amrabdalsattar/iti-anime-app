'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import styles from '../styles/Navbar.module.css'

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
)

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
)

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useTheme()

    return (
        <nav className={`navbar navbar-expand-lg ${styles.customNavbar}`}>
            <div className="container">
                <Link className={styles.brand} href="/">
                    Anime<span>App</span>
                </Link>

                <button
                    className={`navbar-toggler ${styles.togglerBtn}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <Link className={styles.navLink} href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={styles.navLink} href="/anime">Anime</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={styles.navLink} href="/about">About</Link>
                        </li>

                        <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                            <button
                                className={styles.themeToggle}
                                onClick={toggleDarkMode}
                                aria-label="Toggle theme"
                            >
                                {darkMode ? <SunIcon /> : <MoonIcon />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar