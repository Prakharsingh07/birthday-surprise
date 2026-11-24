import { cn } from '@/lib/utils'

const EMBERS = [
  { dx: -18, delay: 0.4, duration: 3.4 },
  { dx: 12, delay: 1.3, duration: 3.9 },
  { dx: -6, delay: 2.1, duration: 3.2 },
  { dx: 22, delay: 2.9, duration: 4.2 },
  { dx: -24, delay: 3.6, duration: 3.6 },
  { dx: 6, delay: 4.4, duration: 3.8 },
]

export function Candle({ lit }: { lit: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* ambient halo cast by the flame */}
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-[-140px] size-[460px] -translate-x-1/2 rounded-full transition-all duration-[2600ms] ease-out',
          lit ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
        )}
        style={{
          background:
            'radial-gradient(circle, rgba(255,206,150,0.30) 0%, rgba(217,160,179,0.12) 38%, transparent 68%)',
        }}
      />

      {/* flame */}
      <div className="relative h-20 w-12">
        <div
          className={cn(
            'absolute inset-0 origin-bottom transition-all duration-[1100ms] ease-out',
            lit ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          )}
        >
          <div
            className="absolute bottom-2 left-1/2 size-28 -translate-x-1/2 translate-y-8 rounded-full blur-md"
            style={{
              background:
                'radial-gradient(circle, rgba(255,205,130,0.55) 0%, rgba(255,170,90,0.15) 45%, transparent 70%)',
              animation: 'glow-pulse 3.2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-16 w-7 -translate-x-1/2 origin-bottom"
            style={{
              borderRadius: '50% 50% 42% 42% / 72% 72% 28% 28%',
              background:
                'radial-gradient(ellipse at 50% 78%, #fffbea 0%, #ffe6a3 22%, #ffb45e 52%, rgba(255,130,60,0) 76%)',
              filter: 'blur(0.4px)',
              animation: 'flicker 2.6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-1 left-1/2 h-7 w-3 -translate-x-1/2 origin-bottom"
            style={{
              borderRadius: '50% 50% 45% 45% / 70% 70% 30% 30%',
              background:
                'radial-gradient(ellipse at 50% 80%, #ffffff 0%, #fff6d6 60%, rgba(255,240,200,0) 100%)',
              animation: 'flicker 1.9s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(130,160,255,0.55) 0%, transparent 70%)',
            }}
          />
          {lit &&
            EMBERS.map((ember, i) => (
              <span
                key={i}
                className="motion-decor absolute bottom-12 left-1/2 size-1 rounded-full bg-[#ffd89a]"
                style={
                  {
                    '--dx': `${ember.dx}px`,
                    boxShadow: '0 0 6px 1px rgba(255,200,120,0.7)',
                    animation: `ember ${ember.duration}s ease-out ${ember.delay}s infinite`,
                  } as React.CSSProperties
                }
              />
            ))}
        </div>
      </div>

      {/* wick */}
      <div
        className={cn(
          'h-3 w-[3px] rounded-full transition-colors duration-1000',
          lit ? 'bg-[#2a1c18]' : 'bg-[#4a3a34]',
        )}
      />

      {/* candle body */}
      <div
        className="relative h-44 w-14 rounded-t-[10px] rounded-b-sm"
        style={{
          backgroundImage:
            'repeating-linear-gradient(160deg, transparent 0 16px, rgba(217,160,179,0.5) 16px 20px), linear-gradient(90deg, #d8c6b2 0%, #f3e6d6 22%, #fffaf2 45%, #f1e3d2 72%, #cdb9a3 100%)',
        }}
      >
        <div className="absolute inset-x-0 -top-1 h-3 rounded-[50%] bg-[#f8ecdc]" />
        <div className="absolute left-2 top-1 h-6 w-2 rounded-b-full bg-[#fbf1e4]" />
        <div className="absolute right-3 top-1 h-9 w-1.5 rounded-b-full bg-[#f7ebdb]" />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-t-[10px] transition-opacity duration-[2000ms]',
            lit ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            background:
              'linear-gradient(180deg, rgba(255,190,120,0.45) 0%, rgba(255,190,120,0.08) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* holder */}
      <div
        className="h-4 w-32 rounded-[50%]"
        style={{
          background:
            'linear-gradient(180deg, #ecd8b0 0%, #d6bb8a 45%, #9c8257 100%)',
          boxShadow: lit
            ? '0 18px 40px -8px rgba(255,190,120,0.35)'
            : '0 18px 40px -12px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  )
}
