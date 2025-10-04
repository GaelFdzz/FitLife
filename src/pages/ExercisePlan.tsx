import { useState } from "react"
import { Plus, Target, Clock, Zap, Play, Eye, Calendar, Award, TrendingUp } from "lucide-react"

interface ExercisePlan {
  id: string
  name: string
  description: string
  duration: string
  difficulty: "Principiante" | "Intermedio" | "Avanzado"
  goal: string
  exercises: number
  estimatedCalories: number
  completedSessions: number
  totalSessions: number
  isActive?: boolean
}

function PlanCard({ 
  plan, 
  onStart, 
  onViewDetails 
}: {
  plan: ExercisePlan
  onStart: () => void
  onViewDetails: () => void
}) {
  const getDifficultyColor = (difficulty: ExercisePlan["difficulty"]) => {
    switch (difficulty) {
      case 'Principiante': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'Intermedio': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'Avanzado': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getGoalIcon = (goal: string) => {
    switch (goal.toLowerCase()) {
      case 'pérdida de peso': return '🔥'
      case 'ganancia muscular': return '💪'
      case 'resistencia': return '⚡'
      case 'flexibilidad': return '🧘'
      default: return '🎯'
    }
  }

  const progress = (plan.completedSessions / plan.totalSessions) * 100

  return (
    <div className={`bg-[#1A1A1A] border rounded-2xl p-6 transition-all duration-300 group ${
      plan.isActive 
        ? 'border-[#1DB954] bg-gradient-to-br from-[#1DB954]/5 to-transparent shadow-lg shadow-[#1DB954]/10' 
        : 'border-[#2D2D2D] hover:border-[#1DB954]/50 hover:bg-[#1A1A1A]/80'
    }`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getGoalIcon(plan.goal)}</div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors">
                {plan.name}
              </h3>
              {plan.isActive && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1DB954]/10 text-[#1DB954] text-xs font-medium rounded-full mt-1">
                  <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full animate-pulse" />
                  Plan Activo
                </span>
              )}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(plan.difficulty)}`}>
            {plan.difficulty}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          {plan.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.exercises} ejercicios</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.estimatedCalories.toLocaleString()} cal</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.goal}</span>
          </div>
        </div>

        {plan.isActive && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Progreso</span>
              <span className="text-sm font-medium text-white">
                {plan.completedSessions}/{plan.totalSessions} sesiones
              </span>
            </div>
            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
              <div
                className="bg-[#1DB954] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-400">
              {Math.round(progress)}% completado
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t border-[#2D2D2D]">
          <button
            onClick={onStart}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              plan.isActive
                ? 'bg-[#1DB954] text-black hover:opacity-90'
                : 'bg-[#2D2D2D] text-white hover:bg-[#3D3D3D]'
            }`}
          >
            <Play className="h-4 w-4" />
            {plan.isActive ? 'Continuar Plan' : 'Iniciar Plan'}
          </button>
          <button
            onClick={onViewDetails}
            className="px-4 py-2 border border-[#2D2D2D] text-white rounded-lg hover:bg-[#1A1A1A] hover:border-[#1DB954]/50 transition-all flex items-center justify-center"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend 
}: {
  title: string
  value: string
  subtitle: string
  icon: any
  trend?: string
}) {
  return (
    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6 hover:border-[#1DB954]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="bg-[#1DB954]/10 rounded-full p-2">
          <Icon className="h-4 w-4 text-[#1DB954]" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400">{subtitle}</p>
          {trend && (
            <span className="inline-flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ExercisePlan() {
  const [plans] = useState<ExercisePlan[]>([
    {
      id: "1",
      name: "Pérdida de Peso - 4 Semanas",
      description: "Plan integral combinando cardio y fuerza para quemar grasa efectivamente",
      duration: "4 semanas",
      difficulty: "Intermedio",
      goal: "Pérdida de peso",
      exercises: 24,
      estimatedCalories: 2400,
      completedSessions: 8,
      totalSessions: 16,
      isActive: true,
    },
    {
      id: "2",
      name: "Ganancia Muscular - Principiantes",
      description: "Introducción al entrenamiento de fuerza con ejercicios básicos",
      duration: "6 semanas",
      difficulty: "Principiante",
      goal: "Ganancia muscular",
      exercises: 18,
      estimatedCalories: 1800,
      completedSessions: 0,
      totalSessions: 18,
    },
    {
      id: "3",
      name: "HIIT Intensivo",
      description: "Entrenamientos de alta intensidad para máxima quema calórica",
      duration: "3 semanas",
      difficulty: "Avanzado",
      goal: "Resistencia",
      exercises: 15,
      estimatedCalories: 3000,
      completedSessions: 2,
      totalSessions: 12,
    },
    {
      id: "4",
      name: "Yoga y Flexibilidad",
      description: "Mejora tu flexibilidad y encuentra el equilibrio mental",
      duration: "8 semanas",
      difficulty: "Principiante",
      goal: "Flexibilidad",
      exercises: 32,
      estimatedCalories: 1200,
      completedSessions: 0,
      totalSessions: 24,
    },
    {
      id: "5",
      name: "Fuerza Funcional",
      description: "Desarrollo de fuerza aplicable a movimientos cotidianos",
      duration: "5 semanas",
      difficulty: "Intermedio",
      goal: "Ganancia muscular",
      exercises: 20,
      estimatedCalories: 2200,
      completedSessions: 0,
      totalSessions: 20,
    },
  ])

  const handleStartPlan = (planId: string) => {
    console.log("Iniciando plan:", planId)
  }

  const handleViewDetails = (planId: string) => {
    console.log("Ver detalles del plan:", planId)

  }

  const handleCreatePlan = () => {
    console.log("Crear nuevo plan")
  }

  const activePlan = plans.find((plan) => plan.isActive)
  const availablePlans = plans.filter((plan) => !plan.isActive)

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Planes de Ejercicio</h1>
            <p className="text-gray-400">
              Planes personalizados basados en tus objetivos y nivel de condición física.
            </p>
          </div>
          <button
            onClick={handleCreatePlan}
            className="bg-[#1DB954] text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Crear Plan Personalizado
          </button>
        </div>

        {activePlan && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Tu Plan Activo</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PlanCard
                  plan={activePlan}
                  onStart={() => handleStartPlan(activePlan.id)}
                  onViewDetails={() => handleViewDetails(activePlan.id)}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Progreso Semanal</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Sesiones completadas</span>
                      <span className="px-2 py-1 bg-[#2D2D2D] text-white text-sm rounded-lg font-medium">
                        8/16
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Calorías quemadas</span>
                      <span className="px-2 py-1 bg-[#2D2D2D] text-white text-sm rounded-lg font-medium">
                        1,200
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Próxima sesión</span>
                      <span className="px-2 py-1 bg-[#1DB954] text-black text-sm rounded-lg font-medium">
                        Hoy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Planes Completados"
            value="3"
            subtitle="planes finalizados"
            icon={Target}
            trend="+1 este mes"
          />
          <StatCard
            title="Tiempo Total"
            value="24.5h"
            subtitle="de entrenamiento"
            icon={Clock}
            trend="+2.5h esta semana"
          />
          <StatCard
            title="Calorías Totales"
            value="8,450"
            subtitle="quemadas"
            icon={Zap}
            trend="+450 esta semana"
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Planes Disponibles</h2>
            <p className="text-sm text-gray-400">
              {availablePlans.length} planes disponibles
            </p>
          </div>
          
          {availablePlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {availablePlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onStart={() => handleStartPlan(plan.id)}
                  onViewDetails={() => handleViewDetails(plan.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8 max-w-md mx-auto">
                <div className="bg-[#1DB954]/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-[#1DB954]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No hay planes disponibles</h3>
                <p className="text-gray-400 mb-4">
                  Crea tu primer plan personalizado para comenzar tu entrenamiento.
                </p>
                <button
                  onClick={handleCreatePlan}
                  className="bg-[#1DB954] text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Crear Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}