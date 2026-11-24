'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { musicSrc } from '@/lib/birthday-content'
import { cn } from '@/lib/utils'
import { CandleScene } from './candle-scene'
import { LibraryScene } from './library-scene'
import { RevealScene } from './reveal-scene'
import { SoundToggle } from './sound-toggle'
import { useAmbientMusic } from './use-ambient-music'

type Stage = 'candle' | 'reveal' | 'library'

const TRANSITION_MS = 1000

export function Experience() {
  const [stage, setStage] = useState<Stage>('candle')
  const [target, setTarget] = useState<Stage>('candle')
  const [visible, setVisible] = useState(true)
  const timer = useRef<number>(0)
  const music = useAmbientMusic(musicSrc)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const goTo = useCallback((next: Stage) => {
    setTarget(next)
    setVisible(false)
    timer.current = window.setTimeout(() => {
      setStage(next)
      window.scrollTo({ top: 0 })
      setVisible(true)
    }, TRANSITION_MS)
  }, [])

  const isDark = target === 'candle'

  return (
    <main
      onPointerDown={music.start}
      onKeyDown={music.start}
      className={cn(
        'relative min-h-dvh transition-colors duration-[1600ms] ease-out',
        isDark ? 'bg-midnight' : 'bg-ivory',
      )}
    >
      {music.started && (
        <SoundToggle
          muted={music.muted}
          onToggle={music.toggleMute}
          tone={stage === 'candle' ? 'dark' : 'light'}
        />
      )}

      <div
        className={cn(
          'transition-[opacity,filter] ease-out',
          visible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
        )}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      >
        {stage === 'candle' && <CandleScene onGuess={() => goTo('reveal')} />}
        {stage === 'reveal' && <RevealScene onNext={() => goTo('library')} />}
        {stage === 'library' && <LibraryScene />}
      </div>
    </main>
  )
}
