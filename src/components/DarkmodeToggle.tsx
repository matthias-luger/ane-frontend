"use client"

import { Sun, Moon } from 'lucide-react'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'

export default function DarkmodeToggle() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                setDarkMode(!darkMode)
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    )
}
