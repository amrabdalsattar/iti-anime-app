'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
    darkMode: false,
    toggleDarkMode: () => { },
})

function getInitialDarkMode() {
    if (typeof window === 'undefined') return false
    try {
        return JSON.parse(localStorage.getItem('darkMode') ?? 'false')
    } catch {
        return false
    }
}

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(getInitialDarkMode)

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode(prev => !prev)

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}