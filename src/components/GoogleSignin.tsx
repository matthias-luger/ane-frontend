"use client"

import { User } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export default function GoogleSignin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<{ name: string; email: string; image: string } | null>(null)

    // Mock Google sign-in function
    const handleGoogleSignIn = () => {
        // In a real implementation, this would integrate with Google OAuth
        setUser({
            name: 'John Doe',
            email: 'john.doe@example.com',
            image: '/placeholder.svg?height=32&width=32'
        })
        setIsAuthenticated(true)
    }

    // Mock sign-out function
    const handleSignOut = () => {
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleGoogleSignIn} className="relative h-8 w-8 rounded-full cursor-pointer" aria-label="Sign in">
            <User className="h-5 w-5" />
        </Button>
    )
}
