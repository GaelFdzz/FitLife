"use client"

import { useState } from "react"
import { Calendar, TrendingUp, Apple, Search, Plus, Edit3, Trash2, Target, Droplets, Zap } from "lucide-react"

// Types
interface FoodEntry {
  id: string
  name: string
  quantity: number
  serving: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
}

interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fat: number
  water: number
}

interface CurrentIntake {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  water: number
}

// DailySummary Component
function DailySummary({ goals, intake }: { goals: NutritionGoals; intake: CurrentIntake }) {
  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100
    if (percentage >= 90) return 'from-[#00D084] to-[#00C078]'
    if (percentage >= 70) return 'from-yellow-500 to-yellow-600'
    return 'from-gray-500 to-gray-600'
  }

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Resumen Diario</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Calories */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#1DB954]" />
            <span className="text-sm font-medium text-gray-400">Calorías</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{intake.calories}</span>
              <span className="text-sm text-gray-400">/ {goals.calories}</span>
            </div>
            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${getProgressColor(intake.calories, goals.calories)} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${getProgressPercentage(intake.calories, goals.calories)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(getProgressPercentage(intake.calories, goals.calories))}% del objetivo
            </p>
          </div>
        </div>

        {/* Protein */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Proteína</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{intake.protein}g</span>
              <span className="text-sm text-gray-400">/ {goals.protein}g</span>
            </div>
            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage(intake.protein, goals.protein)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(getProgressPercentage(intake.protein, goals.protein))}% del objetivo
            </p>
          </div>
        </div>

        {/* Carbs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Apple className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-400">Carbohidratos</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{intake.carbs}g</span>
              <span className="text-sm text-gray-400">/ {goals.carbs}g</span>
            </div>
            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage(intake.carbs, goals.carbs)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(getProgressPercentage(intake.carbs, goals.carbs))}% del objetivo
            </p>
          </div>
        </div>

        {/* Fat */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-400">Grasas</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{intake.fat}g</span>
              <span className="text-sm text-gray-400">/ {goals.fat}g</span>
            </div>
            <div className="w-full bg-[#2D2D2D] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage(intake.fat, goals.fat)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(getProgressPercentage(intake.fat, goals.fat))}% del objetivo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// FoodSearch Component
function FoodSearch({ onAddFood }: { onAddFood: (food: any, quantity: number) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [quantity, setQuantity] = useState(1)

  // Mock food database
  const mockFoods = [
    { name: "Pechuga de Pollo", serving: "100g", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Arroz Integral", serving: "100g", calories: 111, protein: 2.6, carbs: 22, fat: 0.9 },
    { name: "Brócoli", serving: "100g", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: "Salmón", serving: "100g", calories: 208, protein: 20, carbs: 0, fat: 13 },
    { name: "Quinoa", serving: "100g", calories: 120, protein: 4.4, carbs: 22, fat: 1.9 },
  ]

  const filteredFoods = mockFoods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddFood = (food: any) => {
    onAddFood(food, quantity)
    setSearchQuery("")
    setQuantity(1)
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Buscar Alimentos</h3>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-[#1DB954] focus:outline-none transition-colors"
          />
        </div>

        {searchQuery && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredFoods.map((food, index) => (
              <div key={index} className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{food.name}</h4>
                  <button
                    onClick={() => handleAddFood(food)}
                    className="bg-[#1DB954] text-black px-3 py-1 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Agregar
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                  <span>{food.calories} cal</span>
                  <span>{food.protein}g P</span>
                  <span>{food.carbs}g C</span>
                  <span>{food.fat}g G</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// MealLog Component
function MealLog({ 
  meals, 
  onAddFood, 
  onEditFood, 
  onDeleteFood 
}: {
  meals: any
  onAddFood: (mealType: string) => void
  onEditFood: (foodId: string) => void
  onDeleteFood: (foodId: string) => void
}) {
  const mealTypes = [
    { key: 'breakfast', label: 'Desayuno', emoji: '🌅', color: 'bg-yellow-500/10 border-yellow-500/20' },
    { key: 'lunch', label: 'Almuerzo', emoji: '☀️', color: 'bg-orange-500/10 border-orange-500/20' },
    { key: 'dinner', label: 'Cena', emoji: '🌙', color: 'bg-purple-500/10 border-purple-500/20' },
    { key: 'snacks', label: 'Snacks', emoji: '🍎', color: 'bg-green-500/10 border-green-500/20' },
  ]

  return (
    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Registro de Comidas</h3>
      
      <div className="space-y-6">
        {mealTypes.map(meal => (
          <div key={meal.key} className={`border rounded-xl p-4 ${meal.color}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{meal.emoji}</span>
                <h4 className="font-semibold text-white">{meal.label}</h4>
                <span className="text-sm text-gray-400">
                  ({meals[meal.key]?.length || 0} {meals[meal.key]?.length === 1 ? 'alimento' : 'alimentos'})
                </span>
              </div>
              <button
                onClick={() => onAddFood(meal.key)}
                className="text-[#1DB954] hover:text-[#00C078] transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {meals[meal.key]?.length > 0 ? (
                meals[meal.key].map((food: FoodEntry) => (
                  <div key={food.id} className="bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-white">{food.name}</h5>
                          <span className="text-sm text-gray-400">
                            {food.quantity} {food.serving}
                          </span>
                          <span className="text-xs text-gray-500">{food.time}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm text-gray-400">
                          <span>{food.calories * food.quantity} cal</span>
                          <span>{food.protein * food.quantity}g P</span>
                          <span>{food.carbs * food.quantity}g C</span>
                          <span>{food.fat * food.quantity}g G</span>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <button
                          onClick={() => onEditFood(food.id)}
                          className="p-2 text-gray-400 hover:text-[#1DB954] transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteFood(food.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm">No hay alimentos registrados</p>
                  <button
                    onClick={() => onAddFood(meal.key)}
                    className="text-[#1DB954] hover:text-[#00C078] text-sm font-medium mt-1 transition-colors"
                  >
                    Agregar primer alimento
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// StatCard Component
function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon 
}: {
  title: string
  value: string | number
  subtitle: string
  icon: any
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
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

export default function Nutrition() {
  // Mock data - En una aplicación real, esto vendría de Supabase
  const [nutritionGoals] = useState<NutritionGoals>({
    calories: 2200,
    protein: 150,
    carbs: 275,
    fat: 73,
    water: 2.5,
  })

  const [meals, setMeals] = useState({
    breakfast: [
      {
        id: "1",
        name: "Avena con Plátano",
        quantity: 1,
        serving: "tazón",
        calories: 320,
        protein: 12,
        carbs: 58,
        fat: 6,
        time: "08:30",
      },
      {
        id: "2",
        name: "Café con Leche",
        quantity: 1,
        serving: "taza",
        calories: 80,
        protein: 4,
        carbs: 8,
        fat: 3,
        time: "08:35",
      },
    ] as FoodEntry[],
    lunch: [
      {
        id: "3",
        name: "Ensalada César con Pollo",
        quantity: 1,
        serving: "plato",
        calories: 420,
        protein: 35,
        carbs: 15,
        fat: 25,
        time: "13:15",
      },
    ] as FoodEntry[],
    dinner: [] as FoodEntry[],
    snacks: [
      {
        id: "4",
        name: "Almendras",
        quantity: 1,
        serving: "puñado (30g)",
        calories: 170,
        protein: 6,
        carbs: 6,
        fat: 15,
        time: "16:00",
      },
    ] as FoodEntry[],
  })

  // Calculate current intake
  const currentIntake: CurrentIntake = Object.values(meals)
    .flat()
    .reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories * food.quantity,
        protein: totals.protein + food.protein * food.quantity,
        carbs: totals.carbs + food.carbs * food.quantity,
        fat: totals.fat + food.fat * food.quantity,
        fiber: totals.fiber + 2, // Mock fiber calculation
        water: 1.8, // Mock water intake
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, water: 0 }
    )

  const handleAddFood = (food: any, quantity: number) => {
    const newFood: FoodEntry = {
      id: Date.now().toString(),
      name: food.name,
      quantity,
      serving: food.serving,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    }

    // For demo purposes, add to breakfast
    setMeals((prev) => ({
      ...prev,
      breakfast: [...prev.breakfast, newFood],
    }))
  }

  const handleAddFoodToMeal = (mealType: string) => {
    console.log("Agregar comida a:", mealType)
    // En una aplicación real, aquí se abriría un modal o navegaría a la búsqueda
  }

  const handleEditFood = (foodId: string) => {
    console.log("Editar comida:", foodId)
    // En una aplicación real, aquí se abriría un modal de edición
  }

  const handleDeleteFood = (foodId: string) => {
    setMeals((prev) => ({
      breakfast: prev.breakfast.filter((food) => food.id !== foodId),
      lunch: prev.lunch.filter((food) => food.id !== foodId),
      dinner: prev.dinner.filter((food) => food.id !== foodId),
      snacks: prev.snacks.filter((food) => food.id !== foodId),
    }))
  }

  const totalMealsToday = Object.values(meals).reduce((total, meal) => total + meal.length, 0)

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Seguimiento Nutricional</h1>
            <p className="text-gray-400">
              Registra tus comidas y mantén un control de tu nutrición diaria.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg transition-colors">
              <Calendar className="h-4 w-4" />
              Historial
            </button>
            <button className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg transition-colors">
              <TrendingUp className="h-4 w-4" />
              Análisis
            </button>
          </div>
        </div>

        {/* Daily Summary */}
        <DailySummary goals={nutritionGoals} intake={currentIntake} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Search */}
          <div className="lg:col-span-1">
            <FoodSearch onAddFood={handleAddFood} />
          </div>

          {/* Meal Log */}
          <div className="lg:col-span-2">
            <MealLog
              meals={meals}
              onAddFood={handleAddFoodToMeal}
              onEditFood={handleEditFood}
              onDeleteFood={handleDeleteFood}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Comidas Registradas"
            value={totalMealsToday}
            subtitle="hoy"
            icon={Apple}
          />
          <StatCard
            title="Racha Actual"
            value="7"
            subtitle="días registrando"
            icon={TrendingUp}
          />
          <StatCard
            title="Promedio Semanal"
            value="2,150"
            subtitle="kcal/día"
            icon={Calendar}
          />
        </div>
      </div>
    </div>
  )
}