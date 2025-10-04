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