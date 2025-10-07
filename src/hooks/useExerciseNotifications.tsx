import { useEffect, useRef } from "react"
import { supabase } from "../lib/supabaseClient"
import { toast } from "react-toastify"

export function useExerciseNotifications(userId: string | undefined) {
    const notifiedToday = useRef<{ [planId: string]: string }>({})

    useEffect(() => {
        if (!userId) return

        async function fetchPendingNotifications() {
            const today = new Date().toISOString().slice(0, 10)
            const { data } = await supabase
                .from("notifications")
                .select("id, title, message, scheduled_at")
                .eq("user_id", userId)
                .eq("is_read", false)
                .gte("scheduled_at", today + "T00:00:00")
                .lte("scheduled_at", today + "T23:59:59")

            if (data && data.length > 0) {
                data.forEach(n => {
                    toast.info(`${n.title}: ${n.message}`)
                })
            }
        }

        fetchPendingNotifications()

        const interval = setInterval(async () => {
            const now = new Date()
            const currentTime = now.toTimeString().slice(0, 5)
            const today = now.toISOString().slice(0, 10)

            const { data: plans } = await supabase
                .from("exercise_plans")
                .select("id, plan_name, notification_time, is_active")
                .eq("user_id", userId)
                .eq("is_active", true)

            plans?.forEach(plan => {
                if (
                    plan.notification_time?.slice(0, 5) === currentTime &&
                    notifiedToday.current[plan.id] !== today
                ) {
                    toast.info(`¡Hora de entrenar! Plan: ${plan.plan_name}`)
                    notifiedToday.current[plan.id] = today
                }
            })
            // console.log("Notificacion checada a la hora: ", currentTime, plans)
        }, 60000) // cada minuto

        return () => clearInterval(interval)
    }, [userId])
}