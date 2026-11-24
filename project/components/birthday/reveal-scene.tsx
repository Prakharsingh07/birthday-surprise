'use client'

import Image from 'next/image'
import { reveal } from '@/lib/birthday-content'
import { images } from '@/lib/images'
import { Confetti, Sprig, Twinkle } from './decorations'
import { StoryButton } from './story-button'

export function RevealScene({ onNext }: { onNext: () => void }) {
  const revealPhoto = images[reveal.image]
  return (
    <section className="grain relative min-h-dvh overflow-hidden px-6 pb-20 pt-20 text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 30% 30%, rgba(217,160,179,0.32), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(185,169,210,0.28), transparent 70%), radial-gradient(ellipse 50% 40% at 60% 10%, rgba(214,187,138,0.22), transparent 70%)',
        }}
      />
      <Confetti />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-14 md:flex-row md:items-center md:gap-20">
        <figure className="relative shrink-0">
          <Sprig className="absolute -left-10 -top-12 h-32 w-20 -rotate-[24deg]" />
          <Sprig
            className="absolute -bottom-10 -right-8 h-28 w-16 rotate-[150deg]"
            color="#d6bb8a"
            flower="#b9a9d2"
          />
          <Twinkle className="absolute -right-6 top-6 size-4 text-gold" />
          <Twinkle className="absolute -left-4 bottom-20 size-3 text-rose" />

          <div
            className="animate-polaroid-in relative w-[min(74vw,320px)] bg-[#fffdf8] p-3 pb-16 shadow-[0_30px_60px_-24px_rgba(43,36,51,0.45),0_2px_6px_rgba(43,36,51,0.08)]"
            style={{ animationDelay: '0.3s' }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-rose/40 backdrop-blur-sm"
            />
            {/* Photo comes from the `birthdayReveal` slot in lib/images.ts */}
            <div
              className="relative aspect-[4/5] overflow-hidden bg-rose/10"
              data-image-slot={reveal.image}
            >
              {revealPhoto.src && (
                <Image
                  src={revealPhoto.src}
                  alt={revealPhoto.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 74vw, 320px"
                  className="object-cover"
                />
              )}
            </div>
            <figcaption className="absolute inset-x-0 bottom-4 text-center font-hand text-2xl text-ink-soft">
              {reveal.photoCaption}
            </figcaption>
          </div>
        </figure>

        <div className="max-w-md text-center md:text-left">
          <p
            className="animate-fade-up text-xs uppercase tracking-[0.35em] text-rose-deep"
            style={{ animationDelay: '1.2s' }}
          >
            {reveal.label}
          </p>
          <h1
            className="animate-fade-up mt-5 font-serif text-5xl font-light leading-[1.05] text-balance md:text-6xl"
            style={{ animationDelay: '1.6s' }}
          >
            {reveal.headline}
          </h1>
          <p
            className="animate-fade-up mt-6 font-serif text-xl italic leading-relaxed text-ink-soft"
            style={{ animationDelay: '2.2s' }}
          >
            {reveal.supporting}
          </p>

          <div
            className="animate-fade-up mt-10 border-t border-ink/10 pt-8"
            style={{ animationDelay: '2.9s' }}
          >
            <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft text-pretty">
              {reveal.message.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink-soft">{reveal.signOff}</p>
            <p className="font-hand text-3xl text-rose-deep">{reveal.signature}</p>
          </div>

          <div className="animate-fade-up mt-10" style={{ animationDelay: '3.6s' }}>
            <StoryButton onClick={onNext}>{reveal.button}</StoryButton>
          </div>
        </div>
      </div>
    </section>
  )
}
