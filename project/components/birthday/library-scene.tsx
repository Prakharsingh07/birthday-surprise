'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { library, memories } from '@/lib/birthday-content'
import { images } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Fireflies, Sprig } from './decorations'
import { EnvelopeArt, envelopeDesigns, OpenedMark } from './envelope-art'
import { LetterModal } from './letter-modal'

export function LibraryScene() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [opened, setOpened] = useState<Set<number>>(() => new Set())
  const triggers = useRef<(HTMLButtonElement | null)[]>([])

  const markOpened = useCallback((index: number) => {
    setOpened((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }, [])

  const close = useCallback(() => {
    setActiveIndex((current) => {
      if (current !== null) {
        window.setTimeout(() => triggers.current[current]?.focus(), 50)
      }
      return null
    })
  }, [])

  const allOpened = opened.size === memories.length
  const finalPhoto = images.finalMemory

  return (
    <section className="paper grain relative min-h-dvh overflow-hidden bg-ivory px-5 pb-24 pt-20 text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 35% at 15% 0%, rgba(217,160,179,0.28), transparent 70%), radial-gradient(ellipse 50% 40% at 95% 30%, rgba(185,169,210,0.25), transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(214,187,138,0.22), transparent 70%)',
        }}
      />
      <Fireflies />
      <Sprig className="absolute -left-4 top-24 h-40 w-24 -rotate-12 opacity-70" />
      <Sprig
        className="absolute -right-6 top-10 h-36 w-20 rotate-[20deg] opacity-70"
        color="#d6bb8a"
        flower="#b9a9d2"
      />

      <header className="relative z-10 mx-auto max-w-2xl text-center">
        <p
          className="animate-fade-up text-xs uppercase tracking-[0.35em] text-rose-deep"
          style={{ animationDelay: '0.3s' }}
        >
          {library.label}
        </p>
        <h1
          className="animate-fade-up mt-5 font-serif text-4xl font-light leading-tight text-balance md:text-6xl"
          style={{ animationDelay: '0.7s' }}
        >
          {library.heading}
        </h1>
        <p
          className="animate-fade-up mx-auto mt-5 max-w-md font-serif text-lg italic leading-relaxed text-ink-soft md:text-xl"
          style={{ animationDelay: '1.1s' }}
        >
          {library.subtitle}
        </p>
        <div
          className="animate-fade-up mt-8 flex flex-col items-center gap-3"
          style={{ animationDelay: '1.5s' }}
        >
          <p className="font-hand text-xl text-ink-soft">{library.hint}</p>
          <div
            className="flex items-center gap-1.5"
            role="img"
            aria-label={`${opened.size} of ${memories.length} memories opened`}
          >
            {memories.map((_, i) => (
              <Heart
                key={i}
                aria-hidden="true"
                className={cn(
                  'size-3 transition-colors duration-700',
                  opened.has(i)
                    ? 'fill-rose-deep text-rose-deep'
                    : 'text-ink/25',
                )}
              />
            ))}
          </div>
        </div>
      </header>

      <ul className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-16">
        {memories.map((memory, i) => {
          const design = envelopeDesigns[i]
          const number = String(i + 1).padStart(2, '0')
          const isOpened = opened.has(i)
          return (
            <li
              key={memory.image}
              className="animate-fade-up"
              style={{
                animationDelay: `${1.8 + i * 0.12}s`,
                translate: `0 ${design.offset}px`,
              }}
            >
              <button
                ref={(el) => {
                  triggers.current[i] = el
                }}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Open envelope ${number}: ${memory.title}${isOpened ? ' (already opened)' : ''}`}
                className="group block w-full rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
              >
                <div
                  className="relative transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-focus-visible:-translate-y-2 group-active:scale-[0.98]"
                  style={{ rotate: `${design.rotate}deg` }}
                >
                  <div className="shadow-[0_14px_24px_-14px_rgba(43,36,51,0.5),0_2px_4px_rgba(43,36,51,0.06)] transition-shadow duration-500 group-hover:shadow-[0_26px_40px_-18px_rgba(168,98,124,0.55),0_0_30px_-6px_rgba(214,187,138,0.5)]">
                    <EnvelopeArt design={design} number={number} />
                  </div>
                  {isOpened && (
                    <OpenedMark className="absolute -right-2 -top-2 z-10" />
                  )}
                </div>
                <p className="mt-4 text-center font-serif text-base italic text-ink-soft">
                  {memory.title}
                </p>
              </button>
            </li>
          )
        })}
      </ul>

      {finalPhoto.src && (
        <figure
          className={cn(
            'relative z-10 mx-auto mt-20 w-[min(64vw,240px)] rotate-[-2deg] bg-[#fffdf8] p-2.5 pb-10 shadow-[0_24px_48px_-20px_rgba(43,36,51,0.4)] transition-all duration-[1400ms]',
            allOpened ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          )}
          aria-hidden={!allOpened}
          data-image-slot="finalMemory"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-rose/10">
            <Image
              src={finalPhoto.src}
              alt={finalPhoto.alt}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        </figure>
      )}

      <p
        className={cn(
          'relative z-10 mx-auto max-w-sm',
          finalPhoto.src ? 'mt-8' : 'mt-20',
          ' text-center font-hand text-2xl leading-snug text-rose-deep transition-all duration-[1400ms]',
          allOpened ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
        aria-hidden={!allOpened}
      >
        {library.finale}
      </p>

      {activeIndex !== null && (
        <LetterModal
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onOpened={markOpened}
          onClose={close}
        />
      )}
    </section>
  )
}
