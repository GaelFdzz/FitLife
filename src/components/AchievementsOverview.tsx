import { useState } from "react"
import { Trophy, Star, Target, Lock, CheckCircle } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "workout" | "nutrition" | "streak" | "social"
  unlocked: boolean
  progress: number
  maxProgress: number
  points: number
  unlockedDate?: string
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Primera Victoria",
    description: "Completa tu primer entrenamiento",
    icon: "🏆",
    category: "workout",
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    points: 50,
    unlockedDate: "15 Dic 2024",
  },
  {
    id: "2",
    title: "Guerrero de la Semana",
    description: "Entrena 7 días consecutivos",
    icon: "⚔️",
    category: "streak",
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    points: 200,
    unlockedDate: "20 Dic 2024",
  },
  {
    id: "3",
    title: "Nutricionista Novato",
    description: "Registra tu alimentación por 5 días",
    icon: "🥗",
    category: "nutrition",
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    points: 100,
  },
  {
    id: "4",
    title: "Maratonista",
    description: "Completa 50 entrenamientos",
    icon: "🏃",
    category: "workout",
    unlocked: false,
    progress: 23,
    maxProgress: 50,
    points: 500,
  },
  {
    id: "5",
    title: "Mentor Fitness",
    description: "Ayuda a 3 amigos a alcanzar sus metas",
    icon: "👥",
    category: "social",
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    points: 300,
  },
  {
    id: "6",
    title: "Disciplina de Hierro",
    description: "Mantén una racha de 30 días",
    icon: "💪",
    category: "streak",
    unlocked: false,
    progress: 12,
    maxProgress: 30,
    points: 750,
  },
]

const categoryColors = {
  workout: "bg-blue-500",
  nutrition: "bg-green-500",
  streak: "bg-orange-500",
  social: "bg-purple-500",
}

const categoryLabels = {
  workout: "Ejercicio",
  nutrition: "Nutrición",
  streak: "Constancia",
  social: "Social",
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

  return (
    <div
      className={`bg-[#1A1A1A] border rounded-2xl p-4 transition-all hover:border-[#1DB954]/30 ${
        achievement.unlocked ? "border-[#1DB954]/20" : "border-[#2D2D2D]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            achievement.unlocked ? "bg-[#1DB954]/20" : "bg-[#2D2D2D]"
          }`}
        >
          {achievement.unlocked ? (
            <CheckCircle className="h-6 w-6 text-[#1DB954]" />
          ) : achievement.progress > 0 ? (
            <Trophy className="h-6 w-6 text-gray-400" />
          ) : (
            <Lock className="h-6 w-6 text-gray-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className={`font-semibold ${achievement.unlocked ? "text-white" : "text-gray-300"}`}>
                {achievement.title}
              </h3>
              <p className={`text-sm ${achievement.unlocked ? "text-gray-300" : "text-gray-500"}`}>
                {achievement.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`${categoryColors[achievement.category]} text-white text-xs px-2 py-1 rounded`}>
                {categoryLabels[achievement.category]}
              </span>
              <span className="text-xs text-[#1DB954] font-medium">+{achievement.points} pts</span>
            </div>
          </div>

          {!achievement.unlocked && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Progreso</span>
                <span className="text-gray-400">
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
              <div className="w-full bg-[#2D2D2D] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#1DB954] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {achievement.unlocked && achievement.unlockedDate && (
            <p className="text-xs text-[#1DB954] mt-2">Desbloqueado el {achievement.unlockedDate}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AchievementsOverview() {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")

  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length
  const totalPoints = mockAchievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)

  const filteredAchievements = mockAchievements.filter((achievement) => {
    if (filter === "unlocked") return achievement.unlocked
    if (filter === "locked") return !achievement.unlocked
    return true
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1DB954]/20 rounded-full flex items-center justify-center">
              <Trophy className="h-5 w-5 text-[#1DB954]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{unlockedCount}</p>
              <p className="text-sm text-gray-400">Logros Desbloqueados</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Star className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalPoints}</p>
              <p className="text-sm text-gray-400">Puntos Totales</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {Math.round((unlockedCount / mockAchievements.length) * 100)}%
              </p>
              <p className="text-sm text-gray-400">Completado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Mis Logros</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-[#1DB954] text-[#0A0A0A]"
                  : "bg-[#2D2D2D] text-gray-400 hover:bg-[#3D3D3D]"
              }`}
            >
              Todos ({mockAchievements.length})
            </button>
            <button
              onClick={() => setFilter("unlocked")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "unlocked"
                  ? "bg-[#1DB954] text-[#0A0A0A]"
                  : "bg-[#2D2D2D] text-gray-400 hover:bg-[#3D3D3D]"
              }`}
            >
              Desbloqueados ({unlockedCount})
            </button>
            <button
              onClick={() => setFilter("locked")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "locked"
                  ? "bg-[#1DB954] text-[#0A0A0A]"
                  : "bg-[#2D2D2D] text-gray-400 hover:bg-[#3D3D3D]"
              }`}
            >
              Bloqueados ({mockAchievements.length - unlockedCount})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  )
}