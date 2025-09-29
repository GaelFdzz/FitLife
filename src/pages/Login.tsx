import { useState } from "react"
import { Dumbbell, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { signIn } from "../lib/supabaseClient" // Importa signIn
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { data, error: supabaseError } = await signIn(formData.email, formData.password)
      if (supabaseError) {
        toast.error("Credenciales incorrectas. Intenta de nuevo.", { autoClose: 5000 })
        console.error("Error de Supabase durante el inicio de sesión:", supabaseError)
      } else if (data.user) {
        toast.success("¡Bienvenido de nuevo!", { autoClose: 3500 })
        navigate("/dashboard") // Redirige al dashboard
      }
    } catch (err: any) {
      setError("Error inesperado: " + err.message)
      console.error("Error general en el inicio de sesión:", err)
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
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="bg-[#1DB954] rounded-full p-4 w-fit mx-auto mb-4"
            style={{ boxShadow: "0 0 20px rgba(29, 185, 84, 0.3)" }}
          >
            <Dumbbell size={32} color="#0A0A0A" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FitLife</h1>
          <p className="text-[#A3A3A3]">Tu sistema integral de bienestar</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0A0A0A] border border-[#2D2D2D] rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
            <p className="text-[#A3A3A3] text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#666]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  className="w-full bg-[#0A0A0A] text-white placeholder-[#666] pl-10 pr-12 py-3 border border-[#2D2D2D] rounded-lg focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-[#666] hover:text-[#A3A3A3] transition-colors" />
                  ) : (
                    <Eye size={18} className="text-[#666] hover:text-[#A3A3A3] transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <a href="#" className="text-sm text-[#1DB954] hover:text-[#1ed760] transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] disabled:bg-[#666] disabled:cursor-not-allowed text-[#0A0A0A] font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-[#A3A3A3] text-sm">
                ¿No tiene una cuenta?{" "}
                <Link to="/register" className="text-[#1DB954] hover:text-[#1ed760] font-medium transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}