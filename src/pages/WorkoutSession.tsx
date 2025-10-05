import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    Play,
    Pause,
    CheckCircle2,
    XCircle,
    Timer,
    Dumbbell,
    TrendingUp,
    ChevronLeft,
    Save
} from "lucide-react"
import {
    supabase,
    getExercisesByPlan,
    startWorkoutSession,
    getActiveWorkoutSession,
    logExerciseCompletion,
    completeWorkoutSession,
    cancelWorkoutSession
} from "../lib/supabaseClient"

interface Exercise {
    id: string
    name: string
    description?: string
    muscle_group?: string
    difficulty?: string
    instructions?: string
}

interface PlanExercise {
    id: string
    exercise_id: string
    sets?: number
    reps?: number
    duration_minutes?: number
    distance_km?: number
    weight_kg?: number
    order_in_plan: number
    exercises: Exercise
}

interface ExerciseLog {
    exerciseId: string
    setsCompleted: number
    repsCompleted: number
    durationMinutes: number
    weightKg: number
    notes: string
    completed: boolean
}

export default function WorkoutSession() {
    const { planId } = useParams<{ planId: string }>()
    const navigate = useNavigate()

    const [exercises, setExercises] = useState<PlanExercise[]>([])
    const [sessionId, setSessionId] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date())
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(true)

    const [exerciseLogs, setExerciseLogs] = useState<Record<string, ExerciseLog>>({})

    useEffect(() => {
        if (planId) {
            initializeSession()
        }
    }, [planId])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000))
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isTimerRunning, sessionStartTime])

    const initializeSession = async () => {
        try {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                navigate('/login')
                return
            }

            // Verificar si hay una sesión activa
            const activeSession = await getActiveWorkoutSession(user.id, planId!)

            if (activeSession) {
                setSessionId(activeSession.id)
                setSessionStartTime(new Date(activeSession.date_started))
            } else {
                // Crear nueva sesión
                const newSession = await startWorkoutSession(user.id, planId!)
                setSessionId(newSession.id)
                setSessionStartTime(new Date(newSession.date_started))
            }

            // Cargar ejercicios del plan
            const planExercises = await getExercisesByPlan(planId!)
            setExercises(planExercises)

            // Inicializar logs de ejercicios
            const initialLogs: Record<string, ExerciseLog> = {}
            planExercises.forEach((ex) => {
                initialLogs[ex.exercise_id] = {
                    exerciseId: ex.exercise_id,
                    setsCompleted: ex.sets || 0,
                    repsCompleted: ex.reps || 0,
                    durationMinutes: ex.duration_minutes || 0,
                    weightKg: ex.weight_kg || 0,
                    notes: "",
                    completed: false
                }
            })
            setExerciseLogs(initialLogs)

        } catch (err) {
            console.error("Error inicializando sesión:", err)
            alert("Error al cargar la sesión de entrenamiento")
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleLogChange = (exerciseId: string, field: keyof ExerciseLog, value: number | string) => {
        setExerciseLogs(prev => ({
            ...prev,
            [exerciseId]: {
                ...prev[exerciseId],
                [field]: value
            }
        }))
    }

    const handleCompleteExercise = async (exerciseId: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const log = exerciseLogs[exerciseId]

            await logExerciseCompletion({
                userId: user.id,
                exerciseId: exerciseId,
                planId: planId!,
                sessionId: sessionId,
                setsCompleted: log.setsCompleted,
                repsCompleted: log.repsCompleted,
                durationMinutes: log.durationMinutes,
                weightKg: log.weightKg,
                notes: log.notes
            })

            setExerciseLogs(prev => ({
                ...prev,
                [exerciseId]: {
                    ...prev[exerciseId],
                    completed: true
                }
            }))

            // Avanzar al siguiente ejercicio si existe
            if (currentExerciseIndex < exercises.length - 1) {
                setCurrentExerciseIndex(currentExerciseIndex + 1)
            }

        } catch (err) {
            console.error("Error completando ejercicio:", err)
            alert("Error al registrar el ejercicio")
        }
    }

    const handleFinishSession = async () => {
        const completedCount = Object.values(exerciseLogs).filter(log => log.completed).length
        const totalCount = exercises.length

        if (completedCount === 0) {
            alert("Debes completar al menos un ejercicio antes de finalizar la sesión")
            return
        }

        const confirmFinish = window.confirm(
            `Has completado ${completedCount} de ${totalCount} ejercicios. ¿Deseas finalizar la sesión?`
        )

        if (!confirmFinish) return

        try {
            setIsTimerRunning(false)
            await completeWorkoutSession(sessionId, planId!)
            alert("¡Sesión completada exitosamente!")
            navigate('/dashboard/exercise-plans')
        } catch (err) {
            console.error("Error finalizando sesión:", err)
            alert("Error al finalizar la sesión")
        }
    }

    const handleCancelSession = async () => {
        const confirmCancel = window.confirm(
            "¿Estás seguro de que deseas cancelar esta sesión? Se perderá tu progreso."
        )

        if (!confirmCancel) return

        try {
            setIsTimerRunning(false)
            await cancelWorkoutSession(sessionId)
            navigate('/dashboard/exercise-plans')
        } catch (err) {
            console.error("Error cancelando sesión:", err)
            alert("Error al cancelar la sesión")
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-lg">Cargando sesión...</div>
            </div>
        )
    }

    if (exercises.length === 0) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/dashboard/exercise-plans')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Volver a planes
                    </button>
                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-8 text-center">
                        <p className="text-gray-400 text-lg">No hay ejercicios en este plan</p>
                    </div>
                </div>
            </div>
        )
    }

    const currentExercise = exercises[currentExerciseIndex]
    const completedCount = Object.values(exerciseLogs).filter(log => log.completed).length
    const progress = (completedCount / exercises.length) * 100

    return (
        <div className="min-h-screen p-6 bg-[#0A0A0A]">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard/exercise-plans')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Volver
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#2D2D2D]">
                            <Timer className="h-5 w-5 text-[#1DB954]" />
                            <span className="text-white font-mono text-lg">{formatTime(elapsedTime)}</span>
                            <button
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                                className="ml-2 text-[#1DB954] hover:text-[#1ed760]"
                            >
                                {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-[#1DB954]" />
                            <span className="text-white font-medium">Progreso de la sesión</span>
                        </div>
                        <span className="text-sm text-gray-400">
                            {completedCount}/{exercises.length} ejercicios
                        </span>
                    </div>
                    <div className="w-full bg-[#2D2D2D] rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{Math.round(progress)}% completado</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lista de ejercicios */}
                    <div className="lg:col-span-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-[#1DB954]" />
                            Ejercicios
                        </h3>
                        <div className="space-y-2">
                            {exercises.map((ex, index) => {
                                const isCompleted = exerciseLogs[ex.exercise_id]?.completed
                                const isCurrent = index === currentExerciseIndex

                                return (
                                    <button
                                        key={ex.id}
                                        onClick={() => setCurrentExerciseIndex(index)}
                                        className={`w-full text-left p-3 rounded-lg transition-all ${isCurrent
                                                ? 'bg-[#1DB954]/10 border border-[#1DB954]'
                                                : isCompleted
                                                    ? 'bg-[#2D2D2D] border border-[#3D3D3D]'
                                                    : 'bg-[#1A1A1A] border border-[#2D2D2D] hover:bg-[#2D2D2D]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isCompleted ? (
                                                <CheckCircle2 className="h-5 w-5 text-[#1DB954]" />
                                            ) : (
                                                <div className="h-5 w-5 rounded-full border-2 border-gray-600" />
                                            )}
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                                                    {ex.exercises.name}
                                                </p>
                                                {ex.sets && ex.reps && (
                                                    <p className="text-xs text-gray-500">
                                                        {ex.sets}x{ex.reps}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Ejercicio actual */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="text-[#1DB954] text-sm font-medium">
                                        Ejercicio {currentExerciseIndex + 1} de {exercises.length}
                                    </span>
                                    <h2 className="text-2xl font-bold text-white mt-1">
                                        {currentExercise.exercises.name}
                                    </h2>
                                </div>
                                {exerciseLogs[currentExercise.exercise_id]?.completed && (
                                    <CheckCircle2 className="h-8 w-8 text-[#1DB954]" />
                                )}
                            </div>

                            {currentExercise.exercises.muscle_group && (
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-[#1DB954]/10 text-[#1DB954] text-sm rounded-full">
                                        {currentExercise.exercises.muscle_group}
                                    </span>
                                </div>
                            )}

                            {currentExercise.exercises.description && (
                                <p className="text-gray-400 mb-4">{currentExercise.exercises.description}</p>
                            )}

                            {currentExercise.exercises.instructions && (
                                <div className="bg-[#2D2D2D] p-4 rounded-lg mb-6">
                                    <h4 className="text-white font-medium mb-2">Instrucciones:</h4>
                                    <p className="text-gray-400 text-sm">{currentExercise.exercises.instructions}</p>
                                </div>
                            )}

                            {/* Inputs para registrar */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {currentExercise.sets && (
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Series</label>
                                        <input
                                            type="number"
                                            value={exerciseLogs[currentExercise.exercise_id]?.setsCompleted || ''}
                                            onChange={(e) => handleLogChange(currentExercise.exercise_id, 'setsCompleted', parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-lg bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                                            placeholder={`Meta: ${currentExercise.sets}`}
                                            disabled={exerciseLogs[currentExercise.exercise_id]?.completed}
                                        />
                                    </div>
                                )}

                                {currentExercise.reps && (
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Repeticiones</label>
                                        <input
                                            type="number"
                                            value={exerciseLogs[currentExercise.exercise_id]?.repsCompleted || ''}
                                            onChange={(e) => handleLogChange(currentExercise.exercise_id, 'repsCompleted', parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-lg bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                                            placeholder={`Meta: ${currentExercise.reps}`}
                                            disabled={exerciseLogs[currentExercise.exercise_id]?.completed}
                                        />
                                    </div>
                                )}

                                {currentExercise.duration_minutes && (
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Duración (min)</label>
                                        <input
                                            type="number"
                                            value={exerciseLogs[currentExercise.exercise_id]?.durationMinutes || ''}
                                            onChange={(e) => handleLogChange(currentExercise.exercise_id, 'durationMinutes', parseInt(e.target.value) || 0)}
                                            className="w-full p-3 rounded-lg bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                                            placeholder={`Meta: ${currentExercise.duration_minutes}`}
                                            disabled={exerciseLogs[currentExercise.exercise_id]?.completed}
                                        />
                                    </div>
                                )}

                                {currentExercise.weight_kg && (
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Peso (kg)</label>
                                        <input
                                            type="number"
                                            step="0.5"
                                            value={exerciseLogs[currentExercise.exercise_id]?.weightKg || ''}
                                            onChange={(e) => handleLogChange(currentExercise.exercise_id, 'weightKg', parseFloat(e.target.value) || 0)}
                                            className="w-full p-3 rounded-lg bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none"
                                            placeholder={`Sugerido: ${currentExercise.weight_kg}`}
                                            disabled={exerciseLogs[currentExercise.exercise_id]?.completed}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Notas */}
                            <div className="mb-6">
                                <label className="text-sm text-gray-400 mb-2 block">Notas (opcional)</label>
                                <textarea
                                    value={exerciseLogs[currentExercise.exercise_id]?.notes || ''}
                                    onChange={(e) => handleLogChange(currentExercise.exercise_id, 'notes', e.target.value)}
                                    className="w-full p-3 rounded-lg bg-[#2D2D2D] text-white border border-[#3D3D3D] focus:border-[#1DB954] outline-none resize-none"
                                    rows={3}
                                    placeholder="Cómo te sentiste, dificultades, etc..."
                                    disabled={exerciseLogs[currentExercise.exercise_id]?.completed}
                                />
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-3">
                                {!exerciseLogs[currentExercise.exercise_id]?.completed ? (
                                    <button
                                        onClick={() => handleCompleteExercise(currentExercise.exercise_id)}
                                        className="flex-1 bg-[#1DB954] text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="h-5 w-5" />
                                        Completar Ejercicio
                                    </button>
                                ) : (
                                    <div className="flex-1 bg-[#1DB954]/10 border border-[#1DB954] text-[#1DB954] px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                                        <CheckCircle2 className="h-5 w-5" />
                                        Ejercicio Completado
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Botones de sesión */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelSession}
                                className="flex-1 bg-[#2D2D2D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3D3D3D] transition-colors flex items-center justify-center gap-2 border border-red-500/20"
                            >
                                <XCircle className="h-5 w-5 text-red-400" />
                                Cancelar Sesión
                            </button>
                            <button
                                onClick={handleFinishSession}
                                className="flex-1 bg-[#1DB954] text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Save className="h-5 w-5" />
                                Finalizar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}