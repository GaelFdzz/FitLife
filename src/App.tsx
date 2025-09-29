import { Route, Routes } from "react-router-dom"
import LandinPage from "./pages/LandinPage"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import ExerciseLibrary from "./pages/ExerciseLibrary"
import ExercisePlan from "./pages/ExercisePlan"
import Notifications from "./pages/Notifications"
import Nutrition from "./pages/Nutrition"
import Progress from "./pages/Progress"
import Achievements from "./pages/Achievements"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Register from "./pages/Register"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes with dashboard layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="exercise-library" element={<ExerciseLibrary />} />
          <Route path="exercise-plans" element={<ExercisePlan />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
