'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { getUser, logout } from '@/lib/auth'
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
    const router = useRouter()
    const { darkMode, toggleDarkMode } = useTheme()
    const [user, setUser] = useState(null)

    const checkAuth = () => {
        setUser(getUser())
    }

    useEffect(() => {
        checkAuth()
        window.addEventListener('auth_changed', checkAuth)
        return () => window.removeEventListener('auth_changed', checkAuth)
    }, [])

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <nav className={`navbar navbar-expand-lg ${styles.customNavbar}`}>
            <div className="container">
                <Link className={styles.brand} href="/">
                    Ota<span>ku</span>
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

                        {user ? (
                            <>
                                <li className="nav-item ms-lg-3">
                                    <span className="nav-link text-secondary" style={{ fontSize: '0.9rem' }}>
                                        {user.email} {user.role === 'admin' ? `(Admin)` : ''}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button className={`btn btn-link ${styles.navLink}`} onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item ms-lg-2">
                                    <Link className={styles.navLink} href="/login">Login</Link>
                                </li>
                                <li className="nav-item ms-lg-2">
                                    <Link className={`btn text-white px-3 py-2 ms-lg-2 rounded-3`} style={{ background: 'var(--accent)', fontWeight: '600' }} href="/register">Register</Link>
                                </li>
                            </>
                        )}

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