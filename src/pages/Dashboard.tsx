import { useState, useEffect } from "react"
import { Flame, Dumbbell, Clock, Award, Calendar, Target, BookOpen, Apple, Check } from "lucide-react"
import { supabase } from "../lib/supabaseClient"

export default function Dashboard() {
    const [, setUser] = useState<any>(null)


    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [])

    const stats = [
        {
            title: "Calorías Quemadas",
            value: "2,869",
            target: "3,000",
            progress: 95.6,
            icon: Flame,
        },
        {
            title: "Ejercicios Completados",
            value: "24",
            target: "30",
            progress: 80,
            icon: Dumbbell,
        },
        {
            title: "Tiempo Activo",
            value: "4.2h",
            target: "5h",
            progress: 84,
            icon: Clock,
        },
        {
            title: "Logros Desbloqueados",
            value: "10",
            target: "30",
            progress: 33.3,
            icon: Award,
        },
    ]

    const quickActions = [
        {
            title: "Iniciar Entrenamiento",
            subtitle: "Comienza tu rutina de hoy",
            icon: Dumbbell,
            primary: true,
        },
        {
            title: "Registrar Comida",
            subtitle: "Añade tu última comida",
            icon: Apple,
            primary: false,
        },
        {
            title: "Crear Plan",
            subtitle: "Nuevo plan personalizado",
            icon: Target,
            primary: false,
        },
        {
            title: "Ver Biblioteca",
            subtitle: "Añade tu última comida",
            icon: BookOpen,
            primary: false,
        },
        {
            title: "Programar Rutina",
            subtitle: "Planifica tu semana",
            icon: Calendar,
            primary: false,
        },
        {
            title: "Establecer Meta",
            subtitle: "Define nuevos objetivos",
            icon: Target,
            primary: false,
        },
    ]

    const weeklyProgress = [
        { day: "Lunes", completed: true },
        { day: "Martes", completed: true },
        { day: "Miércoles", completed: true },
        { day: "Jueves", completed: false },
        { day: "Viernes", completed: false },
        { day: "Sábado", completed: false },
        { day: "Domingo", completed: false },
    ]

    return (
        <div className="space-y-6 min-h-screen p-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">¡Bienvenido de vuelta!</h1>
                <p className="text-gray-400">Aquí tienes un resumen de tu progreso y actividades recientes.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6 relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-300 text-md font-medium">{stat.title}</h3>
                            <div className="bg-[#1DB954]/10 rounded-full p-3">
                                <stat.icon className="h-6 w-6 text-[#1DB954]" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">{stat.value}</span>
                                <span className="text-gray-400 text-sm">/ {stat.target}</span>
                            </div>
                            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
                                <div
                                    className="bg-[#1DB954] h-2 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${stat.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-white mb-2">Acciones Rápidas</h2>
                            <p className="text-gray-400 text-sm">Accede rápidamente a las funciones más utilizadas</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    className={`
                                        p-6 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden
                                        ${action.primary
                                            ? "bg-[#1DB954] border-[#1DB954] hover:bg-[#1DB954] text-black shadow-lg shadow-[#1DB954]/20"
                                            : "bg-[#141414] border-[#2D2D2D] hover:border-[#1DB954]/50 hover:bg-[#1A1A1A] hover:shadow-lg hover:shadow-[#1DB954]/10"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${action.primary ? "bg-black/10" : "bg-[#2D2D2D]"}`}>
                                            <action.icon className={`h-5 w-5 ${action.primary ? "text-black" : "text-[#1DB954]"}`} />
                                        </div>
                                    </div>
                                    <h3 className={`font-semibold mb-2 text-base ${action.primary ? "text-black" : "text-white"}`}>
                                        {action.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${action.primary ? "text-black/70" : "text-gray-400"}`}>
                                        {action.subtitle}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Weekly Progress */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-white mb-2">Progreso Semanal</h2>
                            <p className="text-gray-400 text-sm">3 de 7 días completados esta semana</p>
                        </div>
                        <div className="space-y-4">
                            {weeklyProgress.map((day, index) => (
                                <div key={index} className="flex items-center justify-between group">
                                    <span className={`text-sm font-medium ${day.completed ? "text-white" : "text-gray-400"}`}>
                                        {day.day}
                                    </span>
                                    <div
                                        className={`
                                            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                            ${day.completed
                                                ? "bg-[#1DB954] text-black shadow-lg shadow-[#1DB954]/30"
                                                : "bg-[#2D2D2D] text-gray-400 group-hover:bg-[#3D3D3D]"
                                            }
                                        `}
                                    >
                                        {day.completed && <Check className="h-4 w-4" />}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-6 pt-4 border-t border-[#2D2D2D]">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Progreso total</span>
                                    <span className="text-white font-semibold text-lg">43%</span>
                                </div>
                                <div className="w-full bg-[#2D2D2D] rounded-full h-2 mt-2">
                                    <div
                                        className="bg-[#1DB954] h-2 rounded-full transition-all duration-500"
                                        style={{ width: "43%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}