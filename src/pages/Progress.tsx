import { useState } from "react"
import { BarChart3, Calendar, Download, TrendingDown, Flame, Activity, ChevronDown } from "lucide-react"
import { LineChart } from '@mui/x-charts/LineChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'

// Types
interface WeightData {
    date: string
    weight: number
    target: number
}

interface WorkoutData {
    week: string
    workouts: number
    duration: number
    calories: number
}

interface MacroData {
    id: number
    value: number
    label: string
    color: string
}

interface CalorieData {
    date: string
    calories: number
    target: number
}

interface BodyMeasurement {
    date: string
    chest: number
    waist: number
    hips: number
    arms: number
    thighs: number
}

// WeightChart Component
function WeightChart({ data }: { data: WeightData[] }) { // <-- Elimina goal, no se usa
    const dates = data.map(item => item.date)
    const weights = data.map(item => item.weight)
    const targets = data.map(item => item.target)

    return (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Progreso de Peso</h2>
                    <p className="text-gray-400 text-sm mt-1">Seguimiento vs objetivo</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-[#1DB954]/10 rounded-full p-2">
                        <TrendingDown className="h-5 w-5 text-[#1DB954]" />
                    </div>
                </div>
            </div>

            <div className="h-80">
                <LineChart
                    width={800}
                    height={300}
                    series={[
                        {
                            data: weights,
                            label: 'Peso Actual',
                            color: '#1DB954',
                            curve: 'linear'
                        },
                        {
                            data: targets,
                            label: 'Objetivo',
                            color: '#A3A3A3',
                            curve: 'linear'
                        }
                    ]}
                    xAxis={[{
                        scaleType: 'point',
                        data: dates,
                        tickLabelStyle: {
                            fill: '#A3A3A3',
                            fontSize: 12
                        }
                    }]}
                    yAxis={[{
                        tickLabelStyle: {
                            fill: '#A3A3A3',
                            fontSize: 12
                        }
                    }]}
                    sx={{
                        '& .MuiChartsAxis-root .MuiChartsAxis-line': {
                            stroke: '#2D2D2D'
                        },
                        '& .MuiChartsAxis-root .MuiChartsAxis-tick': {
                            stroke: '#2D2D2D'
                        },
                        '& .MuiChartsGrid-line': {
                            stroke: '#2D2D2D',
                            strokeDasharray: '3 3'
                        },
                        '& .MuiChartsLegend-root': {
                            '& text': {
                                fill: '#FAFAFA !important'
                            }
                        },
                        '& .MuiChartsTooltip-root': {
                            backgroundColor: '#1A1A1A',
                            border: '1px solid #2D2D2D',
                            borderRadius: '8px',
                            color: '#FAFAFA'
                        }
                    }}
                    margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </div>
        </div>
    )
}

// WorkoutChart Component
function WorkoutChart({ data }: { data: WorkoutData[] }) {
    const weeks = data.map(item => item.week)
    const workouts = data.map(item => item.workouts)
    const duration = data.map(item => item.duration)

    return (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Actividad de Entrenamientos</h2>
                    <p className="text-gray-400 text-sm mt-1">Sesiones y duración por semana</p>
                </div>
                <div className="bg-[#1DB954]/10 rounded-full p-2">
                    <Activity className="h-5 w-5 text-[#1DB954]" />
                </div>
            </div>

            <div className="h-80">
                <BarChart
                    width={800}
                    height={300}
                    series={[
                        {
                            data: workouts,
                            label: 'Entrenamientos',
                            color: '#1DB954'
                        },
                        {
                            data: duration.map(d => d / 10), // Escalar para mejor visualización
                            label: 'Duración (x10 min)',
                            color: '#0EA5E9'
                        }
                    ]}
                    xAxis={[{
                        scaleType: 'band',
                        data: weeks,
                        tickLabelStyle: {
                            fill: '#A3A3A3',
                            fontSize: 12
                        }
                    }]}
                    yAxis={[{
                        tickLabelStyle: {
                            fill: '#A3A3A3',
                            fontSize: 12
                        }
                    }]}
                    sx={{
                        '& .MuiChartsAxis-root .MuiChartsAxis-line': {
                            stroke: '#2D2D2D'
                        },
                        '& .MuiChartsAxis-root .MuiChartsAxis-tick': {
                            stroke: '#2D2D2D'
                        },
                        '& .MuiChartsGrid-line': {
                            stroke: '#2D2D2D',
                            strokeDasharray: '3 3'
                        },
                        '& .MuiChartsLegend-root': {
                            '& text': {
                                fill: '#FAFAFA !important'
                            }
                        }
                    }}
                    margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </div>
        </div>
    )
}

// NutritionChart Component
function NutritionChart({ macroData, calorieData }: { macroData: MacroData[]; calorieData: CalorieData[] }) {
    const calorieDates = calorieData.map(item => item.date)
    const calories = calorieData.map(item => item.calories)
    const targets = calorieData.map(item => item.target)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Macronutrientes */}
            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Distribución de Macros</h2>
                        <p className="text-gray-400 text-sm mt-1">Promedio semanal</p>
                    </div>
                </div>

                <div className="h-64 flex items-center justify-center">
                    <PieChart
                        series={[
                            {
                                data: macroData,
                                highlightScope: { fade: 'series', highlighted: 'series' }, // <-- CORRECTO
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 2,
                                cornerRadius: 5
                            }
                        ]}
                        width={350}
                        height={250}
                        sx={{
                            '& .MuiChartsLegend-root': {
                                '& text': {
                                    fill: '#FAFAFA !important'
                                }
                            }
                        }}
                        margin={{ right: 5 }}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                    {macroData.map((macro, index) => (
                        <div key={index} className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: macro.color }}
                                />
                                <span className="text-sm text-gray-400">{macro.label}</span>
                            </div>
                            <p className="text-lg font-semibold text-white">{macro.value}g</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Calorías */}
            <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Calorías Diarias</h2>
                        <p className="text-gray-400 text-sm mt-1">Consumo vs objetivo</p>
                    </div>
                    <div className="bg-[#1DB954]/10 rounded-full p-2">
                        <Flame className="h-5 w-5 text-[#1DB954]" />
                    </div>
                </div>

                <div className="h-64">
                    <BarChart
                        width={400}
                        height={250}
                        series={[
                            {
                                data: calories,
                                label: 'Consumidas',
                                color: '#1DB954'
                            }
                        ]}
                        xAxis={[{
                            scaleType: 'band',
                            data: calorieDates,
                            tickLabelStyle: {
                                fill: '#A3A3A3',
                                fontSize: 12
                            }
                        }]}
                        yAxis={[{
                            tickLabelStyle: {
                                fill: '#A3A3A3',
                                fontSize: 12
                            }
                        }]}
                        sx={{
                            '& .MuiChartsAxis-root .MuiChartsAxis-line': {
                                stroke: '#2D2D2D'
                            },
                            '& .MuiChartsAxis-root .MuiChartsAxis-tick': {
                                stroke: '#2D2D2D'
                            },
                            '& .MuiChartsGrid-line': {
                                stroke: '#2D2D2D',
                                strokeDasharray: '3 3'
                            },
                            '& .MuiChartsLegend-root': {
                                '& text': {
                                    fill: '#FAFAFA !important'
                                }
                            }
                        }}
                        margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
                        grid={{ vertical: true, horizontal: true }}
                    />

                    {/* Línea de objetivo superpuesta */}
                    <div className="relative -mt-64 h-64 pointer-events-none">
                        <div
                            className="absolute w-full border-t-2 border-dashed border-[#A3A3A3]"
                            style={{
                                top: `${100 - ((targets[0] - Math.min(...calories)) / (Math.max(...calories) - Math.min(...calories))) * 100}%`
                            }}
                        />
                        <span
                            className="absolute text-xs text-[#A3A3A3] bg-[#1A1A1A] px-2 right-0"
                            style={{
                                top: `${100 - ((targets[0] - Math.min(...calories)) / (Math.max(...calories) - Math.min(...calories))) * 100}%`
                            }}
                        >
                            Objetivo: {targets[0]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// BodyMeasurements Component
function BodyMeasurements({ data }: { data: BodyMeasurement[] }) {
    const [selectedMeasurement, setSelectedMeasurement] = useState<string>('waist')

    const measurementOptions = [
        { key: 'chest', label: 'Pecho', color: '#1DB954' },
        { key: 'waist', label: 'Cintura', color: '#0EA5E9' },
        { key: 'hips', label: 'Caderas', color: '#F59E0B' },
        { key: 'arms', label: 'Brazos', color: '#EF4444' },
        { key: 'thighs', label: 'Muslos', color: '#8B5CF6' },
    ]

    const selectedOption = measurementOptions.find(opt => opt.key === selectedMeasurement)
    const dates = data.map(item => item.date)
    const values = data.map(item => item[selectedMeasurement as keyof BodyMeasurement] as number)

    return (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Medidas Corporales</h2>
                    <p className="text-gray-400 text-sm mt-1">Evolución de tus medidas</p>
                </div>

                <div className="relative">
                    <select
                        value={selectedMeasurement}
                        onChange={(e) => setSelectedMeasurement(e.target.value)}
                        className="bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                    >
                        {measurementOptions.map((option) => (
                            <option key={option.key} value={option.key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="h-80">
                <LineChart
                    width={800}
                    height={300}
                    series={[
                        {
                            data: values,
                            label: `${selectedOption?.label} (cm)`,
                            color: selectedOption?.color || '#1DB954',
                            curve: 'linear'
                        }
                    ]}
                    xAxis={[{
                        scaleType: 'point',
                        data: dates,
                        tickLabelStyle: {
                            fill: '#A3A3A3',
                            fontSize: 12
                        }
                    }]}
                    yAxis={[{
                        tickLabelStyle: {
                            fill: '#A3A3A3',
                            fontSize: 12
                        }
                    }]}
                    sx={{
                        '& .MuiChartsAxis-root .MuiChartsAxis-line': {
                            stroke: '#2D2D2D'
                        },
                        '& .MuiChartsAxis-root .MuiChartsAxis-tick': {
                            stroke: '#2D2D2D'
                        },
                        '& .MuiChartsGrid-line': {
                            stroke: '#2D2D2D',
                            strokeDasharray: '3 3'
                        },
                        '& .MuiChartsLegend-root': {
                            '& text': {
                                fill: '#FAFAFA !important'
                            }
                        }
                    }}
                    margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
                    grid={{ vertical: true, horizontal: true }}
                />
            </div>

            <div className="grid grid-cols-5 gap-4 mt-6">
                {measurementOptions.map((option) => {
                    const latestData = data[data.length - 1]
                    const previousData = data[data.length - 2]
                    const currentValue = latestData?.[option.key as keyof BodyMeasurement] as number
                    const previousValue = previousData?.[option.key as keyof BodyMeasurement] as number
                    const change = currentValue - previousValue

                    return (
                        <div
                            key={option.key}
                            className={`text-center p-3 rounded-lg border cursor-pointer transition-all ${selectedMeasurement === option.key
                                ? 'border-[#1DB954] bg-[#1DB954]/10'
                                : 'border-[#2D2D2D] hover:border-[#404040]'
                                }`}
                            onClick={() => setSelectedMeasurement(option.key)}
                        >
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: option.color }}
                                />
                                <span className="text-xs text-gray-400">{option.label}</span>
                            </div>
                            <p className="text-lg font-semibold text-white">{currentValue} cm</p>
                            {change !== 0 && (
                                <p className={`text-xs ${change > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    {change > 0 ? '+' : ''}{change.toFixed(1)} cm
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// StatCard Component
function StatCard({
    title,
    value,
    subtitle,
    badge,
    icon: Icon
}: {
    title: string
    value: string
    subtitle: string
    badge?: { text: string; variant?: 'success' | 'warning' | 'default' }
    icon?: any
}) {
    const getBadgeStyles = (variant?: string) => {
        switch (variant) {
            case 'success':
                return 'bg-[#1DB954] text-black'
            case 'warning':
                return 'bg-yellow-500 text-black'
            default:
                return 'bg-[#2D2D2D] text-gray-300'
        }
    }

    return (
        <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-6 hover:border-[#1DB954]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-400">{title}</h3>
                {badge ? (
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getBadgeStyles(badge.variant)}`}>
                        {badge.text}
                    </span>
                ) : (
                    Icon && (
                        <div className="bg-[#1DB954]/10 rounded-full p-2">
                            <Icon className="h-4 w-4 text-[#1DB954]" />
                        </div>
                    )
                )}
            </div>
            <div className="space-y-1">
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-gray-400">{subtitle}</p>
            </div>
        </div>
    )
}

export default function Progress() {
    const [timeRange, setTimeRange] = useState("30d")

    // Mock data - En una aplicación real, esto vendría de Supabase
    const weightData: WeightData[] = [
        { date: "01/01", weight: 78, target: 75 },
        { date: "08/01", weight: 77.5, target: 75 },
        { date: "15/01", weight: 77, target: 75 },
        { date: "22/01", weight: 76.5, target: 75 },
        { date: "29/01", weight: 76, target: 75 },
        { date: "05/02", weight: 75.8, target: 75 },
        { date: "12/02", weight: 75.5, target: 75 },
        { date: "19/02", weight: 75.2, target: 75 },
    ]

    const workoutData: WorkoutData[] = [
        { week: "Sem 1", workouts: 4, duration: 240, calories: 1200 },
        { week: "Sem 2", workouts: 5, duration: 300, calories: 1500 },
        { week: "Sem 3", workouts: 3, duration: 180, calories: 900 },
        { week: "Sem 4", workouts: 6, duration: 360, calories: 1800 },
        { week: "Sem 5", workouts: 4, duration: 240, calories: 1200 },
        { week: "Sem 6", workouts: 5, duration: 300, calories: 1500 },
    ]

    const macroData: MacroData[] = [
        { id: 0, label: "Proteínas", value: 120, color: "#EF4444" },
        { id: 1, label: "Carbohidratos", value: 200, color: "#3B82F6" },
        { id: 2, label: "Grasas", value: 70, color: "#F59E0B" },
    ]

    const calorieData: CalorieData[] = [
        { date: "Lun", calories: 2100, target: 2200 },
        { date: "Mar", calories: 2250, target: 2200 },
        { date: "Mié", calories: 2180, target: 2200 },
        { date: "Jue", calories: 2300, target: 2200 },
        { date: "Vie", calories: 2150, target: 2200 },
        { date: "Sáb", calories: 2400, target: 2200 },
        { date: "Dom", calories: 2050, target: 2200 },
    ]

    const bodyMeasurements: BodyMeasurement[] = [
        { date: "01/01", chest: 100, waist: 85, hips: 95, arms: 35, thighs: 60 },
        { date: "15/01", chest: 101, waist: 84, hips: 95, arms: 35.5, thighs: 60.5 },
        { date: "01/02", chest: 102, waist: 83, hips: 94, arms: 36, thighs: 61 },
        { date: "15/02", chest: 103, waist: 82, hips: 94, arms: 36.5, thighs: 61.5 },
    ]

    const timeRangeOptions = [
        { value: "7d", label: "7 días" },
        { value: "30d", label: "30 días" },
        { value: "90d", label: "90 días" },
        { value: "1y", label: "1 año" },
    ]

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">Seguimiento de Progreso</h1>
                        <p className="text-gray-400">
                            Visualiza tu progreso con gráficos detallados y métricas clave.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-[#2D2D2D] border border-[#404040] text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:border-[#1DB954] focus:outline-none"
                            >
                                {timeRangeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                        <button className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white px-4 py-2 rounded-lg transition-colors">
                            <Download className="h-4 w-4" />
                            Exportar
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                        title="Peso Actual"
                        value="75.2 kg"
                        subtitle="Meta: 75 kg"
                        badge={{ text: "-2.8 kg", variant: "success" }}
                    />
                    <StatCard
                        title="Entrenamientos"
                        value="27"
                        subtitle="este mes"
                        icon={BarChart3}
                    />
                    <StatCard
                        title="Calorías Promedio"
                        value="2,204"
                        subtitle="kcal/día"
                        badge={{ text: "95% adherencia", variant: "default" }}
                    />
                    <StatCard
                        title="Racha Actual"
                        value="14"
                        subtitle="días activos"
                        icon={Calendar}
                    />
                </div>

                {/* Charts Grid */}
                <div className="space-y-8">
                    {/* Weight Progress */}
                    <WeightChart data={weightData} />

                    {/* Workout Activity */}
                    <WorkoutChart data={workoutData} />

                    {/* Nutrition Charts */}
                    <NutritionChart macroData={macroData} calorieData={calorieData} />

                    {/* Body Measurements */}
                    <BodyMeasurements data={bodyMeasurements} />
                </div>
            </div>
        </div>
    )
}