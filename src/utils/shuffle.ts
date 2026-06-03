// Deterministic shuffle utilities.
//
// We want the answer options in a "Try It" task to appear in a varied order so
// the strongest (Guide-Level) choice isn't always last — but the order must be
// STABLE for a given task (seeded), so options don't jump around between
// re-renders while a teacher is reading them.

/** Small seeded PRNG (mulberry32). Same seed -> same sequence. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Stable 32-bit seed derived from a string (e.g. a moment id). */
export function hashSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Returns a new array shuffled deterministically from `seed` (Fisher-Yates). */
export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const arr = items.slice()
  const rand = mulberry32(seed || 1)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
