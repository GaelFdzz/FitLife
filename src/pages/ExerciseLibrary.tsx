import { useEffect, useState } from "react"
import { Search, Filter, Play, Eye, Clock, Flame, Target, Dumbbell } from "lucide-react"

// Types
interface Exercise {
    id: string
    name: string
    description: string
    duration: number
    difficulty: "Principiante" | "Intermedio" | "Avanzado"
    category: string
    targetMuscles: string[]
    calories: number
    equipment: string
}

interface Filters {
    search?: string
    category?: string
    difficulty?: string
    equipment?: string
    muscles?: string[]
}

// ExerciseCard component
function ExerciseCard({
    exercise,
    onStart,
    onViewDetails
}: {
    exercise: Exercise
    onStart: () => void
    onViewDetails: () => void
}) {
    const getDifficultyColor = (difficulty: Exercise["difficulty"]) => {
        switch (difficulty) {
            case 'Principiante': return 'text-green-400 bg-green-400/10'
            case 'Intermedio': return 'text-yellow-400 bg-yellow-400/10'
            case 'Avanzado': return 'text-red-400 bg-red-400/10'
            default: return 'text-gray-400 bg-gray-400/10'
        }
    }

    return (
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-2xl p-6 hover:border-[#1DB954]/50 hover:bg-[#1A1A1A]/80 transition-all duration-300 group">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="bg-[#1DB954]/10 rounded-full p-3">
                        <Dumbbell className="h-6 w-6 text-[#1DB954]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                    </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors">
                            {exercise.name}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                            {exercise.description}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#1DB954]" />
                            <span className="text-sm text-gray-400">{exercise.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-[#1DB954]" />
                            <span className="text-sm text-gray-400">{exercise.calories} cal</span>
                        </div>
                    </div>

                    {/* Target Muscles */}
                    <div className="flex flex-wrap gap-2">
                        {exercise.targetMuscles.slice(0, 3).map((muscle, index) => (
                            <span key={index} className="px-2 py-1 bg-[#2D2D2D] rounded-lg text-xs text-gray-400">
                                {muscle}
                            </span>
                        ))}
                        {exercise.targetMuscles.length > 3 && (
                            <span className="px-2 py-1 bg-[#2D2D2D] rounded-lg text-xs text-gray-400">
                                +{exercise.targetMuscles.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-[#2D2D2D]">
                    <button
                        onClick={onStart}
                        className="flex-1 bg-[#1DB954] text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <Play className="h-4 w-4" />
                        Iniciar
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

// ExerciseFilters component
function ExerciseFilters({
    onFiltersChange,
    filters
}: {
    onFiltersChange: (filters: Filters) => void
    filters: Filters
}) {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [equipment, setEquipment] = useState("")

    // Sincroniza los filtros externos con los internos
    useEffect(() => {
        setSearch(filters.search || "")
        setCategory(filters.category || "")
        setDifficulty(filters.difficulty || "")
        setEquipment(filters.equipment || "")
    }, [filters])

    const categories = ["Fuerza", "HIIT", "Core", "Yoga", "Cardio"]
    const difficulties: Exercise["difficulty"][] = ["Principiante", "Intermedio", "Avanzado"]
    const equipments = ["Sin equipo", "Barra", "Mancuernas", "Máquina"]

    const updateFilters = (newFilters: Filters) => {
        onFiltersChange(newFilters)
    }

    const handleSearchChange = (value: string) => {
        setSearch(value)
        updateFilters({ search: value, category, difficulty, equipment })
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        updateFilters({ search, category: value, difficulty, equipment })
    }

    const handleDifficultyChange = (value: string) => {
        setDifficulty(value)
        updateFilters({ search, category, difficulty: value, equipment })
    }

    const handleEquipmentChange = (value: string) => {
        setEquipment(value)
        updateFilters({ search, category, difficulty, equipment: value })
    }

    const clearFilters = () => {
        setSearch("")
        setCategory("")
        setDifficulty("")
        setEquipment("")
        updateFilters({})
    }

    return (
        <div className="sticky top-6 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-[#1DB954]" />
                <h3 className="text-lg font-semibold text-white">Filtros</h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Buscar ejercicio</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nombre del ejercicio..."
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-[#1DB954] focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Categoría</label>
                <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#1DB954] focus:outline-none transition-colors"
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Dificultad</label>
                <select
                    value={difficulty}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#1DB954] focus:outline-none transition-colors"
                >
                    <option value="">Todas las dificultades</option>
                    {difficulties.map((diff) => (
                        <option key={diff} value={diff}>{diff}</option>
                    ))}
                </select>
            </div>

            {/* Equipment */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Equipo</label>
                <select
                    value={equipment}
                    onChange={(e) => handleEquipmentChange(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#1DB954] focus:outline-none transition-colors"
                >
                    <option value="">Todo el equipo</option>
                    {equipments.map((eq) => (
                        <option key={eq} value={eq}>{eq}</option>
                    ))}
                </select>
            </div>

            {/* Clear Filters */}
            <button
                onClick={clearFilters}
                className="w-full bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white py-2 rounded-lg transition-colors font-medium"
            >
                Limpiar Filtros
            </button>
        </div>
    )
}

export default function ExerciseLibraryPage() {
    const [filters, setFilters] = useState<Filters>({})

    const handleClearFilters = () => {
        setFilters({})
    }

    // Mock data - En una aplicación real, esto vendría de una API o Supabase
    const exercises: Exercise[] = [
        {
            id: "1",
            name: "Flexiones de Pecho",
            description: "Ejercicio básico para fortalecer pecho, hombros y tríceps",
            duration: 15,
            difficulty: "Principiante",
            category: "Fuerza",
            targetMuscles: ["Pecho", "Tríceps", "Hombros"],
            calories: 120,
            equipment: "Sin equipo",
        },
        {
            id: "2",
            name: "Sentadillas",
            description: "Ejercicio fundamental para piernas y glúteos",
            duration: 20,
            difficulty: "Principiante",
            category: "Fuerza",
            targetMuscles: ["Piernas", "Glúteos"],
            calories: 150,
            equipment: "Sin equipo",
        },
        {
            id: "3",
            name: "Burpees",
            description: "Ejercicio de cuerpo completo de alta intensidad",
            duration: 10,
            difficulty: "Avanzado",
            category: "HIIT",
            targetMuscles: ["Core", "Piernas", "Pecho", "Hombros"],
            calories: 200,
            equipment: "Sin equipo",
        },
        {
            id: "4",
            name: "Plancha",
            description: "Fortalece el core y mejora la estabilidad",
            duration: 5,
            difficulty: "Intermedio",
            category: "Core",
            targetMuscles: ["Abdomen", "Core"],
            calories: 80,
            equipment: "Sin equipo",
        },
        {
            id: "5",
            name: "Press de Banca",
            description: "Ejercicio clásico para desarrollo del pecho",
            duration: 25,
            difficulty: "Intermedio",
            category: "Fuerza",
            targetMuscles: ["Pecho", "Tríceps", "Hombros"],
            calories: 180,
            equipment: "Barra",
        },
        {
            id: "6",
            name: "Yoga Flow Matutino",
            description: "Secuencia suave para comenzar el día",
            duration: 30,
            difficulty: "Principiante",
            category: "Yoga",
            targetMuscles: ["Flexibilidad", "Core"],
            calories: 100,
            equipment: "Sin equipo",
        },
        {
            id: "7",
            name: "Mountain Climbers",
            description: "Ejercicio cardiovascular de alta intensidad",
            duration: 8,
            difficulty: "Intermedio",
            category: "HIIT",
            targetMuscles: ["Core", "Piernas", "Hombros"],
            calories: 160,
            equipment: "Sin equipo",
        },
        {
            id: "8",
            name: "Peso Muerto",
            description: "Ejercicio compuesto para fortalecer la cadena posterior",
            duration: 20,
            difficulty: "Avanzado",
            category: "Fuerza",
            targetMuscles: ["Espalda", "Glúteos", "Piernas"],
            calories: 220,
            equipment: "Barra",
        },
    ]

    const filteredExercises = exercises.filter((exercise) => {
        if (filters.search && !exercise.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false
        }
        if (filters.category && exercise.category !== filters.category) {
            return false
        }
        if (filters.difficulty && exercise.difficulty !== filters.difficulty) {
            return false
        }
        if (filters.equipment && exercise.equipment !== filters.equipment) {
            return false
        }
        if (filters.muscles && filters.muscles.length > 0) {
            const hasMatchingMuscle = filters.muscles.some((muscle) => exercise.targetMuscles.includes(muscle))
            if (!hasMatchingMuscle) return false
        }
        return true
    })

    const handleStartExercise = (exerciseId: string) => {
        console.log("Iniciando ejercicio:", exerciseId)
        // En una aplicación real, aquí navegarías a la página del ejercicio
        // navigate(`/exercise/${exerciseId}`)
    }

    const handleViewDetails = (exerciseId: string) => {
        console.log("Ver detalles del ejercicio:", exerciseId)
        // En una aplicación real, aquí navegarías a los detalles del ejercicio
        // navigate(`/exercise/${exerciseId}/details`)
    }

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Biblioteca de Ejercicios</h1>
                    <p className="text-gray-400">
                        Explora nuestra colección de más de 500 ejercicios categorizados por tipo y dificultad.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <ExerciseFilters
                            onFiltersChange={setFilters}
                            filters={filters} // <-- pasa los filtros actuales
                        />
                    </div>

                    {/* Exercise Grid */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {/* Results Header */}
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-400">
                                    Mostrando <span className="text-[#1DB954] font-medium">{filteredExercises.length}</span> de{" "}
                                    <span className="text-white font-medium">{exercises.length}</span> ejercicios
                                </p>
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-[#1DB954]" />
                                    <span className="text-sm text-gray-400">Encuentra tu ejercicio perfecto</span>
                                </div>
                            </div>

                            {/* Exercise Cards Grid */}
                            {filteredExercises.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredExercises.map((exercise) => (
                                        <ExerciseCard
                                            key={exercise.id}
                                            exercise={exercise}
                                            onStart={() => handleStartExercise(exercise.id)}
                                            onViewDetails={() => handleViewDetails(exercise.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="text-center py-12">
                                    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-8 max-w-md mx-auto">
                                        <div className="bg-[#1DB954]/10 rounded-full p-4 w-fit mx-auto mb-4">
                                            <Target className="h-8 w-8 text-[#1DB954]" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">No se encontraron ejercicios</h3>
                                        <p className="text-gray-400 mb-4">
                                            Intenta ajustar los filtros para encontrar más ejercicios.
                                        </p>
                                        <button
                                            onClick={handleClearFilters}
                                            className="text-[#1DB954] hover:text-[#00C078] font-medium transition-colors"
                                        >
                                            Limpiar todos los filtros
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}