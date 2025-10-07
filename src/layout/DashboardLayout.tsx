import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { Home, Dumbbell, BookOpen, Apple, TrendingUp, User, Award, Bell, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Biblioteca de Ejercicios", href: "/dashboard/exercise-library", icon: BookOpen },
    { name: "Planes de Ejercicio", href: "/dashboard/exercise-plans", icon: Dumbbell },
    { name: "Nutrición", href: "/dashboard/nutrition", icon: Apple },
    { name: "Progreso", href: "/dashboard/progress", icon: TrendingUp },
    { name: "Perfil", href: "/dashboard/profile", icon: User },
    { name: "Logros", href: "/dashboard/achievements", icon: Award },
    { name: "Notificaciones", href: "/dashboard/notifications", icon: Bell },
    { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout() {
    const [menuExpanded, setMenuExpanded] = useState<boolean>(() => {
        const saved = localStorage.getItem("menuExpanded")
        return saved ? JSON.parse(saved) : true
    })
    const location = useLocation()
    const navigate = useNavigate()

    const { user, loading, signOut } = useAuth()

    const toggleMenu = () => {
        setMenuExpanded(prev => {
            localStorage.setItem("menuExpanded", JSON.stringify(!prev))
            return !prev
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-[#FAFAFA]">Cargando...</div>
            </div>
        )
    }

    if (!user) {
        navigate("/login")
        return null
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
            <header
                className={`sticky top-4 z-40 mx-auto rounded-full bg-[#0A0A0A] border border-[#2B2B2B]
          transition-[max-width,opacity,padding] duration-500 flex items-center h-16 px-4`}
                style={{ minHeight: "56px" }}
            >
                <button
                    onClick={toggleMenu}
                    aria-expanded={menuExpanded}
                    aria-label={menuExpanded ? "Contraer menú" : "Expandir menú"}
                    className="flex items-center justify-center p-2 text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] rounded-full transition-colors"
                >
                    {menuExpanded ? (
                        <ChevronLeft className="h-5 w-5" />
                    ) : (
                        <ChevronRight className="h-5 w-5" />
                    )}
                </button>

                <div className="flex items-center gap-2 ml-2">
                    <span className="text-lg font-bold text-[#FAFAFA]">
                        FitLife
                    </span>
                </div>

                <nav className="flex-1 flex items-center gap-2 justify-center ml-4">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center rounded-full text-sm font-medium transition-colors whitespace-nowrap
                                ${menuExpanded ? "gap-2 px-3 py-2" : "justify-center h-10 w-10"}
                                ${isActive
                                        ? "bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/20"
                                        : "text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A]"}
                                `}
                            >
                                <Icon className="h-4 w-4" />
                                {menuExpanded && (
                                    <span className="hidden md:inline">{item.name}</span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <button
                    onClick={signOut}
                    className={`flex items-center justify-center 
        ${menuExpanded ? "gap-2 px-3 py-2" : "px-3 py-2"} 
        text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 
        rounded-full transition-all duration-500 ease-in-out`}
                >
                    <LogOut className="h-4 w-4" />
                    {menuExpanded && (
                        <span className="hidden md:inline">Salir</span>
                    )}
                </button>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}