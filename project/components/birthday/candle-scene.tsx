'use client'

import { useEffect, useRef, useState } from 'react'
import { candle } from '@/lib/birthday-content'
import { cn } from '@/lib/utils'
import { Candle } from './candle'
import { Starfield } from './starfield'
import { StoryButton } from './story-button'

type Phase = 'idle' | 'lit' | 'guess'

const layer = 'col-start-1 row-start-1 transition-all duration-[1400ms] ease-out'
const shown = 'opacity-100 translate-y-0 blur-0'
const hidden = 'pointer-events-none opacity-0 translate-y-3 blur-sm'

export function CandleScene({ onGuess }: { onGuess: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const timer = useRef<number>(0)
  const lit = phase !== 'idle'

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const light = () => {
    if (phase !== 'idle') return
    setPhase('lit')
    timer.current = window.setTimeout(() => setPhase('guess'), 3200)
  }

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden px-6 pb-14 pt-20 text-ivory">
      <Starfield dim={lit} />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-[3200ms] ease-out',
          lit ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 58%, rgba(214,187,138,0.20) 0%, rgba(217,160,179,0.09) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 grid min-h-36 w-full max-w-md place-items-center text-center">
        <div className={cn(layer, phase === 'guess' ? hidden : shown)} aria-hidden={phase === 'guess'}>
          <p
            className="animate-fade-up text-xs uppercase tracking-[0.35em] text-gold"
            style={{ animationDelay: '0.6s' }}
          >
            {candle.label}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-light leading-tight text-balance md:text-5xl">
            {candle.headingLines.map((line, i) => (
              <span
                key={line}
                className="animate-fade-up block"
                style={{ animationDelay: `${1.4 + i * 0.7}s` }}
              >
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className={cn(layer, phase === 'guess' ? shown : hidden)} aria-hidden={phase !== 'guess'}>
          <h2 className="font-serif text-3xl font-light italic leading-snug text-balance md:text-4xl">
            {candle.guess}
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={light}
        aria-label={lit ? 'The candle is lit' : 'Light the candle'}
        aria-disabled={lit}
        className={cn(
          'animate-fade-in relative z-10 my-10 rounded-3xl p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
          lit ? 'cursor-default' : 'cursor-pointer',
        )}
        style={{ animationDelay: '0.2s' }}
      >
        {!lit && (
          <span
            aria-hidden="true"
            className="motion-decor pointer-events-none absolute left-1/2 top-10 size-16 -translate-x-1/2 rounded-full border border-gold/40"
            style={{ animation: 'hint-ring 2.8s ease-out 3.5s infinite' }}
          />
        )}
        <Candle lit={lit} />
      </button>

      <div className="relative z-10 grid min-h-14 place-items-center text-center">
        <div className={cn(layer, phase === 'idle' ? shown : hidden)} aria-hidden={phase !== 'idle'}>
          <p
            className="animate-fade-up text-sm tracking-wide text-ivory/70"
            style={{ animationDelay: '3s' }}
          >
            {candle.instruction}
          </p>
        </div>
        <p
          className={cn(
            layer,
            'font-hand text-2xl text-rose',
            phase === 'lit' ? shown : hidden,
          )}
          aria-live="polite"
        >
          {phase === 'lit' ? candle.whileLit : ''}
        </p>
        <div className={cn(layer, phase === 'guess' ? shown : hidden)}>
          <StoryButton
            tone="dark"
            onClick={onGuess}
            tabIndex={phase === 'guess' ? 0 : -1}
            style={{ transitionDelay: phase === 'guess' ? '600ms' : '0ms' }}
          >
            {candle.guessButton}
          </StoryButton>
        </div>
      </div>
    </section>
  )
}
