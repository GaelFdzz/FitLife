import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signUp = async (
  email: string,
  password: string,
  userData: {
    fullName: string
    age: string
    weight: string
    height: string
    goal: string
  }
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: userData.fullName,
        age: parseInt(userData.age),
        weight: parseFloat(userData.weight),
        height: parseFloat(userData.height),
        goal: userData.goal,
      },
      emailRedirectTo: window.location.origin,
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function createProfile(userId: string, profileData: {
  fullName: string
  age: string
  weight: string
  height: string
  goal: string
}) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          full_name: profileData.fullName,
          age: parseInt(profileData.age),
          weight_kg: parseFloat(profileData.weight),
          height_cm: parseFloat(profileData.height),
          goal: profileData.goal,
        }
      ])
      .select()

    if (error) {
      console.error('Error creando perfil en Supabase:', error)
      throw error
    }

    console.log('Perfil creado exitosamente:', data)
    return { data, error: null }
  } catch (err) {
    console.error('Error inesperado al crear perfil:', err)
    throw err
  }
}

export async function createExercisePlan(userId: string, planData: {
  planName: string
  startDate: string
  endDate?: string
  goal?: string
}) {
  const { data, error } = await supabase
    .from('exercise_plans')
    .insert([
      {
        user_id: userId,
        plan_name: planData.planName,
        start_date: planData.startDate,
        end_date: planData.endDate,
        goal: planData.goal,
        is_active: true,
      }
    ])
    .select()

  if (error) {
    console.error('Error creando plan:', error)
    throw error
  }

  return data[0]
}

export async function getUserExercisePlans(userId: string) {
  const { data, error } = await supabase
    .from('exercise_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error obteniendo planes:', error)
    throw error
  }

  return data
}

export async function updateExercisePlanStatus(userId: string, planIdToActivate: string) {
  try {
    const { error: deactivateError } = await supabase
      .from('exercise_plans')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true)

    if (deactivateError) throw deactivateError

    const { data, error: activateError } = await supabase
      .from('exercise_plans')
      .update({ is_active: true })
      .eq('id', planIdToActivate)
      .select()

    if (activateError) throw activateError

    return data[0]
  } catch (error) {
    console.error('Error al actualizar el estado del plan:', error)
    throw error
  }
}

export async function deleteExercisePlan(planId: string) {
  try {
    const { error: deleteLogsError } = await supabase
      .from('user_exercise_logs')
      .delete()
      .eq('plan_id', planId)
    if (deleteLogsError) throw deleteLogsError

    const { error: deleteSessionsError } = await supabase
      .from('workout_sessions')
      .delete()
      .eq('plan_id', planId)
    if (deleteSessionsError) throw deleteSessionsError

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

    return { success: true }
  } catch (error) {
    console.error('Error al eliminar el plan:', error)
    throw error
  }
}




export async function addExerciseToPlan(planId: string, exerciseId: string, options?: {
  dayOfWeek?: number
  sets?: number
  reps?: number
  durationMinutes?: number
  distanceKm?: number
  weightKg?: number
  orderInPlan?: number
}) {
  const { data, error } = await supabase
    .from('plan_exercises')
    .insert([
      {
        plan_id: planId,
        exercise_id: exerciseId,
        day_of_week: options?.dayOfWeek,
        sets: options?.sets,
        reps: options?.reps,
        duration_minutes: options?.durationMinutes,
        distance_km: options?.distanceKm,
        weight_kg: options?.weightKg,
        order_in_plan: options?.orderInPlan,
      }
    ])
    .select()

  if (error) {
    console.error('Error agregando ejercicio al plan:', error)
    throw error
  }

  return data[0]
}

export async function getExercisesByPlan(planId: string) {
  const { data, error } = await supabase
    .from('plan_exercises')
    .select(`
      *,
      exercises(*)
    `)
    .eq('plan_id', planId)
    .order('order_in_plan', { ascending: true })

  if (error) {
    console.error('Error obteniendo ejercicios del plan:', error)
    throw error
  }

  return data
}

// ============================================
// FUNCIONES PARA SESIONES DE ENTRENAMIENTO
// ============================================

export async function startWorkoutSession(userId: string, planId: string) {
  try {
    const { data: plan } = await supabase
      .from('exercise_plans')
      .select('completed_sessions, total_sessions')
      .eq('id', planId)
      .single()

    const nextSessionNumber = (plan?.completed_sessions ?? 0) + 1

    const { data: planExercises } = await supabase
      .from('plan_exercises')
      .select('id')
      .eq('plan_id', planId)

    const { data: session, error } = await supabase
      .from('workout_sessions')
      .insert([{
        user_id: userId,
        plan_id: planId,
        session_number: nextSessionNumber,
        total_exercises: planExercises?.length ?? 0,
        exercises_completed: 0,
        status: 'in_progress',
        date_started: new Date().toISOString()
      }])
      .select()

    if (error) throw error
    return session[0]
  } catch (error) {
    console.error('Error iniciando sesión de entrenamiento:', error)
    throw error
  }
}

export async function getActiveWorkoutSession(userId: string, planId: string) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('plan_id', planId)
    .eq('status', 'in_progress')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error && error.code !== 'PGRST116') {
    console.error('Error obteniendo sesión activa:', error)
    throw error
  }

  return data
}

export async function logExerciseCompletion(data: {
  userId: string
  exerciseId: string
  planId: string
  sessionId?: string
  setsCompleted?: number
  repsCompleted?: number
  durationMinutes?: number
  distanceKm?: number
  weightKg?: number
  notes?: string
}) {
  const { data: log, error } = await supabase
    .from('user_exercise_logs')
    .insert([{
      user_id: data.userId,
      exercise_id: data.exerciseId,
      plan_id: data.planId,
      date_completed: new Date().toISOString(),
      sets_completed: data.setsCompleted,
      reps_completed: data.repsCompleted,
      duration_minutes_completed: data.durationMinutes,
      distance_km_completed: data.distanceKm,
      weight_kg_used: data.weightKg,
      notes: data.notes
    }])
    .select()

  if (error) {
    console.error('Error registrando ejercicio:', error)
    throw error
  }

  // Actualizar contador de ejercicios completados en la sesión
  if (data.sessionId) {
    await supabase.rpc('increment_session_exercises', {
      session_id: data.sessionId
    })
  }

  return log[0]
}

export async function completeWorkoutSession(sessionId: string, planId: string) {
  try {
    // Completar la sesión
    const { error: sessionError } = await supabase
      .from('workout_sessions')
      .update({
        status: 'completed',
        date_completed: new Date().toISOString()
      })
      .eq('id', sessionId)

    if (sessionError) throw sessionError

    // Incrementar completed_sessions del plan
    const { data: plan, error: planError } = await supabase
      .from('exercise_plans')
      .select('completed_sessions')
      .eq('id', planId)
      .single()

    if (planError) throw planError

    const { error: updateError } = await supabase
      .from('exercise_plans')
      .update({
        completed_sessions: (plan?.completed_sessions ?? 0) + 1
      })
      .eq('id', planId)

    if (updateError) throw updateError

    return { success: true }
  } catch (error) {
    console.error('Error completando sesión:', error)
    throw error
  }
}

export async function cancelWorkoutSession(sessionId: string) {
  const { error } = await supabase
    .from('workout_sessions')
    .update({
      status: 'cancelled',
      date_completed: new Date().toISOString()
    })
    .eq('id', sessionId)

  if (error) {
    console.error('Error cancelando sesión:', error)
    throw error
  }

  return { success: true }
}

export async function getWorkoutHistory(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      exercise_plans(plan_name, goal)
    `)
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('date_completed', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error obteniendo historial:', error)
    throw error
  }

  return data
}

export async function getExerciseLogs(userId: string, exerciseId?: string, planId?: string) {
  let query = supabase
    .from('user_exercise_logs')
    .select(`
      *,
      exercises(name, muscle_group)
    `)
    .eq('user_id', userId)
    .order('date_completed', { ascending: false })

  if (exerciseId) {
    query = query.eq('exercise_id', exerciseId)
  }

  if (planId) {
    query = query.eq('plan_id', planId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error obteniendo logs de ejercicios:', error)
    throw error
  }

  return data
}