import { Calendar, Target, Trophy } from "lucide-react";
import NotificationCenter from "../components/NotificationCenter";

// NotificationsPage Component
export default function Notifications() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Centro de Notificaciones</h1>
          <p className="text-gray-400">
            Mantente al día con tus entrenamientos, logros y recordatorios
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4 hover:border-[#1DB954]/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-[#1DB954]/10 rounded-full p-2">
                <Trophy className="h-5 w-5 text-[#1DB954]" />
              </div>
              <div>
                <h3 className="font-medium text-white">Logros</h3>
                <p className="text-sm text-gray-400">2 nuevos logros</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4 hover:border-blue-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-blue-400/10 rounded-full p-2">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Recordatorios</h3>
                <p className="text-sm text-gray-400">1 pendiente</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4 hover:border-orange-400/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-orange-400/10 rounded-full p-2">
                <Target className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Metas</h3>
                <p className="text-sm text-gray-400">1 completada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Configuración de Notificaciones</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Recordatorios de entrenamientos</h3>
                <p className="text-sm text-gray-400">Recibe notificaciones antes de tus sesiones</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only"
                  id="workout-reminders"
                />
                <label
                  htmlFor="workout-reminders"
                  className="block w-12 h-6 bg-[#1DB954] rounded-full cursor-pointer relative"
                >
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Logros y récords</h3>
                <p className="text-sm text-gray-400">Notificaciones cuando alcances nuevos logros</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only"
                  id="achievements"
                />
                <label
                  htmlFor="achievements"
                  className="block w-12 h-6 bg-[#1DB954] rounded-full cursor-pointer relative"
                >
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Actividad social</h3>
                <p className="text-sm text-gray-400">Nuevos seguidores y comentarios</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  id="social"
                />
                <label
                  htmlFor="social"
                  className="block w-12 h-6 bg-[#2D2D2D] rounded-full cursor-pointer relative"
                >
                  <span className="absolute left-1 top-1 bg-gray-400 w-4 h-4 rounded-full transition-transform" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Notifications */}
        <NotificationCenter />
      </div>
    </div>
  )
}