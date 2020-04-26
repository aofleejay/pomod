/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import Button from './Button'
import Link from './Link'
import { MINUTE, SECOND } from './constants'
import { getDuration } from './utils'

const WORK_DURATION = 25 * MINUTE
const BREAK_DURATION = 5 * MINUTE

enum TimerState {
  STARTED = 'started',
  STOPPED = 'stopped',
}

const App: React.FC = () => {
  const [remainingTime, setRemainingTime] = useState(WORK_DURATION)
  const [timerState, setTimerState] = useState(TimerState.STOPPED)
  const interval = useRef<number | undefined>()

  const { minutes, seconds } = getDuration(remainingTime)

  useEffect(() => {
    document.title =
      timerState === TimerState.STARTED
        ? `Pomod - ${minutes}:${seconds}`
        : `Pomod - Timer stopped`
  }, [minutes, seconds, timerState])

  useEffect(() => {
    return () => {
      setTimerState(TimerState.STOPPED)
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [])

  const startTimer = () => {
    setRemainingTime((prevRemainingTime) => {
      if (prevRemainingTime - SECOND <= 0 && interval.current) {
        clearInterval(interval.current)
        return 0
      }
      return prevRemainingTime - SECOND
    })
  }

  const setupTimer = (duration: number) => {
    if (interval.current) {
      clearInterval(interval.current)
    }

    setRemainingTime(duration)
    interval.current = window.setInterval(startTimer, SECOND)
    setTimerState(TimerState.STARTED)
  }

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(
          rgba(255, 140, 105, 0.8),
          rgba(255, 140, 105)
        );
        color: #ffffff;
      `}
    >
      <h1
        css={css`
          margin-top 0;
          margin-bottom: 3rem;
          fon-size: 3rem;
          text-transform: uppercase;
        `}
      >
        Pomod
      </h1>
      <div
        css={css`
          margin-bottom: 2rem;
          font-size: 2rem;
        `}
      >
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          grid-gap: 1rem;
        `}
      >
        <Button
          onClick={() => {
            setupTimer(WORK_DURATION)
          }}
        >
          Get to work
        </Button>
        <Button
          onClick={() => {
            setupTimer(BREAK_DURATION)
          }}
        >
          Take a break
        </Button>
      </div>
      <footer
        css={css`
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 1rem;
        `}
      >
        <span>
          Made by <Link to="https://github.com/aofleejay">aofleejay</Link>. |
          View code on{' '}
          <Link to="https://github.com/aofleejay/pomod">GitHub</Link>.
        </span>
      </footer>
    </div>
  )
}

export default App
