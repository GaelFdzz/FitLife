"use client"

import { useState } from "react"
import { Bell, Check, X, Trophy, Target, Calendar, Utensils, User } from "lucide-react"

// Types
interface Notification {
  id: string
  type: "achievement" | "reminder" | "goal" | "social"
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ReactNode
}

// NotificationCenter Component
export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Nuevo Logro Desbloqueado!",
      message: "Has completado 7 días consecutivos de ejercicio",
      time: "2 min",
      read: false,
      icon: <Trophy className="h-4 w-4 text-[#1DB954]" />,
    },
    {
      id: "2",
      type: "reminder",
      title: "Hora de Entrenar",
      message: "Tu rutina de piernas está programada para ahora",
      time: "15 min",
      read: false,
      icon: <Calendar className="h-4 w-4 text-blue-400" />,
    },
    {
      id: "3",
      type: "goal",
      title: "Meta Alcanzada",
      message: "Has quemado 500 calorías hoy. ¡Excelente trabajo!",
      time: "1 hora",
      read: true,
      icon: <Target className="h-4 w-4 text-orange-400" />,
    },
    {
      id: "4",
      type: "reminder",
      title: "Registro Nutricional",
      message: "No olvides registrar tu cena",
      time: "2 horas",
      read: true,
      icon: <Utensils className="h-4 w-4 text-purple-400" />,
    },
    {
      id: "5",
      type: "social",
      title: "Nuevo Seguidor",
      message: "María González ha comenzado a seguirte",
      time: "3 horas",
      read: false,
      icon: <User className="h-4 w-4 text-pink-400" />,
    },
    {
      id: "6",
      type: "achievement",
      title: "Récord Personal",
      message: "Has establecido un nuevo récord en press de banca: 80kg",
      time: "1 día",
      read: true,
      icon: <Trophy className="h-4 w-4 text-[#1DB954]" />,
    },
  ])
  
  const [showAll, setShowAll] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length
  const displayNotifications = showAll ? notifications : notifications.slice(0, 4)

  const markAsRead = (id: string) => {
    setNotifications((prev) => 
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-[#1DB954]/5 border-[#1DB954]/20'
      case 'reminder': return 'bg-blue-400/5 border-blue-400/20'
      case 'goal': return 'bg-orange-400/5 border-orange-400/20'
      case 'social': return 'bg-pink-400/5 border-pink-400/20'
      default: return 'bg-gray-400/5 border-gray-400/20'
    }
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#2D2D2D]">
        <div className="flex items-center gap-3">
          <div className="bg-[#1DB954]/10 rounded-full p-2">
            <Bell className="h-5 w-5 text-[#1DB954]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Notificaciones</h2>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">{unreadCount} sin leer</span>
              </div>
            )}
          </div>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-[#1DB954] hover:text-[#00C078] font-medium text-sm transition-colors"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-[#2D2D2D]">
        {displayNotifications.length > 0 ? (
          displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 transition-all duration-200 hover:bg-[#1A1A1A]/80 ${
                !notification.read ? getNotificationBgColor(notification.type) : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-[#2D2D2D] rounded-full p-2">
                    {notification.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${
                        notification.read ? "text-gray-300" : "text-white"
                      }`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-[#1DB954] rounded-full inline-block" />
                        )}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        notification.read ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">hace {notification.time}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 rounded-lg hover:bg-[#2D2D2D] text-[#1DB954] hover:text-[#00C078] transition-all"
                          title="Marcar como leída"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-2 rounded-lg hover:bg-[#2D2D2D] text-gray-500 hover:text-red-400 transition-all"
                        title="Eliminar notificación"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="text-center py-12 px-6">
            <div className="bg-[#2D2D2D]/50 rounded-full p-4 w-fit mx-auto mb-4">
              <Bell className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No tienes notificaciones</h3>
            <p className="text-gray-400">Cuando tengas nuevas notificaciones aparecerán aquí</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 4 && (
        <div className="p-4 border-t border-[#2D2D2D]">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-[#1DB954] hover:text-[#00C078] font-medium text-sm transition-colors py-2"
          >
            {showAll ? "Mostrar menos" : `Ver todas las notificaciones (${notifications.length})`}
          </button>
        </div>
      )}
    </div>
  )
}