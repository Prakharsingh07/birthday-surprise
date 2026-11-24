import {
  Feather,
  Flower2,
  Gem,
  Heart,
  Leaf,
  type LucideIcon,
  Moon,
  Sparkles,
  Star,
  Sun,
  Infinity as InfinityIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sprig, Twinkle } from './decorations'

type Accent = 'ribbon' | 'stamp' | 'floral' | 'stars' | 'lace'

export type EnvelopeDesign = {
  paper: string
  flap: string
  seal: string
  icon: LucideIcon
  accent: Accent
  rotate: number
  offset: number
}

export const envelopeDesigns: EnvelopeDesign[] = [
  { paper: '#f6e6dc', flap: '#eed6c8', seal: '#a8627c', icon: Heart, accent: 'ribbon', rotate: -4, offset: 0 },
  { paper: '#ece5f3', flap: '#ded3eb', seal: '#b8975e', icon: Star, accent: 'stamp', rotate: 3, offset: 18 },
  { paper: '#fff3e5', flap: '#f3e2cc', seal: '#7d5f9a', icon: Flower2, accent: 'floral', rotate: -2, offset: -6 },
  { paper: '#f3dde2', flap: '#e8cbd2', seal: '#6e4256', icon: Moon, accent: 'stars', rotate: 5, offset: 12 },
  { paper: '#f7efe2', flap: '#ecdfc9', seal: '#a8627c', icon: Sparkles, accent: 'lace', rotate: -5, offset: 2 },
  { paper: '#efe8f4', flap: '#e2d7ec', seal: '#a8627c', icon: Feather, accent: 'floral', rotate: 4, offset: -4 },
  { paper: '#fbeee4', flap: '#f1dccb', seal: '#b8975e', icon: Sun, accent: 'ribbon', rotate: -3, offset: 14 },
  { paper: '#f2e2e6', flap: '#e6cdd4', seal: '#7d5f9a', icon: Gem, accent: 'stamp', rotate: 2, offset: -2 },
  { paper: '#f6f0e4', flap: '#eae0cc', seal: '#6e4256', icon: Leaf, accent: 'stars', rotate: -4, offset: 10 },
  { paper: '#f5e3e8', flap: '#ebd0d8', seal: '#a8627c', icon: InfinityIcon, accent: 'lace', rotate: 3, offset: 0 },
]

function AccentLayer({ design }: { design: EnvelopeDesign }) {
  switch (design.accent) {
    case 'ribbon':
      return (
        <span
          className="absolute inset-y-0 left-[22%] w-[7%] opacity-60"
          style={{ backgroundColor: design.seal, mixBlendMode: 'multiply' }}
        />
      )
    case 'stamp':
      return (
        <span
          className="absolute bottom-[10%] right-[7%] flex aspect-[4/5] w-[16%] items-center justify-center border border-dashed bg-ivory/70"
          style={{ borderColor: design.seal }}
        >
          <Heart className="size-1/2" style={{ color: design.seal }} aria-hidden="true" />
        </span>
      )
    case 'floral':
      return <Sprig className="absolute -bottom-1 right-[6%] h-[55%] w-[16%] rotate-12" />
    case 'stars':
      return (
        <>
          <Twinkle className="absolute bottom-[18%] right-[10%] size-[8%] text-gold" />
          <Twinkle className="absolute bottom-[34%] right-[22%] size-[5%] text-gold" />
          <Twinkle className="absolute bottom-[12%] right-[26%] size-[4%] text-rose" />
        </>
      )
    case 'lace':
      return (
        <span
          className="absolute inset-[5%] rounded-[2px] border border-dotted opacity-70"
          style={{ borderColor: design.seal }}
        />
      )
  }
}

export function EnvelopeArt({
  design,
  number,
  flapOpen = false,
  sealBroken = false,
}: {
  design: EnvelopeDesign
  number: string
  flapOpen?: boolean
  sealBroken?: boolean
}) {
  const Icon = design.icon
  const sealStyle = {
    background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${design.seal} 70%, white) 0%, ${design.seal} 55%, color-mix(in srgb, ${design.seal} 70%, black) 100%)`,
    boxShadow: `0 2px 4px rgba(43,36,51,0.3), inset 0 0 0 3px color-mix(in srgb, ${design.seal} 85%, black)`,
  }

  return (
    <div className="relative aspect-[3/2] w-full" style={{ perspective: '900px' }}>
      <div
        className="paper absolute inset-0 overflow-hidden rounded-[3px]"
        style={{ backgroundColor: design.paper }}
      >
        <span
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0, 50% 56%, 0 100%)',
            backgroundColor: 'rgba(43,36,51,0.035)',
          }}
        />
        <span
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(100% 0, 50% 56%, 100% 100%)',
            backgroundColor: 'rgba(43,36,51,0.035)',
          }}
        />
        <span
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
            backgroundColor: 'rgba(43,36,51,0.05)',
          }}
        />
        <AccentLayer design={design} />
        <span className="absolute bottom-[8%] left-[7%] font-hand text-lg leading-none text-ink-soft md:text-xl">
          No. {number}
        </span>
      </div>

      {/* flap */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] origin-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: flapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
          filter: 'drop-shadow(0 2px 2px rgba(43,36,51,0.12))',
          zIndex: flapOpen ? 0 : 2,
        }}
      >
        <div
          className="paper h-full w-full"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            backgroundColor: design.flap,
          }}
        />
      </div>

      {/* wax seal */}
      <div
        className="absolute left-1/2 top-[60%] z-[3] aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        {(['left', 'right'] as const).map((half) => (
          <div
            key={half}
            className="absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-out"
            style={{
              ...sealStyle,
              clipPath: half === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
              transform: sealBroken
                ? `translate(${half === 'left' ? -10 : 10}px, 6px) rotate(${half === 'left' ? -18 : 18}deg)`
                : 'none',
              opacity: sealBroken ? 0 : 1,
            }}
          >
            <Icon className="size-[46%] text-ivory/90" strokeWidth={1.6} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function OpenedMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'animate-heart-pop flex size-7 items-center justify-center rounded-full bg-ivory shadow-[0_2px_8px_rgba(43,36,51,0.18)]',
        className,
      )}
    >
      <Heart className="size-3.5 fill-rose-deep text-rose-deep" aria-hidden="true" />
    </span>
  )
}
