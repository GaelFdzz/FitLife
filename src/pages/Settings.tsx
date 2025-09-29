import { useState } from "react"
import { Bell, Shield, Palette, Save, ChevronDown } from "lucide-react"

export default function Settings() {
  const [settings, setSettings] = useState({
    // Notification settings
    workoutReminders: true,
    achievementNotifications: true,
    nutritionReminders: true,
    weeklyReports: false,
    emailNotifications: true,
    pushNotifications: true,

    // Privacy settings
    profileVisibility: "friends",
    shareProgress: true,
    shareWorkouts: false,

    // App preferences
    theme: "dark",
    language: "es",
    units: "metric",
    startOfWeek: "monday",
  })

  const handleSave = () => {
    console.log("Settings saved:", settings)
    // Aquí guardarías la configuración en Supabase
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
          <p className="text-gray-400">Personaliza tu experiencia en FitLife</p>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#1DB954]/10 rounded-full p-2">
              <Bell className="h-5 w-5 text-[#1DB954]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Notificaciones</h2>
          </div>

          <div className="space-y-4">
            {/* Workout Reminders */}
            <div className="flex items-center justify-between py-3 border-b border-[#2D2D2D]">
              <div>
                <label htmlFor="workout-reminders" className="text-white font-medium cursor-pointer">
                  Recordatorios de Ejercicio
                </label>
                <p className="text-sm text-gray-400">Recibe notificaciones sobre tus entrenamientos programados</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="workout-reminders"
                  type="checkbox"
                  checked={settings.workoutReminders}
                  onChange={(e) => setSettings((prev) => ({ ...prev, workoutReminders: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Achievement Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-[#2D2D2D]">
              <div>
                <label htmlFor="achievement-notifications" className="text-white font-medium cursor-pointer">
                  Notificaciones de Logros
                </label>
                <p className="text-sm text-gray-400">Recibe alertas cuando desbloquees nuevos logros</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="achievement-notifications"
                  type="checkbox"
                  checked={settings.achievementNotifications}
                  onChange={(e) => setSettings((prev) => ({ ...prev, achievementNotifications: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Nutrition Reminders */}
            <div className="flex items-center justify-between py-3 border-b border-[#2D2D2D]">
              <div>
                <label htmlFor="nutrition-reminders" className="text-white font-medium cursor-pointer">
                  Recordatorios Nutricionales
                </label>
                <p className="text-sm text-gray-400">Recibe recordatorios para registrar tus comidas</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="nutrition-reminders"
                  type="checkbox"
                  checked={settings.nutritionReminders}
                  onChange={(e) => setSettings((prev) => ({ ...prev, nutritionReminders: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Weekly Reports */}
            <div className="flex items-center justify-between py-3">
              <div>
                <label htmlFor="weekly-reports" className="text-white font-medium cursor-pointer">
                  Reportes Semanales
                </label>
                <p className="text-sm text-gray-400">Recibe un resumen semanal de tu progreso</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="weekly-reports"
                  type="checkbox"
                  checked={settings.weeklyReports}
                  onChange={(e) => setSettings((prev) => ({ ...prev, weeklyReports: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#1DB954]/10 rounded-full p-2">
              <Shield className="h-5 w-5 text-[#1DB954]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Privacidad</h2>
          </div>

          <div className="space-y-4">
            {/* Profile Visibility */}
            <div className="space-y-2 pb-4 border-b border-[#2D2D2D]">
              <label className="text-white font-medium">Visibilidad del Perfil</label>
              <div className="relative">
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => setSettings((prev) => ({ ...prev, profileVisibility: e.target.value }))}
                  className="w-full bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                >
                  <option value="public">Público</option>
                  <option value="friends">Solo Amigos</option>
                  <option value="private">Privado</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Share Progress */}
            <div className="flex items-center justify-between py-3 border-b border-[#2D2D2D]">
              <div>
                <label htmlFor="share-progress" className="text-white font-medium cursor-pointer">
                  Compartir Progreso
                </label>
                <p className="text-sm text-gray-400">Permite que otros vean tu progreso de fitness</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="share-progress"
                  type="checkbox"
                  checked={settings.shareProgress}
                  onChange={(e) => setSettings((prev) => ({ ...prev, shareProgress: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Share Workouts */}
            <div className="flex items-center justify-between py-3">
              <div>
                <label htmlFor="share-workouts" className="text-white font-medium cursor-pointer">
                  Compartir Entrenamientos
                </label>
                <p className="text-sm text-gray-400">Permite que otros vean tus rutinas de ejercicio</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="share-workouts"
                  type="checkbox"
                  checked={settings.shareWorkouts}
                  onChange={(e) => setSettings((prev) => ({ ...prev, shareWorkouts: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2D2D2D] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#1DB954] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-[#1DB954]/10 rounded-full p-2">
              <Palette className="h-5 w-5 text-[#1DB954]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Preferencias de la App</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme */}
            <div className="space-y-2">
              <label className="text-white font-medium">Tema</label>
              <div className="relative">
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings((prev) => ({ ...prev, theme: e.target.value }))}
                  className="w-full bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                >
                  <option value="dark">Oscuro</option>
                  <option value="light">Claro</option>
                  <option value="auto">Automático</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-white font-medium">Idioma</label>
              <div className="relative">
                <select
                  value={settings.language}
                  onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
                  className="w-full bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Units */}
            <div className="space-y-2">
              <label className="text-white font-medium">Unidades</label>
              <div className="relative">
                <select
                  value={settings.units}
                  onChange={(e) => setSettings((prev) => ({ ...prev, units: e.target.value }))}
                  className="w-full bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                >
                  <option value="metric">Métrico (kg, cm)</option>
                  <option value="imperial">Imperial (lb, ft)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Start of Week */}
            <div className="space-y-2">
              <label className="text-white font-medium">Inicio de Semana</label>
              <div className="relative">
                <select
                  value={settings.startOfWeek}
                  onChange={(e) => setSettings((prev) => ({ ...prev, startOfWeek: e.target.value }))}
                  className="w-full bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                >
                  <option value="monday">Lunes</option>
                  <option value="sunday">Domingo</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#1DB954] text-[#0A0A0A] px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Save className="h-4 w-4" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  )
}