import { seeded } from '@/lib/seeded'
import { cn } from '@/lib/utils'

export function Sprig({
  className,
  color = '#b9a9d2',
  flower = '#d9a0b3',
}: {
  className?: string
  color?: string
  flower?: string
}) {
  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
    >
      <path
        d="M40 118 C 38 90, 44 60, 40 14"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[
        [40, 92, -40],
        [41, 74, 38],
        [40, 56, -36],
        [41, 40, 34],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x + (r < 0 ? -9 : 9)}
          cy={y}
          rx="10"
          ry="4"
          fill={color}
          opacity="0.55"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
      <circle cx="40" cy="12" r="5" fill={flower} opacity="0.8" />
      <circle cx="35" cy="16" r="3.5" fill={flower} opacity="0.55" />
      <circle cx="45" cy="16" r="3.5" fill={flower} opacity="0.55" />
    </svg>
  )
}

export function Twinkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
    >
      <path
        d="M12 0 C 12.8 8, 16 11.2, 24 12 C 16 12.8, 12.8 16, 12 24 C 11.2 16, 8 12.8, 0 12 C 8 11.2, 11.2 8, 12 0 Z"
        fill="currentColor"
      />
    </svg>
  )
}

const confettiRandom = seeded(42)
const CONFETTI_COLORS = ['#d9a0b3', '#b9a9d2', '#d6bb8a', '#e9c9d3']
const CONFETTI = Array.from({ length: 16 }, () => ({
  left: confettiRandom() * 100,
  delay: confettiRandom() * 5,
  duration: 9 + confettiRandom() * 6,
  drift: (confettiRandom() - 0.5) * 120,
  spin: 240 + confettiRandom() * 400,
  color: CONFETTI_COLORS[Math.floor(confettiRandom() * CONFETTI_COLORS.length)],
  round: confettiRandom() > 0.6,
  size: 5 + confettiRandom() * 4,
}))

export function Confetti() {
  return (
    <div
      aria-hidden="true"
      className="motion-decor pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {CONFETTI.map((piece, i) => (
        <span
          key={i}
          className={cn('absolute top-0', piece.round ? 'rounded-full' : 'rounded-[1px]')}
          style={
            {
              left: `${piece.left}%`,
              width: piece.size,
              height: piece.round ? piece.size : piece.size * 1.8,
              backgroundColor: piece.color,
              '--drift': `${piece.drift}px`,
              '--spin': `${piece.spin}deg`,
              animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s both`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

const fireflyRandom = seeded(99)
const FIREFLIES = Array.from({ length: 14 }, () => ({
  top: fireflyRandom() * 100,
  left: fireflyRandom() * 100,
  duration: 6 + fireflyRandom() * 6,
  delay: fireflyRandom() * 8,
  fx: (fireflyRandom() - 0.5) * 40,
  fy: -10 - fireflyRandom() * 30,
}))

export function Fireflies() {
  return (
    <div
      aria-hidden="true"
      className="motion-decor pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FIREFLIES.map((fly, i) => (
        <span
          key={i}
          className="absolute size-1.5 rounded-full bg-gold"
          style={
            {
              top: `${fly.top}%`,
              left: `${fly.left}%`,
              boxShadow: '0 0 10px 3px rgba(214,187,138,0.55)',
              '--fx': `${fly.fx}px`,
              '--fy': `${fly.fy}px`,
              animation: `firefly ${fly.duration}s ease-in-out ${fly.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
