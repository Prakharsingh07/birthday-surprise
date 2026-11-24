'use client'

import { ArrowRight } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type StoryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'dark' | 'light'
}

export function StoryButton({
  children,
  className,
  tone = 'light',
  ...props
}: StoryButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'group relative inline-flex min-h-12 items-center gap-3 rounded-full border px-7 py-3 font-serif text-lg italic tracking-wide transition-all duration-500 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
        tone === 'dark'
          ? 'border-gold/40 text-ivory hover:border-gold/80 hover:shadow-[0_0_32px_-4px_rgba(214,187,138,0.45)]'
          : 'border-ink/20 bg-ivory/60 text-ink hover:border-rose-deep/50 hover:shadow-[0_10px_36px_-10px_rgba(168,98,124,0.45)]',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight
        className="size-4 transition-transform duration-500 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </button>
  )
}
