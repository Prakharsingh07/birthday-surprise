'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SoundToggle({
  muted,
  onToggle,
  tone,
}: {
  muted: boolean
  onToggle: () => void
  tone: 'dark' | 'light'
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      className={cn(
        'animate-fade-in fixed right-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
        tone === 'dark'
          ? 'border-ivory/15 bg-ivory/5 text-ivory/80 hover:bg-ivory/10'
          : 'border-ink/10 bg-ivory/70 text-ink/70 hover:bg-ivory',
      )}
    >
      {muted ? (
        <VolumeX className="size-4" aria-hidden="true" />
      ) : (
        <Volume2 className="size-4" aria-hidden="true" />
      )}
    </button>
  )
}
