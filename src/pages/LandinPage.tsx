import { Dumbbell, Heart, Target, Users, ArrowRight, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandinPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-[#1DB954] rounded-full p-4" style={{ boxShadow: "0 0 20px rgba(29, 185, 84, 0.3)" }}>
                <Dumbbell className="h-12 w-12 text-[#0A0A0A]" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance text-[#FAFAFA]">
              Tu sistema integral de <span className="text-[#1DB954]">bienestar</span>
            </h1>

            <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto text-balance">
              Planes de ejercicio personalizados, seguimiento nutricional y conexión con dispositivos wearables. Todo en
              una sola plataforma.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-[#1DB954] text-[#0A0A0A] hover:opacity-90 transition-opacity"
              >
                Comenzar Gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg border border-[#404040] text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FAFAFA]">
            Todo lo que necesitas para alcanzar tus metas
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            FitLife combina tecnología avanzada con planes personalizados para transformar tu estilo de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
            <div className="bg-[#1DB954]/10 rounded-full p-3 w-fit mb-4">
              <Target className="h-6 w-6 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Planes Personalizados</h3>
            <p className="text-[#A3A3A3]">Ejercicios adaptados a tus objetivos, nivel y preferencias personales.</p>
          </div>

          <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
            <div className="bg-[#1DB954]/10 rounded-full p-3 w-fit mb-4">
              <Heart className="h-6 w-6 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Seguimiento Nutricional</h3>
            <p className="text-[#A3A3A3]">
              Registra tus alimentos y recibe recomendaciones automáticas para una dieta balanceada.
            </p>
          </div>

          <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
            <div className="bg-[#1DB954]/10 rounded-full p-3 w-fit mb-4">
              <Dumbbell className="h-6 w-6 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Dispositivos Wearables</h3>
            <p className="text-[#A3A3A3]">Conecta tus pulseras y relojes inteligentes para un seguimiento completo.</p>
          </div>

          <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
            <div className="bg-[#1DB954]/10 rounded-full p-3 w-fit mb-4">
              <Users className="h-6 w-6 text-[#1DB954]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Comunidad Activa</h3>
            <p className="text-[#A3A3A3]">
              Únete a una comunidad de personas con objetivos similares y mantente motivado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1A1A1A]/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FAFAFA]">¿Por qué elegir FitLife?</h2>
              <div className="space-y-4">
                {[
                  "Planes de ejercicio basados en ciencia deportiva",
                  "Seguimiento automático de progreso",
                  "Integración con más de 50 dispositivos wearables",
                  "Notificaciones inteligentes y recordatorios",
                  "Biblioteca con más de 500 ejercicios",
                  "Calculadora de IMC y métricas de salud",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#1DB954] flex-shrink-0" />
                    <span className="text-[#FAFAFA]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#1DB954]/20 to-[#1DB954]/5 rounded-2xl p-8 text-center">
                <div
                  className="bg-[#1DB954] rounded-full p-6 w-fit mx-auto mb-6"
                  style={{ boxShadow: "0 0 20px rgba(29, 185, 84, 0.3)" }}
                >
                  <Dumbbell className="h-16 w-16 text-[#0A0A0A]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#FAFAFA]">Comienza hoy mismo</h3>
                <p className="text-[#A3A3A3] mb-6">
                  Únete a miles de usuarios que ya han transformado su estilo de vida con FitLife.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg bg-[#1DB954] text-[#0A0A0A] hover:opacity-90 transition-opacity"
                >
                  Crear Cuenta Gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
