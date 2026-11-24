'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { memories } from '@/lib/birthday-content'
import { images } from '@/lib/images'
import { cn } from '@/lib/utils'
import { EnvelopeArt, envelopeDesigns } from './envelope-art'

type Phase = 'arrive' | 'seal' | 'flap' | 'letter'

export function LetterModal({
  index,
  onIndexChange,
  onOpened,
  onClose,
}: {
  index: number
  onIndexChange: (index: number) => void
  onOpened: (index: number) => void
  onClose: () => void
}) {
  const [phase, setPhase] = useState<Phase>('arrive')
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const memory = memories[index]
  const photo = images[memory.image]
  const design = envelopeDesigns[index]
  const number = String(index + 1).padStart(2, '0')
  const total = memories.length

  // Envelope opening choreography (runs once per modal open).
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setPhase('letter')
      return
    }
    const timers = [
      window.setTimeout(() => setPhase('seal'), 700),
      window.setTimeout(() => setPhase('flap'), 1150),
      window.setTimeout(() => setPhase('letter'), 2050),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [])

  useEffect(() => {
    if (phase === 'letter') {
      onOpened(index)
      closeRef.current?.focus({ preventScroll: true })
    }
  }, [phase, index, onOpened])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  const go = (delta: number) => onIndexChange((index + delta + total) % total)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (phase !== 'letter') return
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % total)
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total)
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onIndexChange, phase, total])

  const showLetter = phase === 'letter'

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Envelope ${number}: ${memory.title}`}
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-5 py-16"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="animate-fade-in fixed inset-0 cursor-default bg-[#2b2433]/55 backdrop-blur-md"
        style={{ animationDuration: '0.6s' }}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close and return to the library"
        className="animate-fade-in fixed left-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border border-ivory/20 bg-ivory/90 text-ink shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {!showLetter && (
        <div className="animate-envelope-forward relative w-[min(84vw,400px)]">
          <div
            className={cn(
              'pointer-events-none absolute -inset-10 rounded-full transition-opacity duration-700',
              phase === 'flap' ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              background:
                'radial-gradient(circle, rgba(255,230,190,0.55), rgba(217,160,179,0.15) 45%, transparent 70%)',
            }}
          />
          <div className="shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <EnvelopeArt
              design={design}
              number={number}
              sealBroken={phase === 'seal' || phase === 'flap'}
              flapOpen={phase === 'flap'}
            />
          </div>
          <p className="sr-only" aria-live="polite">
            Opening envelope {number}
          </p>
        </div>
      )}

      {showLetter && (
        <article
          key={index}
          className="paper animate-letter-rise relative z-10 my-auto w-full max-w-sm rounded-[4px] bg-[#fffaf2] px-6 pb-6 pt-8 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] md:max-w-md md:px-9"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1.5 rounded-t-[4px]"
            style={{ backgroundColor: design.seal, opacity: 0.6 }}
          />
          <header className="flex items-baseline justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-deep">
              Memory No. {number}
            </p>
            <p className="font-serif text-sm italic text-ink-soft">
              {index + 1} / {total}
            </p>
          </header>
          <h2 className="mt-2 font-serif text-3xl font-light">{memory.title}</h2>

          <figure className="mt-6">
            <div
              className="relative mx-auto w-[88%] bg-white p-2.5 pb-3 shadow-[0_18px_30px_-16px_rgba(43,36,51,0.45)]"
              style={{ rotate: index % 2 === 0 ? '-1.5deg' : '1.5deg' }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-2 bg-lavender/45"
              />
              {/* Photo comes from the memory01–memory10 slots in lib/images.ts */}
              <div
                className="relative aspect-[4/5] overflow-hidden bg-rose/10"
                data-image-slot={memory.image}
              >
                {photo.src && (
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 380px"
                    className="animate-fade-in object-cover"
                    style={{ animationDelay: '0.4s' }}
                  />
                )}
              </div>
            </div>
            <figcaption
              className="animate-fade-up mt-6 text-center font-hand text-[1.7rem] leading-snug text-ink text-balance"
              style={{ animationDelay: '0.8s' }}
            >
              {memory.caption}
            </figcaption>
          </figure>

          <div
            aria-hidden="true"
            className="animate-fade-in mt-3 flex items-center justify-center gap-3 text-rose-deep"
            style={{ animationDelay: '1.2s' }}
          >
            <span className="h-px w-10 bg-rose-deep/40" />
            <svg viewBox="0 0 24 24" className="size-4 fill-current">
              <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.6 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" />
            </svg>
            <span className="h-px w-10 bg-rose-deep/40" />
          </div>

          <nav
            aria-label="Other envelopes"
            className="mt-6 flex items-center justify-between gap-2 border-t border-ink/10 pt-4"
          >
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex min-h-11 items-center gap-1 rounded-full px-3 font-serif italic text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-gold"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-full px-3 text-xs uppercase tracking-[0.25em] text-rose-deep transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-gold"
            >
              Library
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex min-h-11 items-center gap-1 rounded-full px-3 font-serif italic text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-gold"
            >
              Next
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </nav>
        </article>
      )}
    </div>
  )
}
