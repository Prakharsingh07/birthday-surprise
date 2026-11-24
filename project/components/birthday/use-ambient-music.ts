'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const MASTER_VOLUME = 0.05
const CHORD_SECONDS = 8

// Fmaj7 – Am7 – Dm9 – Bbmaj7, voiced softly
const CHORDS = [
  [174.61, 220.0, 261.63, 329.63],
  [220.0, 261.63, 329.63, 392.0],
  [146.83, 220.0, 261.63, 329.63],
  [116.54, 233.08, 293.66, 349.23],
]
const MELODY = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]

type Engine = {
  ctx: AudioContext
  master: GainNode
  output: AudioNode
  interval: number
}

function playPad(engine: Engine, freqs: number[], start: number) {
  const { ctx, output } = engine
  for (const freq of freqs) {
    for (const [type, detune] of [
      ['sine', 0],
      ['triangle', 6],
    ] as const) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      osc.detune.value = detune
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.06, start + 2.5)
      gain.gain.linearRampToValueAtTime(0.045, start + CHORD_SECONDS - 1)
      gain.gain.linearRampToValueAtTime(0, start + CHORD_SECONDS + 1.5)
      osc.connect(gain).connect(output)
      osc.start(start)
      osc.stop(start + CHORD_SECONDS + 1.6)
    }
  }
}

function playPluck(engine: Engine, freq: number, start: number) {
  const { ctx, output } = engine
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(0.12, start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.6)
  osc.connect(gain).connect(output)
  osc.start(start)
  osc.stop(start + 2.7)
}

function createEngine(): Engine | null {
  const AudioCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext
  if (!AudioCtx) return null

  const ctx = new AudioCtx()
  const master = ctx.createGain()
  master.gain.setValueAtTime(0, ctx.currentTime)
  master.gain.linearRampToValueAtTime(MASTER_VOLUME, ctx.currentTime + 4)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1400

  const delay = ctx.createDelay()
  delay.delayTime.value = 0.45
  const feedback = ctx.createGain()
  feedback.gain.value = 0.35
  delay.connect(feedback).connect(delay)

  filter.connect(master)
  filter.connect(delay)
  delay.connect(master)
  master.connect(ctx.destination)

  const engine: Engine = { ctx, master, output: filter, interval: 0 }

  let bar = 0
  const scheduleBar = () => {
    const start = ctx.currentTime + 0.1
    playPad(engine, CHORDS[bar % CHORDS.length], start)
    const plucks = 2 + (bar % 2)
    for (let i = 0; i < plucks; i++) {
      const note = MELODY[(bar * 3 + i * 2) % MELODY.length]
      playPluck(engine, note, start + 1 + i * 2.3)
    }
    bar++
  }
  scheduleBar()
  engine.interval = window.setInterval(scheduleBar, CHORD_SECONDS * 1000)
  return engine
}

export function useAmbientMusic(src: string | null) {
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)
  const startedRef = useRef(false)
  const engineRef = useRef<Engine | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    try {
      if (src) {
        const audio = new Audio(src)
        audio.loop = true
        audio.volume = 0.25
        audio.play().catch(() => {})
        audioRef.current = audio
      } else {
        engineRef.current = createEngine()
      }
      setStarted(true)
    } catch {
      // Sound is a nice-to-have; the experience continues silently.
    }
  }, [src])

  const toggleMute = useCallback(() => {
    setMuted((wasMuted) => {
      const nextMuted = !wasMuted
      if (audioRef.current) audioRef.current.muted = nextMuted
      const engine = engineRef.current
      if (engine) {
        if (engine.ctx.state === 'suspended') engine.ctx.resume()
        engine.master.gain.setTargetAtTime(
          nextMuted ? 0 : MASTER_VOLUME,
          engine.ctx.currentTime,
          0.4,
        )
      }
      return nextMuted
    })
  }, [])

  useEffect(() => {
    return () => {
      const engine = engineRef.current
      if (engine) {
        window.clearInterval(engine.interval)
        engine.ctx.close()
      }
      audioRef.current?.pause()
    }
  }, [])

  return { started, muted, start, toggleMute }
}
