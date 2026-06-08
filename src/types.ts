// ---------------------------------------------------------------------------
// Shared types for T2G Growth Track
// The track is authorship-based: each module builds toward mastery of a Guide
// competency and ends with an authored artifact saved to the teacher's
// portfolio (no multiple-choice / compliance scoring).
// Terminology sourced from the Access Model Brainlift, the Future 2 Playbook,
// the Scenarios CSV, the T2G Philosophy and the Guide OS for Culture docs.
// ---------------------------------------------------------------------------

/** A glossary / key-term pair surfaced inside a module. */
export interface KeyTerm {
  term: string
  def: string
}

/** The Guide competencies the track builds toward. */
export type Competency =
  | 'Curate environments'
  | 'Facilitate student-led Experiences'
  | 'Coach students through stuck points'
  | 'Develop motivational models'
  | 'Make data-informed decisions'
  | 'Get to know students better than anyone'
  | 'Provide emotional support to individuals'
  | 'Structure earned autonomy'
  | 'Uphold student-created systems'
  | 'Plan events with lasting impact'

/** The authored-artifact task that closes each module. */
export interface ArtifactTask {
  /** Label for the work product the teacher names/titles. */
  title: string
  /** What the teacher authors (kept short). */
  prompt: string
  /** Optional short guiding bullets to spark the work. */
  starters?: string[]
  /** What a strong artifact contains — guidance, not a score. */
  strongLooksLike: string[]
  /** Label for the optional link field. */
  linkLabel?: string
  placeholder?: string
}

/** One learning module: Hook -> Learn -> See It -> Build -> Reflect. */
export interface Module {
  id: number
  title: string
  estimatedTime: string
  /** The Guide competency this module builds toward. */
  competency: Competency
  learningGoal: string
  /** Hook — a realistic classroom moment (one short paragraph). */
  scenario: string
  /** Learn — a few short bullets (one idea each). */
  lessonPoints: string[]
  /** See It — one short line of strong Guide execution. */
  example: string
  /** Build — the authored artifact for the portfolio. */
  artifact: ArtifactTask
  /** Reflect — "what would you do differently tomorrow?" */
  reflectionPrompt: string
  nonNegotiables?: string[]
  keyTerms?: KeyTerm[]
}

/** One moment in the Final Guide Certification capstone. */
export interface SimulationMoment {
  id: string
  label: string
  competency: Competency
  scenario: string
  /** What the teacher authors in response. */
  artifactPrompt: string
  strongLooksLike: string[]
  reflectionPrompt: string
}

// ---------------------------------------------------------------------------
// Progress + portfolio (persisted to localStorage / cloud)
// ---------------------------------------------------------------------------

/** A saved authored artifact. */
export interface Artifact {
  text: string
  link?: string
  updatedAt?: string
}

export interface ModuleProgress {
  completed: boolean
  artifact?: Artifact
  reflection?: string
}

export interface MomentProgress {
  artifact?: Artifact
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
