import { Navigate, Route, Routes } from "react-router-dom"

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
import { AuthProvider, useAuth } from "./context/AuthContext"
import LoginPage from "./pages/Login"
import LandinPage from "./pages/LandinPage"
import { ToastContainer } from "react-toastify"

function App() {

  // Componente para proteger rutas
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
      return <div>Cargando autenticación...</div>
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000} // tiempo en ms
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <AuthProvider> {/* Envuelve tus rutas con AuthProvider */}
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          {/* Rutas protegidas con DashboardLayout */}
          <Route
            path="/dashboard/*" // Usa /* para rutas anidadas
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
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
      </AuthProvider>
    </>
  )
}

export default App
