import { useEffect, useState } from "react"
import { User, Activity, Settings, Trophy, Target, Save, Camera, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "react-toastify";
import { getCurrentUser, supabase } from "../lib/supabaseClient";

// Personal Info Component
function PersonalInfo({ user, onUpdate }: { user: any; onUpdate: (data: any) => void }) {
    const [formData, setFormData] = useState(user)
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onUpdate(formData)
        setIsEditing(false)
    }

    return (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Información Personal</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-[#1DB954] hover:text-[#1DB954]/80 transition-colors"
                    >
                        Editar
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1DB954] to-[#1DB954] flex items-center justify-center text-3xl font-bold text-[#0A0A0A]">
                            {formData.name.charAt(0)}
                        </div>
                        {isEditing && (
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 bg-[#1DB954] rounded-full p-2 hover:bg-[#1DB954]/80 transition-colors"
                            >
                                <Camera className="h-4 w-4 text-[#0A0A0A]" />
                            </button>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">{formData.name}</h3>
                        <p className="text-sm text-gray-400">{formData.email}</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Correo electrónico
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg pl-10 pr-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Teléfono
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg pl-10 pr-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Edad
                        </label>
                        <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Ubicación
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                disabled={!isEditing}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg pl-10 pr-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Género
                        </label>
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        >
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-gradient-to-r from-[#1DB954] to-[#10B981] text-[#0A0A0A] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            <Save className="h-4 w-4" />
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setFormData(user)
                                setIsEditing(false)
                            }}
                            className="bg-[#2D2D2D] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#3D3D3D] transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}

// Fitness Metrics Component
function FitnessMetrics({ metrics, onUpdate }: { metrics: any; onUpdate: (data: any) => void }) {
    const [formData, setFormData] = useState(metrics)
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onUpdate(formData)
        setIsEditing(false)
    }

    const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(1)

    return (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Métricas de Fitness</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-sm text-[#1DB954] hover:text-[#1DB954]/80 transition-colors"
                    >
                        Editar
                    </button>
                )}
            </div>

            {/* BMI Card */}
            <div className="bg-gradient-to-br from-[#1DB954]/20 to-[#1DB954]/5 rounded-xl p-6 mb-6">
                <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">Índice de Masa Corporal (IMC)</p>
                    <p className="text-4xl font-bold text-white mb-2">{bmi}</p>
                    <span className="inline-block bg-[#1DB954] text-[#0A0A0A] px-3 py-1 rounded-full text-xs font-medium">
                        Peso normal
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Peso actual (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Altura (cm)
                        </label>
                        <input
                            type="number"
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Peso objetivo (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.targetWeight}
                            onChange={(e) => setFormData({ ...formData, targetWeight: parseFloat(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Grasa corporal (%)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.bodyFat}
                            onChange={(e) => setFormData({ ...formData, bodyFat: parseFloat(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Objetivo principal
                        </label>
                        <select
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        >
                            <option value="weight-loss">Pérdida de peso</option>
                            <option value="muscle-gain">Ganancia muscular</option>
                            <option value="maintenance">Mantenimiento</option>
                            <option value="endurance">Resistencia</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Nivel de actividad
                        </label>
                        <select
                            value={formData.activityLevel}
                            onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none disabled:opacity-50"
                        >
                            <option value="sedentary">Sedentario</option>
                            <option value="light">Ligero</option>
                            <option value="moderate">Moderado</option>
                            <option value="active">Activo</option>
                            <option value="very-active">Muy activo</option>
                        </select>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-gradient-to-r from-[#1DB954] to-[#10B981] text-[#0A0A0A] px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            <Save className="h-4 w-4" />
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setFormData(metrics)
                                setIsEditing(false)
                            }}
                            className="bg-[#2D2D2D] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#3D3D3D] transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}

// Preferences Component
function Preferences({ preferences, onUpdate }: { preferences: any; onUpdate: (data: any) => void }) {
    const [formData, setFormData] = useState(preferences)

    const handleNotificationChange = (key: string, value: boolean) => {
        setFormData({
            ...formData,
            notifications: {
                ...formData.notifications,
                [key]: value
            }
        })
    }

    const handlePrivacyChange = (key: string, value: boolean | string) => {
        setFormData({
            ...formData,
            privacy: {
                ...formData.privacy,
                [key]: value
            }
        })
    }

    const handleSave = () => {
        onUpdate(formData)
    }

    return (
        <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Configuración General</h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Idioma
                            </label>
                            <select
                                value={formData.language}
                                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none"
                            >
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="pt">Português</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Zona horaria
                            </label>
                            <select
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none"
                            >
                                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                                <option value="America/New_York">Nueva York (GMT-5)</option>
                                <option value="Europe/Madrid">Madrid (GMT+1)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Sistema de unidades
                            </label>
                            <select
                                value={formData.units}
                                onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none"
                            >
                                <option value="metric">Métrico (kg, cm)</option>
                                <option value="imperial">Imperial (lb, in)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Tema
                            </label>
                            <select
                                value={formData.theme}
                                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                                className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none"
                            >
                                <option value="dark">Oscuro</option>
                                <option value="light">Claro</option>
                                <option value="system">Sistema</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Notificaciones</h2>

                <div className="space-y-4">
                    {[
                        { key: 'workoutReminders', label: 'Recordatorios de entrenamiento', description: 'Recibe alertas cuando sea hora de entrenar' },
                        { key: 'mealReminders', label: 'Recordatorios de comidas', description: 'Notificaciones para registrar tus comidas' },
                        { key: 'achievements', label: 'Logros y medallas', description: 'Celebra tus logros con notificaciones' },
                        { key: 'weeklyReports', label: 'Reportes semanales', description: 'Resumen de tu progreso cada semana' },
                        { key: 'marketing', label: 'Noticias y promociones', description: 'Recibe actualizaciones sobre nuevas funciones' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#2D2D2D] last:border-0">
                            <div>
                                <p className="text-sm font-medium text-white">{item.label}</p>
                                <p className="text-xs text-gray-400">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notifications[item.key as keyof typeof formData.notifications]}
                                    onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy */}
            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Privacidad</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Visibilidad del perfil
                        </label>
                        <select
                            value={formData.privacy.profileVisibility}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            className="w-full bg-[#2D2D2D] border border-[#404040] rounded-lg px-4 py-2 text-white focus:border-[#1DB954] focus:outline-none"
                        >
                            <option value="public">Público</option>
                            <option value="friends">Solo amigos</option>
                            <option value="private">Privado</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {[
                            { key: 'dataSharing', label: 'Compartir datos con entrenadores', description: 'Permite que los entrenadores vean tu progreso' },
                            { key: 'analytics', label: 'Análisis de uso', description: 'Ayúdanos a mejorar compartiendo datos anónimos' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#2D2D2D] last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-white">{item.label}</p>
                                    <p className="text-xs text-gray-400">{item.description}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.privacy[item.key as keyof typeof formData.privacy] as boolean}
                                        onChange={(e) => handlePrivacyChange(item.key, e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#1DB954] to-[#10B981] text-[#0A0A0A] px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    <Save className="h-4 w-4" />
                    Guardar preferencias
                </button>
            </div>
        </div>
    )
}

export default function Profile() {
    const [activeTab, setActiveTab] = useState("personal")
    const [userData, setUserData] = useState<any>(null)
    const [fitnessData, setFitnessData] = useState<any>(null)
    const [preferencesData, setPreferencesData] = useState({
        language: "es",
        timezone: "America/Mexico_City",
        units: "metric",
        theme: "dark",
        notifications: {
            workoutReminders: true,
            mealReminders: true,
            achievements: true,
            weeklyReports: true,
            marketing: false,
        },
        privacy: {
            profileVisibility: "friends",
            dataSharing: true,
            analytics: true,
        },
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true)
            const user = await getCurrentUser()
            if (!user) {
                toast.error("No se encontró el usuario autenticado.", { autoClose: 4000 })
                setLoading(false)
                return
            }
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single()
            if (error || !data) {
                toast.error("No se pudo cargar el perfil.", { autoClose: 4000 })
                setLoading(false)
                return
            }
            setUserData({
                name: data.full_name || "",
                email: user.email || "",
                age: data.age || "",
                location: "",
                phone: "",
                gender: "",
                avatar: data.avatar_url || "",
            })
            setFitnessData({
                weight: data.weight_kg || "",
                height: data.height_cm || "",
                goal: data.goal || "",
                activityLevel: "",
                targetWeight: "",
                bodyFat: "",
            })
            setLoading(false)
        }
        fetchProfile()
    }, [])

    const handleUpdatePersonalInfo = (data: any) => {
        setUserData(data)
        toast.success("Información personal actualizada.", { autoClose: 3000 })
    }

    const handleUpdateFitnessMetrics = (data: any) => {
        setFitnessData(data)
        toast.success("Métricas de fitness actualizadas.", { autoClose: 3000 })
    }

    const handleUpdatePreferences = (data: any) => {
        setPreferencesData(data)
        toast.success("Preferencias actualizadas.", { autoClose: 3000 })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-white text-lg">Cargando perfil...</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                    <p className="text-gray-400">Gestiona tu información personal, métricas y preferencias.</p>
                </div>

                {/* Profile Overview */}
                <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Resumen del Perfil</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#1DB954]/10 rounded-full p-2">
                                <User className="h-4 w-4 text-[#1DB954]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Miembro desde</p>
                                <p className="text-xs text-gray-400">{/* Puedes mostrar data.created_at aquí si lo deseas */}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-[#1DB954]/10 rounded-full p-2">
                                <Activity className="h-4 w-4 text-[#1DB954]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Nivel de actividad</p>
                                <span className="inline-block bg-[#2D2D2D] text-gray-300 px-2 py-0.5 rounded text-xs">{fitnessData?.activityLevel || "No definido"}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-[#1DB954]/10 rounded-full p-2">
                                <Target className="h-4 w-4 text-[#1DB954]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Objetivo principal</p>
                                <span className="inline-block bg-[#2D2D2D] text-gray-300 px-2 py-0.5 rounded text-xs">{fitnessData?.goal || "No definido"}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-[#1DB954]/10 rounded-full p-2">
                                <Trophy className="h-4 w-4 text-[#1DB954]" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">Logros desbloqueados</p>
                                <p className="text-xs text-gray-400">12 logros</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Tabs */}
                <div className="space-y-6">
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl p-1 inline-flex gap-1">
                        <button
                            onClick={() => setActiveTab("personal")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === "personal"
                                ? "bg-[#1DB954] text-[#0A0A0A]"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <User className="h-4 w-4" />
                            Personal
                        </button>
                        <button
                            onClick={() => setActiveTab("fitness")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === "fitness"
                                ? "bg-[#1DB954] text-[#0A0A0A]"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Activity className="h-4 w-4" />
                            Fitness
                        </button>
                        <button
                            onClick={() => setActiveTab("preferences")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === "preferences"
                                ? "bg-[#1DB954] text-[#0A0A0A]"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            Preferencias
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "personal" && userData && (
                        <PersonalInfo user={userData} onUpdate={handleUpdatePersonalInfo} />
                    )}

                    {activeTab === "fitness" && fitnessData && (
                        <FitnessMetrics metrics={fitnessData} onUpdate={handleUpdateFitnessMetrics} />
                    )}

                    {activeTab === "preferences" && (
                        <Preferences preferences={preferencesData} onUpdate={handleUpdatePreferences} />
                    )}
                </div>
            </div>
        </div>
    )
}