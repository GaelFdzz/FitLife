import { useState, useEffect } from "react"
import { Plus, Target, Zap, Play, Eye, Calendar, Award, X, Trash2 } from "lucide-react"
import {
  supabase,
  getUserExercisePlans,
  updateExercisePlanStatus,
  getExercisesByPlan
} from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"

interface ExercisePlan {
  id: string
  plan_name: string
  goal: string
  start_date: string
  end_date?: string
  is_active?: boolean
  exercises?: number
  completedSessions?: number
  totalSessions?: number
  description?: string
  difficulty?: "Principiante" | "Intermedio" | "Avanzado"
  estimatedCalories?: number
  completed_sessions?: number
  total_sessions?: number
  estimated_calories?: number
}

interface Exercise {
  id: string
  name: string
  description?: string
  muscle_group?: string
  difficulty?: string
}

interface PlanExercise {
  id: string
  sets?: number
  reps?: number
  duration_minutes?: number
  exercises: Exercise
}

function PlanCard({
  plan,
  onStart,
  onContinue,
  onViewDetails,
  onDelete
}: {
  plan: ExercisePlan
  onStart: () => void
  onContinue?: () => void   // 👈 opcional
  onViewDetails: () => void
  onDelete: () => void
}) {

  const getDifficultyColor = (difficulty?: ExercisePlan["difficulty"]) => {
    switch (difficulty) {
      case 'Principiante': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'Intermedio': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'Avanzado': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const completedSessions = plan.completed_sessions ?? plan.completedSessions ?? 0
  const totalSessions = plan.total_sessions ?? plan.totalSessions ?? 0
  const progress = totalSessions ? (completedSessions / totalSessions * 100) : 0

  return (
    <div className={`bg-[#1A1A1A] border rounded-lg p-6 transition-all duration-300 group ${plan.is_active
      ? 'border-[#1DB954] bg-gradient-to-br from-[#1DB954]/5 to-transparent shadow-lg shadow-[#1DB954]/10'
      : 'border-[#2D2D2D] hover:border-[#1DB954]/50 hover:bg-[#1A1A1A]/80'
      }`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors">
                {plan.plan_name}
              </h3>
              {plan.is_active && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1DB954]/10 text-[#1DB954] text-xs font-medium rounded-full mt-1">
                  <div className="w-1.5 h-1.5 bg-[#1DB954] rounded-full animate-pulse" />
                  Plan Activo
                </span>
              )}
            </div>
          </div>
          {plan.difficulty && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(plan.difficulty)}`}>
              {plan.difficulty}
            </span>
          )}
        </div>

        {plan.description && (
          <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.start_date} - {plan.end_date ?? "Indefinido"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.exercises ?? 0} ejercicios</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.estimated_calories ?? plan.estimatedCalories ?? 0} cal</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm text-gray-400">{plan.goal}</span>
          </div>
        </div>

        {plan.is_active && totalSessions > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Progreso</span>
              <span className="text-sm font-medium text-white">
                {completedSessions}/{totalSessions} sesiones
              </span>
            </div>
            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
              <div
                className="bg-[#1DB954] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-400">{Math.round(progress)}% completado</div>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t border-[#2D2D2D]">
          <button
            onClick={() => {
              if (plan.is_active) {
                onContinue?.()   // 👈 con safe-call
              } else {
                onStart()
              }
            }}

            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${plan.is_active
              ? 'bg-[#1DB954] text-black hover:opacity-90'
              : 'bg-[#2D2D2D] text-white hover:bg-[#3D3D3D]'
              }`}
          >
            <Play className="h-4 w-4" />
            {plan.is_active ? 'Continuar Plan' : 'Iniciar Plan'}
          </button>

          <button
            onClick={onViewDetails}
            className="px-4 py-2 border border-[#2D2D2D] text-white rounded-md hover:bg-[#1A1A1A] hover:border-[#1DB954]/50 transition-all flex items-center justify-center"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 border border-red-500/20 text-red-400 rounded-md hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center justify-center"
            title="Eliminar plan"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ExercisePlan() {
  const navigate = useNavigate()
  const [plans, setPlans] = useState<ExercisePlan[]>([])
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedPlanExercises, setSelectedPlanExercises] = useState<PlanExercise[]>([])
  const [selectedPlanName, setSelectedPlanName] = useState("")
  const [newPlan, setNewPlan] = useState({
    plan_name: "",
    goal: "",
    description: "",
    difficulty: "Principiante" as "Principiante" | "Intermedio" | "Avanzado",
    start_date: "",
    end_date: "",
    totalSessions: 0,
    estimatedCalories: 0,
    notification_time: "",
    exercises: [] as string[],
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchPlans = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Usar la función de supabaseClient
      const plansData = await getUserExercisePlans(user.id)

      // Obtener el conteo de ejercicios para cada plan
      const plansWithExerciseCount = await Promise.all(
        plansData.map(async (plan) => {
          const { count } = await supabase
            .from('plan_exercises')
            .select('*', { count: 'exact', head: true })
            .eq('plan_id', plan.id)

          return {
            ...plan,
            exercises: count ?? 0
          }
        })
      )

      setPlans(plansWithExerciseCount)
    } catch (err) {
      console.error("Error cargando planes:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchExercises = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('exercises')
      .select('*')

    if (error) {
      console.error("Error cargando ejercicios:", error)
      return
    }

    setAvailableExercises(data ?? [])
  }

  const handleDeletePlan = async (planId: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este plan? Esta acción no se puede deshacer.")

    if (!confirmDelete) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error: deleteExercisesError } = await supabase
        .from('plan_exercises')
        .delete()
        .eq('plan_id', planId)

      if (deleteExercisesError) throw deleteExercisesError

      const { error: deletePlanError } = await supabase
        .from('exercise_plans')
        .delete()
        .eq('id', planId)

      if (deletePlanError) throw deletePlanError

      setPlans(prevPlans => prevPlans.filter(plan => plan.id !== planId))

      alert("Plan eliminado exitosamente")
    } catch (err) {
      console.error("Error eliminando plan:", err)
      alert("Error al eliminar el plan")
    }
  }

  const handleStartPlan = async (planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await updateExercisePlanStatus(user.id, planId)

      setPlans(prevPlans =>
        prevPlans.map(plan => ({
          ...plan,
          is_active: plan.id === planId
        }))
      )

      alert("¡Plan activado exitosamente!")
    } catch (err) {
      console.error("Error activando plan:", err)
      alert("Error al activar el plan")
    }
  }

  const handleContinuePlan = (planId: string) => {
    navigate(`/dashboard/workout-session/${planId}`)
  }

  const handleViewDetails = async (planId: string) => {
    try {
      const plan = plans.find(p => p.id === planId)
      setSelectedPlanName(plan?.plan_name ?? "Plan")

      // Usar la función de supabaseClient
      const exercisesData = await getExercisesByPlan(planId)

      setSelectedPlanExercises(exercisesData ?? [])
      setShowDetailsModal(true)
    } catch (err) {
      console.error("Error obteniendo detalles:", err)
      alert("Error al cargar los detalles del plan")
    }
  }

  const handleCreatePlanClick = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedPlanExercises([])
    setSelectedPlanName("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewPlan(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitPlan = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return alert("Usuario no autenticado")

      if (!newPlan.plan_name || !newPlan.goal || !newPlan.start_date) {
        return alert("Por favor completa los campos obligatorios")
      }

      const notificationTime =
        newPlan.notification_time && newPlan.notification_time.length === 5
          ? newPlan.notification_time + ":00"
          : newPlan.notification_time || null;

      const { data: planData, error: planError } = await supabase
        .from('exercise_plans')
        .insert([{
          user_id: user.id,
          plan_name: newPlan.plan_name,
          goal: newPlan.goal,
          start_date: newPlan.start_date,
          end_date: newPlan.end_date || null,
          is_active: false,
          difficulty: newPlan.difficulty,
          estimated_calories: newPlan.estimatedCalories || 0,
          notification_time: notificationTime,
          total_sessions: newPlan.totalSessions || 0,
          completed_sessions: 0
        }])
        .select()

      if (planError) throw planError
      const createdPlan = planData![0]

      if (newPlan.exercises.length > 0) {
        const inserts = newPlan.exercises.map((exId, index) => ({
          plan_id: createdPlan.id,
          exercise_id: exId,
          order_in_plan: index + 1
        }))

        const { error: exercisesError } = await supabase
          .from('plan_exercises')
          .insert(inserts)

        if (exercisesError) throw exercisesError
      }

      await fetchPlans()

      setNewPlan({
        plan_name: "",
        goal: "",
        description: "",
        difficulty: "Principiante",
        start_date: "",
        end_date: "",
        totalSessions: 0,
        estimatedCalories: 0,
        notification_time: "",
        exercises: [],
      })
      setShowModal(false)
      alert("¡Plan creado exitosamente!")
    } catch (err) {
      console.error("Error creando plan:", err)
      alert("Error al crear plan")
    }
  }

  if (loading) return <div className="text-white text-center mt-10">Cargando planes...</div>

  const activePlan = plans.find((plan) => plan.is_active)

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Planes de Ejercicio</h1>
            <p className="text-gray-400">Crea tu plan de ejercicio personalizado.</p>
          </div>
          <button
            onClick={handleCreatePlanClick}
            className="bg-[#1DB954] text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
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
                  onContinue={() => handleContinuePlan(activePlan.id)}
                  onViewDetails={() => handleViewDetails(activePlan.id)}
                  onDelete={() => handleDeletePlan(activePlan.id)}
                />
              </div>
            </div>
          </div>
        )}


        {plans.filter((plan) => !plan.is_active).map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onStart={() => handleStartPlan(plan.id)}
            onContinue={() => handleContinuePlan(plan.id)}
            onViewDetails={() => handleViewDetails(plan.id)}
            onDelete={() => handleDeletePlan(plan.id)}
          />
        ))}


        {plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tienes planes de ejercicio aún.</p>
            <p className="text-gray-500 mt-2">¡Crea tu primer plan personalizado!</p>
          </div>
        )}
      </div>

      {/* Modal de detalles del plan */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{selectedPlanName}</h2>
              <button onClick={handleCloseDetailsModal} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedPlanExercises.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No hay ejercicios asignados a este plan</p>
              ) : (
                selectedPlanExercises.map((planExercise, index) => (
                  <div
                    key={planExercise.id}
                    className="bg-[#2D2D2D] p-4 rounded-md border border-[#3D3D3D] hover:border-[#1DB954]/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#1DB954] font-bold text-sm">#{index + 1}</span>
                          <h3 className="text-white font-semibold">{planExercise.exercises.name}</h3>
                        </div>
                        {planExercise.exercises.description && (
                          <p className="text-gray-400 text-sm mt-2">{planExercise.exercises.description}</p>
                        )}
                        <div className="flex flex-wrap gap-3 mt-3">
                          {planExercise.exercises.muscle_group && (
                            <span className="text-xs px-2 py-1 bg-[#1DB954]/10 text-[#1DB954] rounded">
                              {planExercise.exercises.muscle_group}
                            </span>
                          )}
                          {planExercise.exercises.difficulty && (
                            <span className="text-xs px-2 py-1 bg-gray-500/10 text-gray-400 rounded">
                              {planExercise.exercises.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-3 text-sm">
                      {planExercise.sets && (
                        <div className="text-gray-400">
                          <span className="text-white font-medium">{planExercise.sets}</span> series
                        </div>
                      )}
                      {planExercise.reps && (
                        <div className="text-gray-400">
                          <span className="text-white font-medium">{planExercise.reps}</span> reps
                        </div>
                      )}
                      {planExercise.duration_minutes && (
                        <div className="text-gray-400">
                          <span className="text-white font-medium">{planExercise.duration_minutes}</span> min
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#2D2D2D]">
              <button
                onClick={handleCloseDetailsModal}
                className="px-6 py-2 rounded-md bg-[#2D2D2D] text-white hover:bg-[#3D3D3D] transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear plan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Nuevo Plan Personalizado</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Nombre del Plan *</label>
                <input
                  type="text"
                  name="plan_name"
                  placeholder="Ej: Rutina de Fuerza"
                  className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  value={newPlan.plan_name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Objetivo *</label>
                <input
                  type="text"
                  name="goal"
                  placeholder="Ej. Pérdida de Peso, Ganancia Muscular"
                  className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  value={newPlan.goal}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Descripción</label>
                <textarea
                  name="description"
                  placeholder="Describe tu plan..."
                  className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none resize-none"
                  rows={3}
                  value={newPlan.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Dificultad</label>
                <select
                  name="difficulty"
                  value={newPlan.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Fecha de Inicio *</label>
                  <input
                    type="date"
                    name="start_date"
                    value={newPlan.start_date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Fecha de Fin</label>
                  <input
                    type="date"
                    name="end_date"
                    value={newPlan.end_date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Número de Sesiones</label>
                  <input
                    type="number"
                    name="totalSessions"
                    placeholder="0"
                    value={newPlan.totalSessions || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Calorías Estimadas</label>
                  <input
                    type="number"
                    name="estimatedCalories"
                    placeholder="0"
                    value={newPlan.estimatedCalories || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Hora de Notificación</label>
                  <input
                    type="time"
                    name="notification_time"
                    value={newPlan.notification_time || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Selecciona ejercicios:</label>
                <div className="max-h-48 overflow-y-auto space-y-2 border border-[#3D3D3D] rounded-lg p-3">
                  {availableExercises.length === 0 ? (
                    <p className="text-gray-500 text-sm">No hay ejercicios disponibles</p>
                  ) : (
                    availableExercises.map(ex => (
                      <label key={ex.id} className="flex items-center gap-3 p-2 hover:bg-[#2D2D2D] rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          value={ex.id}
                          checked={newPlan.exercises.includes(ex.id)}
                          onChange={e => {
                            const id = e.target.value
                            setNewPlan(prev => {
                              const selected = prev.exercises
                              if (selected.includes(id)) {
                                return { ...prev, exercises: selected.filter(x => x !== id) }
                              } else {
                                return { ...prev, exercises: [...selected, id] }
                              }
                            })
                          }}
                          className="w-4 h-4 accent-[#1DB954]"
                        />
                        <div className="flex-1">
                          <span className="text-white text-sm">{ex.name}</span>
                          {ex.muscle_group && (
                            <span className="text-gray-500 text-xs ml-2">({ex.muscle_group})</span>
                          )}
                        </div>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {newPlan.exercises.length} ejercicio(s) seleccionado(s)
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#2D2D2D]">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 rounded-md border border-[#2D2D2D] text-white hover:bg-[#2D2D2D] transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitPlan}
                  className="px-6 py-2 rounded-md bg-[#1DB954] text-black font-medium hover:opacity-90 transition-opacity"
                >
                  Crear Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}