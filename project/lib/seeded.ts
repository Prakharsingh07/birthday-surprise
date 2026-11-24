// Deterministic pseudo-random values so server and client render identical decorations.
export function seeded(seed: number) {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646
  return () => {
    state = (state * 16807) % 2147483647
    return Math.round(((state - 1) / 2147483646) * 1000) / 1000
  }
}
