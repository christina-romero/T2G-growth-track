import type { CertificationLevel, CourseProgress } from '../types'
import { TOTAL_UNITS } from '../data/courseContent'

export const emptyProgress: CourseProgress = {
  modules: {},
  finalMoments: {},
  finalCompleted: false,
}

/** Coerce arbitrary stored JSON into a well-formed CourseProgress. */
export function normalizeProgress(raw: unknown): CourseProgress {
  const p = (raw ?? {}) as Partial<CourseProgress>
  return {
    modules: p.modules ?? {},
    finalMoments: p.finalMoments ?? {},
    finalCompleted: Boolean(p.finalCompleted),
  }
}

export interface ProgressStats {
  completedModuleCount: number
  completedCount: number
  percent: number
  level: CertificationLevel
}

/** Single source of truth for progress math — used by the app and the admin view. */
export function computeStats(p: CourseProgress): ProgressStats {
  const completedModuleCount = Object.values(p.modules ?? {}).filter((m) => m?.completed).length
  const completedCount = completedModuleCount + (p.finalCompleted ? 1 : 0)
  const percent = Math.round((completedCount / TOTAL_UNITS) * 100)
  const level: CertificationLevel = p.finalCompleted
    ? 'Certified Guide'
    : percent >= 75
      ? 'Classroom Ready'
      : percent >= 50
        ? 'Practitioner'
        : percent >= 25
          ? 'Explorer'
          : 'Guide-in-Training'
  return { completedModuleCount, completedCount, percent, level }
}
