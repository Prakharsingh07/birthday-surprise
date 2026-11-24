import { seeded } from '@/lib/seeded'
import { cn } from '@/lib/utils'

const random = seeded(7)
const STARS = Array.from({ length: 70 }, () => ({
  top: random() * 100,
  left: random() * 100,
  size: random() > 0.85 ? 2 : 1,
  duration: 3 + random() * 5,
  delay: random() * 6,
}))

export function Starfield({ dim = false }: { dim?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 transition-opacity duration-[3000ms]',
        dim ? 'opacity-40' : 'opacity-100',
      )}
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ivory"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
