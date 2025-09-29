import AchievementsOverview from "../components/AchievementsOverview";

export default function Achievements() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Logros y Recompensas</h1>
          <p className="text-gray-400">
            Desbloquea logros completando entrenamientos y alcanzando tus metas de fitness
          </p>
        </div>
        <AchievementsOverview />
      </div>
    </div>
  )
}