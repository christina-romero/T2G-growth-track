// ---------------------------------------------------------------------------
// Shared types for T2G Growth Track
// Terminology is sourced from the Access Model Brainlift, the Future 2
// Operational Playbook, and the Scenarios CSV. Where the source files do not
// settle a detail, content is labelled "Needs source confirmation".
// ---------------------------------------------------------------------------

/** The four rubric levels used across every practice activity and the final task. */
export type RubricLevel = 'Not Yet' | 'Developing' | 'Ready' | 'Guide-Level'

export const RUBRIC_LEVELS: RubricLevel[] = [
  'Not Yet',
  'Developing',
  'Ready',
  'Guide-Level',
]

/** A single multiple-choice option in a "Try It" decision task. */
export interface PracticeOption {
  id: string
  text: string
  /** The rubric level this choice demonstrates. */
  level: RubricLevel
  /** Immediate coaching feedback shown after the teacher chooses. */
  feedback: string
}

/** A rubric row: one criterion with a descriptor for each level. */
export interface RubricCriterion {
  name: string
  levels: Record<RubricLevel, string>
}

/** The "Try It" decision task inside a module. */
export interface PracticeTask {
  prompt: string
  options: PracticeOption[]
}

/** A glossary / key-term pair surfaced inside a module. */
export interface KeyTerm {
  term: string
  def: string
}

/** One full learning module following the Hook -> Certify pattern. */
export interface Module {
  id: number
  title: string
  estimatedTime: string
  learningGoal: string
  /** 1. Hook — a realistic classroom scenario. */
  scenario: string
  /** 2. Learn — short explanation of the core skill (paragraphs). */
  lesson: string[]
  /** 3. See It — what strong Guide execution looks like (paragraphs). */
  example: string[]
  /** 4. Try It — a decision/analysis task. */
  practice: PracticeTask
  /** 5. Get Feedback — the rubric used to score the practice task. */
  rubric: RubricCriterion[]
  /** 6. Reflect — "What would you do differently tomorrow?" variant. */
  reflectionPrompt: string
  /** 7. Certify — a short performance task that closes the module. */
  certifyTask: string
  nonNegotiables?: string[]
  keyTerms?: KeyTerm[]
}

/** One moment in the Final Guide Certification simulation. */
export interface SimulationMoment {
  id: string
  label: string
  scenario: string
  practice: PracticeTask
  reflectionPrompt: string
}

// ---------------------------------------------------------------------------
// Progress (persisted to localStorage)
// ---------------------------------------------------------------------------

export interface ModuleProgress {
  /** Whether the teacher has pressed "Complete Module". */
  completed: boolean
  /** The option id chosen in the Try It task. */
  practiceChoiceId?: string
  /** Free-text reflection ("differently tomorrow"). */
  reflection?: string
  /** Free-text certify performance-task response. */
  certifyResponse?: string
}

export interface MomentProgress {
  practiceChoiceId?: string
  reflection?: string
}

export interface CourseProgress {
  modules: Record<number, ModuleProgress>
  finalMoments: Record<string, MomentProgress>
  finalCompleted: boolean
}

export type CertificationLevel =
  | 'Guide-in-Training'
  | 'Explorer'
  | 'Practitioner'
  | 'Classroom Ready'
  | 'Certified Guide'
