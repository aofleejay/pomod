import React, { useState, useEffect, useRef } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const BASE_WORKTIME = 25 * MINUTE

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(BASE_WORKTIME)
  const [timerState, setTimerState] = useState('stop')
  const interval = useRef<number | undefined>()

  useEffect(() => {
    return () => {
      setTimerState('stop')
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [])

  const countdown = () => {
    setTimeLeft((prevTimeLeft) => {
      if (prevTimeLeft - SECOND <= 0 && interval) {
        clearInterval(interval.current)
        return BASE_WORKTIME
      }
      return prevTimeLeft - SECOND
    })
  }

  const formatDigit = (digit: number): string => {
    return digit.toString().padStart(2, '0')
  }

  const getTimeLeft = () => {
    return {
      minutes: Math.floor(timeLeft / MINUTE),
      seconds: Math.floor((timeLeft % MINUTE) / SECOND),
    }
  }

  const toggleTimer = () => {
    console.log(interval)
    if (timerState === 'stop') {
      interval.current = window.setInterval(countdown, SECOND)
      setTimerState('start')
    } else {
      if (interval.current) {
        window.clearInterval(interval.current)
      }
      setTimerState('stop')
    }
  }

  const { minutes, seconds } = getTimeLeft()

  return (
    <div>
      <span>{formatDigit(minutes)}</span>
      <span>:</span>
      <span>{formatDigit(seconds)}</span>
      <button onClick={toggleTimer}>
        {timerState === 'stop' ? 'start' : 'stop'}
      </button>
    </div>
  )
}

export default App
