import React, { useState, useEffect, useRef } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const BASE_WORKTIME = 25 * MINUTE

enum TimerState {
  START = 'start',
  STOP = 'stop',
}

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(BASE_WORKTIME)
  const [timerState, setTimerState] = useState(TimerState.STOP)
  const interval = useRef<number | undefined>()

  const getTimeLeft = () => {
    return {
      minutes: Math.floor(timeLeft / MINUTE)
        .toString()
        .padStart(2, '0'),
      seconds: Math.floor((timeLeft % MINUTE) / SECOND)
        .toString()
        .padStart(2, '0'),
    }
  }

  const { minutes, seconds } = getTimeLeft()

  useEffect(() => {
    document.title = `Pomod - ${minutes}:${seconds}`
  }, [minutes, seconds])

  useEffect(() => {
    return () => {
      setTimerState(TimerState.STOP)
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [])

  const countdown = () => {
    setTimeLeft((prevTimeLeft) => {
      if (prevTimeLeft - SECOND <= 0 && interval.current) {
        clearInterval(interval.current)
        return BASE_WORKTIME
      }
      return prevTimeLeft - SECOND
    })
  }

  const toggleTimer = () => {
    if (timerState === TimerState.STOP) {
      interval.current = window.setInterval(countdown, SECOND)
      setTimerState(TimerState.START)
    } else {
      if (interval.current) {
        window.clearInterval(interval.current)
      }
      setTimerState(TimerState.STOP)
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon',
        color: '#ffffff',
        textTransform: 'uppercase',
      }}
    >
      <h1>Pomod</h1>
      <div style={{ marginBottom: '1rem' }}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <button
        onClick={toggleTimer}
        style={{
          border: 'none',
          outline: 'none',
          padding: '0.5rem 1rem',
          borderRadius: 4,
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
      >
        {timerState === TimerState.STOP ? TimerState.START : TimerState.STOP}
      </button>
    </div>
  )
}

export default App
