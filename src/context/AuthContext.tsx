import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, getCurrentUser, signOut as supabaseSignOut } from '../lib/supabaseClient'
import { useNavigate, useLocation } from 'react-router-dom'

interface AuthContextType {
    user: any | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
            setLoading(false)
        }

        fetchUser()

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user || null)
                setLoading(false)


                const protectedRoutes = ['/dashboard', '/dashboard/exercise-library']
                const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route))

                if (event === 'SIGNED_OUT' && isProtectedRoute) {
                    navigate('/login')
                }
                if (event === 'SIGNED_IN' && (location.pathname === '/login' || location.pathname === '/register')) {
                    navigate('/dashboard')
                }
            }
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [navigate, location.pathname])

    const signOut = async () => {
        await supabaseSignOut()
        setUser(null)
        navigate('/login')
    }

    const value = {
        user,
        loading,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
