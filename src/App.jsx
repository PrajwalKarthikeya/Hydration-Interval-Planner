import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { calculateHydration } from './utils/hydrationCalculator'
import { playNotificationSound } from './utils/audioNotification'
import ConfigForm from './components/ConfigForm'
import Timer from './components/Timer'
import HydrationSchedule from './components/HydrationSchedule'
import NotificationToast from './components/NotificationToast'

function App() {
  const [config, setConfig] = useState(null)
  const [schedule, setSchedule] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentInterval, setCurrentInterval] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [notification, setNotification] = useState(null)
  const [sessionStartTime, setSessionStartTime] = useState(null)

  const timerRef = useRef(null)
  const notificationTimeoutRef = useRef(null)

  const startSession = useCallback((userConfig) => {
    const hydrationData = calculateHydration(
      userConfig.weight,
      userConfig.intensity,
      userConfig.temperature,
      userConfig.duration
    )

    setConfig(userConfig)
    setSchedule(hydrationData)
    setCurrentInterval(0)
    setTimeRemaining(hydrationData.intervalMinutes * 60)
    setIsRunning(true)
    setSessionStartTime(Date.now())

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const stopSession = useCallback(() => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setConfig(null)
    setSchedule(null)
    setCurrentInterval(0)
    setTimeRemaining(0)
    setSessionStartTime(null)
  }, [])

  const pauseSession = useCallback(() => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const resumeSession = useCallback(() => {
    setIsRunning(true)
  }, [])

  const showNotification = useCallback((amount) => {
    const message = `Time to hydrate! Drink ${amount}ml of water`

    // Play sound
    playNotificationSound()

    // Show toast
    setNotification(message)

    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Hydration Reminder', {
        body: message,
        icon: '/water-icon.png',
        badge: '/water-icon.png',
        tag: 'hydration-reminder',
        requireInteraction: false
      })
    }

    // Clear previous timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    // Auto-hide toast after 5 seconds
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [])

  const dismissNotification = useCallback(() => {
    setNotification(null)
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (isRunning && schedule) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time to hydrate!
            const nextInterval = currentInterval + 1

            if (nextInterval < schedule.totalIntervals) {
              setCurrentInterval(nextInterval)
              showNotification(schedule.amountPerInterval)
              return schedule.intervalMinutes * 60
            } else {
              // Session complete
              showNotification(schedule.amountPerInterval)
              stopSession()
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, schedule, currentInterval, showNotification, stopSession])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1><span className="emoji">💧</span>Hydration Planner</h1>
          <p className="subtitle">Personalized hydration intervals for optimal performance</p>
        </header>

        {!schedule ? (
          <ConfigForm onStart={startSession} />
        ) : (
          <div className="session-container">
            <Timer
              timeRemaining={timeRemaining}
              currentInterval={currentInterval}
              totalIntervals={schedule.totalIntervals}
              isRunning={isRunning}
              onPause={pauseSession}
              onResume={resumeSession}
              onStop={stopSession}
            />

            <HydrationSchedule
              schedule={schedule}
              currentInterval={currentInterval}
              sessionStartTime={sessionStartTime}
            />
          </div>
        )}

        {notification && (
          <NotificationToast
            message={notification}
            onDismiss={dismissNotification}
          />
        )}
      </div>
    </div>
  )
}

export default App
