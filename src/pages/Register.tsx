import { useState } from "react"
import { Dumbbell, Mail, Lock, User, Calendar, Weight, Ruler, ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../lib/supabaseClient"
import { toast } from "react-toastify"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        age: "",
        weight: "",
        height: "",
        goal: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Validaciones básicas
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden")
            setLoading(false)
            return
        }
        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            setLoading(false)
            return
        }
        if (!formData.fullName || !formData.email || !formData.age || !formData.weight || !formData.height || !formData.goal || !formData.password) {
            setError("Por favor completa todos los campos")
            setLoading(false)
            return
        }

        try {
            const { data, error: supabaseError } = await signUp(
                formData.email,
                formData.password,
                {
                    fullName: formData.fullName,
                    age: formData.age,
                    weight: formData.weight,
                    height: formData.height,
                    goal: formData.goal,
                }
            )

            if (supabaseError) {
                const msg = supabaseError.message.includes("already registered")
                    ? "Este correo ya está registrado. Usa otro o inicia sesión."
                    : supabaseError.message
                setError(msg)
                toast.error(msg, { autoClose: 7000 })
                setLoading(false)
                return
            }

            // 🔥 Verificamos identities
            if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length > 0) {
                toast.success("¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.", {
                    autoClose: 7000
                })
                navigate("/login")
            } else {
                // Usuario ya estaba registrado
                setError("Este correo ya está registrado o confirmado. Inicia sesión.")
                toast.error("Este correo ya está registrado o confirmado. Inicia sesión.", {
                    autoClose: 7000
                })
            }


        } catch (err: any) {
            setError("Error inesperado: " + err.message)
            console.error("Error general en el registro:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div
                        className="bg-[#1DB954] rounded-full p-4 w-fit mx-auto mb-4"
                        style={{ boxShadow: "0 0 20px rgba(29, 185, 84, 0.3)" }}
                    >
                        <Dumbbell size={32} color="#0A0A0A" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">FitLife</h1>
                    <p className="text-[#A3A3A3]">Comienza tu viaje hacia el bienestar</p>
                </div>

                {/* Form Card */}
                <div className="bg-[#0A0A0A] border border-[#2D2D2D] rounded-2xl p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h2>
                        <p className="text-[#A3A3A3] text-sm">Completa tus datos para personalizar tu experiencia</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name and Age */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Nombre Completo
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-[#666]" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Tu Nombre"
                                        className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Edad
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar size={18} className="text-[#666]" />
                                    </div>
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="25"
                                        className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-[#666]" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Weight and Height */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Peso (kg)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Weight size={18} className="text-[#666]" />
                                    </div>
                                    <input
                                        type="number"
                                        name="weight"
                                        required
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="70"
                                        className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Altura (cm)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Ruler size={18} className="text-[#666]" />
                                    </div>
                                    <input
                                        type="number"
                                        name="height"
                                        required
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="170"
                                        className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Goal */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Objetivo Principal
                            </label>
                            <div className="relative">
                                <select
                                    name="goal"
                                    required
                                    value={formData.goal}
                                    onChange={handleChange}
                                    className="w-full bg-[#0A0A0A] pl-4 pr-10 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors appearance-none"
                                    style={{ color: formData.goal ? 'white' : '#666' }}
                                >
                                    <option value="" style={{ color: '#666' }}>Selecciona tu objetivo</option>
                                    <option value="weight-loss" style={{ color: 'white' }}>Pérdida de peso</option>
                                    <option value="muscle-gain" style={{ color: 'white' }}>Ganancia muscular</option>
                                    <option value="maintenance" style={{ color: 'white' }}>Mantenimiento</option>
                                    <option value="endurance" style={{ color: 'white' }}>Resistencia</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666] pointer-events-none" />
                            </div>
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-[#666]" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="•••••••"
                                        className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-[#666]" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="•••••••"
                                        className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-4 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-[#666] disabled:cursor-not-allowed text-[#0A0A0A] font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
                        >
                            {loading ? "Creando cuenta..." : "Crear Cuenta"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-[#A3A3A3] text-sm">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" className="text-[#1DB954] hover:text-[#1ed760] font-medium transition-colors">
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}