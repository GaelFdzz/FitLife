import { useState, useEffect } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { Home, Dumbbell, BookOpen, Apple, TrendingUp, User, Award, Bell, Settings, LogOut, Menu, X } from "lucide-react"
import { supabase } from "../lib/supabaseClient"

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
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        navigate("/login")
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-[#FAFAFA]">Cargando...</div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-[#0A0A0A] flex overflow-hidden">
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <div
                className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-[#404040] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
            >
                <div className="flex items-center gap-3 p-6">
                    <div className="bg-[#1DB954] rounded-full p-2">
                        <Dumbbell className="h-6 w-6 text-[#0A0A0A]" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-[#FAFAFA]">FitLife</span>
                        <p className="text-xs text-[#A3A3A3]">Sistema de bienestar</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                        ? "bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/20"
                                        : "text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A]"
                                    }
                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-[#404040]">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-3 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-[#0A0A0A] border-b border-[#404040] px-4 py-4 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] rounded-lg transition-colors"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>

            {sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-[#1A1A1A] text-[#FAFAFA] rounded-lg border border-[#404040]"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
        </div>
    )
}
