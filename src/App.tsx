import React, { useState, useEffect } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const BASE_WORKTIME = 25 * MINUTE

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(BASE_WORKTIME)
  let interval: NodeJS.Timeout | undefined

  useEffect(() => {
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [interval])

  const countdown = () => {
    setTimeLeft((prevTimeLeft) => {
      if (prevTimeLeft - SECOND <= 0 && interval) {
        clearInterval(interval)
        return 0
      }
      return prevTimeLeft - SECOND
    })
  }

  const onStartTimer = () => {
    countdown()
    interval = setInterval(countdown, SECOND)
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

  const { minutes, seconds } = getTimeLeft()

  return (
    <div>
      <span>{formatDigit(minutes)}</span>
      <span>:</span>
      <span>{formatDigit(seconds)}</span>
      <button onClick={onStartTimer}>start</button>
    </div>
  )
}

export default App
