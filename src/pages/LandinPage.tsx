import { Apple, ArrowRight, Smartphone, Sparkle, Target, TrendingUp, Users, Watch } from "lucide-react"
import { Link } from "react-router-dom"


export default function LandinPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Inicio */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="relative container mx-auto px-4 py-48">
          <div className="text-center space-y-8">

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

      {/* Scroll infinito */}
      <section>
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#FAFAFA]">¿Por qué elegir FitLife?</h2>
          <div className="relative overflow-hidden py-8">
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0) 100%)"
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(to left, #0A0A0A 0%, rgba(10,10,10,0) 100%)"
              }}
            />
            <div className="flex gap-8 w-[200%] animate-scroll">
              {[
                "Planes de ejercicio basados en ciencia deportiva",
                "Seguimiento automático de progreso",
                "Integración con más de 50 dispositivos wearables",
                "Notificaciones inteligentes y recordatorios",
                "Biblioteca con más de 500 ejercicios",
                "Calculadora de IMC y métricas de salud",
              ].map((benefit, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center gap-2 whitespace-nowrap text-lg font-medium"
                >
                  <span className="text-[#FAFAFA] leading-none">{benefit}</span>
                  <span></span>
                  <span></span>
                  <Sparkle className="text-[#1DB954]/60 h-5 w-5" />
                </div>
              ))}

              {[
                "Planes de ejercicio basados en ciencia deportiva",
                "Seguimiento automático de progreso",
                "Integración con más de 50 dispositivos wearables",
                "Notificaciones inteligentes y recordatorios",
                "Biblioteca con más de 500 ejercicios",
                "Calculadora de IMC y métricas de salud",
              ].map((benefit, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center gap-2 whitespace-nowrap text-lg font-medium"
                >
                  <span className="text-[#FAFAFA] leading-none">{benefit}</span>
                  <Sparkle className="text-[#1DB954]/60 h-5 w-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivacional */}
      <section>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">

              <h2 className="text-[#FAFAFA] text-5xl md:text-6xl font-bold leading-tight">
                Desbloquea todo tu potencial con <span className="text-[#1DB954]">FitLife</span>
              </h2>

              <p className="text-[#B3B3B3] text-lg leading-relaxed">
                Olvídate de las hojas de cálculo y las apps complicadas. FitLife integra ejercicio,
                nutrición y seguimiento de salud en una sola plataforma intuitiva. Deja que la tecnología trabaje por ti.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80"
                  alt="Fitness athlete"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadisticas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1DB954]">10,000+</h3>
              <p className="text-[#A3A3A3] mt-2">Usuarios Activos</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1DB954]">50+</h3>
              <p className="text-[#A3A3A3] mt-2">Ejercicios</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1DB954]">10+</h3>
              <p className="text-[#A3A3A3] mt-2">Wearables Compatibles</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1DB954]">99%</h3>
              <p className="text-[#A3A3A3] mt-2">Disponibilidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-20 bg-[#1A1A1A]/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#FAFAFA]">
            Comienza en 3 simples pasos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1DB954]/20 rounded-full flex items-center justify-center mx-auto border-2 border-[#1DB954]">
                <span className="text-2xl font-bold text-[#1DB954]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FAFAFA]">Crea tu perfil</h3>
              <p className="text-[#A3A3A3]">
                Regístrate en menos de 2 minutos. Cuéntanos tus objetivos, nivel actual y preferencias de ejercicio.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1DB954]/20 rounded-full flex items-center justify-center mx-auto border-2 border-[#1DB954]">
                <span className="text-2xl font-bold text-[#1DB954]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FAFAFA]">Recibe tu plan personalizado</h3>
              <p className="text-[#A3A3A3]">
                Nuestro sistema genera un plan de ejercicios y nutrición adaptado específicamente a ti.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1DB954]/20 rounded-full flex items-center justify-center mx-auto border-2 border-[#1DB954]">
                <span className="text-2xl font-bold text-[#1DB954]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FAFAFA]">Entrena y monitorea tu progreso</h3>
              <p className="text-[#A3A3A3]">
                Sigue tus entrenamientos, registra tu nutrición y observa cómo alcanzas tus metas día a día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características Principales */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
              <Target className="h-10 w-10 text-[#1DB954] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Planes Personalizados</h3>
              <p className="text-[#A3A3A3]">Ejercicios adaptados a tus objetivos, nivel y preferencias personales.</p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
              <TrendingUp className="h-10 w-10 text-[#1DB954] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Seguimiento Nutricional</h3>
              <p className="text-[#A3A3A3]">
                Registra tus alimentos y recibe recomendaciones automáticas para una dieta balanceada.
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
              <Watch className="h-10 w-10 text-[#1DB954] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Dispositivos Wearables</h3>
              <p className="text-[#A3A3A3]">Conecta tus pulseras y relojes inteligentes para un seguimiento completo.</p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm hover:bg-[#1A1A1A]/70 transition-colors rounded-lg p-6">
              <Users className="h-10 w-10 text-[#1DB954] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Comunidad Activa</h3>
              <p className="text-[#A3A3A3]">
                Únete a una comunidad de personas con objetivos similares y mantente motivado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Integraciones/Partners */}
      <section className="py-20 bg-[#1A1A1A]/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#FAFAFA]">
            Compatible con tus dispositivos favoritos
          </h2>
          <p className="text-[#A3A3A3] text-center mb-12 max-w-2xl mx-auto">
            Sincroniza automáticamente tus datos de más de 50 dispositivos y aplicaciones
          </p>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="flex items-center gap-3">
              <Apple className="h-12 w-12 text-[#FAFAFA]" />
              <span className="text-xl font-semibold text-[#FAFAFA]">Apple Watch</span>
            </div>
            <div className="flex items-center gap-3">
              <Watch className="h-12 w-12 text-[#FAFAFA]" />
              <span className="text-xl font-semibold text-[#FAFAFA]">Fitbit</span>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="h-12 w-12 text-[#FAFAFA]" />
              <span className="text-xl font-semibold text-[#FAFAFA]">Garmin</span>
            </div>
            <div className="flex items-center gap-3">
              <Watch className="h-12 w-12 text-[#FAFAFA]" />
              <span className="text-xl font-semibold text-[#FAFAFA]">Samsung Health</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#FAFAFA]">
            Historias de transformación
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full" />
                <div>
                  <h4 className="font-semibold text-[#FAFAFA]">María González</h4>
                  <p className="text-sm text-[#A3A3A3]">Perdió 15kg en 6 meses</p>
                </div>
              </div>
              <p className="text-[#A3A3A3]">
                "FitLife cambió mi vida. Los planes personalizados y el seguimiento nutricional me ayudaron a alcanzar mis metas de forma sostenible."
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full" />
                <div>
                  <h4 className="font-semibold text-[#FAFAFA]">Carlos Ramírez</h4>
                  <p className="text-sm text-[#A3A3A3]">Ganó 8kg de músculo</p>
                </div>
              </div>
              <p className="text-[#A3A3A3]">
                "La biblioteca de ejercicios es increíble. Cada rutina está bien explicada y puedo ver mi progreso en tiempo real."
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full" />
                <div>
                  <h4 className="font-semibold text-[#FAFAFA]">Ana Martínez</h4>
                  <p className="text-sm text-[#A3A3A3]">Mejoró su resistencia</p>
                </div>
              </div>
              <p className="text-[#A3A3A3]">
                "La integración con mi Apple Watch hace que el seguimiento sea automático. No tengo que preocuparme por registrar nada manualmente."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#1A1A1A]/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FAFAFA]">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#FAFAFA]">¿FitLife es completamente gratis?</h3>
              <p className="text-[#A3A3A3]">
                Sí, puedes crear tu cuenta y acceder a todas las funcionalidades básicas sin costo. Ofrecemos planes personalizados, seguimiento nutricional y acceso a nuestra biblioteca de ejercicios.
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#FAFAFA]">¿Necesito equipo especial para comenzar?</h3>
              <p className="text-[#A3A3A3]">
                No necesariamente. Nuestros planes incluyen ejercicios que puedes hacer en casa sin equipo, así como rutinas para gimnasio. Tú decides qué estilo se adapta mejor a ti.
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#FAFAFA]">¿Cómo funciona la integración con wearables?</h3>
              <p className="text-[#A3A3A3]">
                Una vez conectes tu dispositivo (Apple Watch, Fitbit, Garmin, etc.), FitLife sincronizará automáticamente tus datos de actividad, pasos, calorías quemadas y frecuencia cardíaca.
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#FAFAFA]">¿Puedo usar FitLife en mi teléfono?</h3>
              <p className="text-[#A3A3A3]">
                Sí, FitLife es una aplicación web responsive que funciona perfectamente en cualquier dispositivo: computadora, tablet o smartphone. Solo necesitas un navegador moderno.
              </p>
            </div>

            <div className="border border-[#404040]/50 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#FAFAFA]">¿Mis datos están seguros?</h3>
              <p className="text-[#A3A3A3]">
                Absolutamente. Utilizamos encriptación de grado empresarial, autenticación JWT y cumplimos con los estándares de privacidad para proteger tu información de salud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Panel Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#1DB954]/20 to-[#1DB954]/5 rounded-2xl p-12 text-center max-w-4xl mx-auto border border-[#1DB954]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FAFAFA]">
              ¿Listo para transformar tu estilo de vida?
            </h2>
            <p className="text-[#A3A3A3] mb-8 text-lg max-w-2xl mx-auto">
              Únete a más de 10,000 usuarios que ya están alcanzando sus objetivos de fitness con FitLife. Comienza gratis hoy mismo.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-[#1DB954] text-[#0A0A0A] hover:opacity-90 transition-opacity"
            >
              Crear Cuenta Gratis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="text-sm text-[#A3A3A3] mt-4">
              No se requiere tarjeta de crédito • Configura tu cuenta en menos de 2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A]/50 border-t border-[#404040]/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#FAFAFA] mb-4">FitLife</h3>
              <p className="text-[#A3A3A3] text-sm">
                Tu sistema integral de bienestar. Alcanza tus metas de fitness con tecnología avanzada.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#FAFAFA] mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-[#A3A3A3]">
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Características</Link></li>
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Planes</Link></li>
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Integraciones</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#FAFAFA] mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm text-[#A3A3A3]">
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Sobre Nosotros</Link></li>
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Contacto</Link></li>
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#FAFAFA] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#A3A3A3]">
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Privacidad</Link></li>
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Términos</Link></li>
                <li><Link to="#" className="hover:text-[#1DB954] transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#404040]/30 pt-8 text-center text-sm text-[#A3A3A3]">
            <p>Hecho por nosotros. *ahora si*</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
