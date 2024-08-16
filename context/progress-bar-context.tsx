'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, useMotionTemplate, useSpring, motion } from 'framer-motion'

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      tick()
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
type ProgressBarContextType = ReturnType<typeof useProgress> | null
type ProgressBarContextProviderProps = {
  children: React.ReactNode
}

const ProgressBarContext = createContext<ProgressBarContextType>(null)

export const ProgressBarContextProvider = ({ children }: ProgressBarContextProviderProps) => {
  const progress = useProgress()
  const width = useMotionTemplate`${progress.value}%`
  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== 'complete' && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className="fixed top-0 h-1 bg-sky-500 z-[100]"
          />
        )}
      </AnimatePresence>
      {children}
    </ProgressBarContext.Provider>
  )
}

export function useProgressBar() {
  const context = useContext(ProgressBarContext)
  if (!context) {
    throw new Error('useProgressBar must be used within a ProgressBarContextProvider.')
  }
  return context
}

export function useProgress() {
  const [state, setState] = useState<'initial' | 'in-progress' | 'completing' | 'complete'>(
    'initial',
  )
  const value = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  })
  useInterval(
    () => {
      // if progress complete, reset it
      if (value.get() === 100) {
        value.jump(0)
      }
      // 进度越靠前，增长越慢
      const current = value.get()
      let diff
      if (current === 0) {
        diff = 15
      } else if (current < 50) {
        diff = rand(1, 10)
      } else {
        diff = rand(1, 5)
      }
      value.set(Math.min(current + diff, 99))
    },
    state === 'in-progress' ? 750 : null,
  )
  useEffect(() => {
    if (state === 'initial') {
      value.jump(0)
    } else if (state === 'completing') {
      value.set(100)
    }
    return value.on('change', (latest) => {
      if (latest === 100) {
        setState('complete')
      }
    })
  }, [value, state])

  function start() {
    setState('in-progress')
  }
  function done() {
    setState((state) => (state === 'initial' || state === 'in-progress' ? 'completing' : state))
  }
  function reset() {
    setState('initial')
  }

  return {
    state,
    value,
    start,
    done,
    reset,
  }
}
