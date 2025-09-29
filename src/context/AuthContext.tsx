// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getCurrentUser, signOut as supabaseSignOut } from '../lib/supabaseClient'; // Importa tus funciones
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation

interface AuthContextType {
    user: any | null; // Puedes tipar mejor 'user' con el tipo de usuario de Supabase
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); // Para saber la ruta actual

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };

        fetchUser();

        // Escuchar cambios en el estado de autenticación de Supabase
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user || null);
                setLoading(false);

                // Redirigir si el usuario se desautentica y está en una ruta protegida
                const protectedRoutes = ['/dashboard', '/dashboard/exercise-library', /* ...otras rutas protegidas */];
                const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

                if (event === 'SIGNED_OUT' && isProtectedRoute) {
                    navigate('/login');
                }
                // Redirigir si el usuario se autentica y está en login/register
                if (event === 'SIGNED_IN' && (location.pathname === '/login' || location.pathname === '/register')) {
                    navigate('/dashboard'); // O la página principal
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate, location.pathname]); // Añade location.pathname a las dependencias

    const signOut = async () => {
        await supabaseSignOut();
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
