// ---------------------------------------------------------------------------
// Guide OS for Culture — Behavior and Culture System
// Source of truth: the "Guide OS for Culture" document. Quotes are verbatim.
// This is the cultural context that frames the entire T2G learning track.
// ---------------------------------------------------------------------------

export interface Tenet {
  title: string
  statement: string
}

export interface EcologyRole {
  role: string
  icon: string
  tone: 'sheep' | 'shepherd' | 'wolf'
  desc: string
}

export interface LadderStage {
  stage: string
  signal: string
}

export const cultureTagline =
  'Autonomy is earned, belonging follows contribution, and stewardship becomes visible in daily student life.'

export const culturePurpose =
  'The behavior and culture system is designed to build self-governance and community stewardship. The goal is a participation-based culture in which students learn to uphold shared standards so they can remain included in meaningful activities and community life.'

export const sixTenets: Tenet[] = [
  {
    title: 'Earn your autonomy',
    statement: 'I use my freedom responsibly so I can be trusted with more.',
  },
  {
    title: 'Make the room work',
    statement: 'I help the class run smoothly so everyone can learn and focus.',
  },
  {
    title: 'Do hard things on purpose',
    statement: 'I lean into hard work instead of backing off when it gets tough.',
  },
  {
    title: 'Lift others up',
    statement: 'I notice, encourage, and support classmates so they can do their best.',
  },
  {
    title: 'Protect our community standards',
    statement:
      'I follow our agreements and speak up respectfully when something harms the community.',
  },
  {
    title: 'Show it, don\'t just say it',
    statement: 'I prove what I know through my work, my words, and my actions.',
  },
]

export const ecology: EcologyRole[] = [
  {
    role: 'Sheep',
    icon: '🐑',
    tone: 'sheep',
    desc: 'Students who mirror the primary behavioral signal within the environment.',
  },
  {
    role: 'Shepherds',
    icon: '🛡',
    tone: 'shepherd',
    desc: 'Students who uphold agreements, stabilize their peers, and actively participate in protecting the community culture.',
  },
  {
    role: 'Wolf-pattern behavior',
    icon: '🐺',
    tone: 'wolf',
    desc: 'Actions that destabilize the room, recruit others into misalignment, test the integrity of standards, or erode the influence of shepherds.',
  },
]

export const ecologyShift =
  'Ecology shift is when one wolf gains more behavioral influence than the available shepherds can absorb.'

export const standardsFraming =
  'Community standards are established in classrooms and aligned to larger campus tenets. Standards are reviewed, agreed upon, and signed by students. Positive reinforcement and visible recognition are used to strengthen habits and belonging. When behavior disrupts safety, learning, or the community, access changes. Consequences are used to protect the space and restore student responsibility, not to create a warning ladder.'

export const interventionLadder: LadderStage[] = [
  { stage: 'Drift', signal: 'Off-task behavior with no recruitment effect yet.' },
  { stage: 'Testing', signal: 'Student begins testing whether norms hold, peers watch.' },
  {
    stage: 'Recruiting',
    signal: 'Student behavior starts pulling sheep off track or weakening shepherds.',
  },
  {
    stage: 'Predation',
    signal:
      'Patterned destabilization; peers feel less safe, less focused, or more likely to join.',
  },
]

export const automaticRemoval =
  'Certain behaviors trigger automatic removal. These include aggression, defiance, repeated disruption, harassment, and leaving the space without permission.'

export const strikeLevelOffenses: string[] = [
  'Physical violence with intent to harm.',
  'Explicit language toward Guides and peers.',
  'Cheating and academic dishonesty.',
  'Intentional destruction of space and property.',
  'No intent to uphold the academic standards.',
  'Disrespect of personal boundaries with inappropriate physical or suggestive conduct (including language, touch, and/or exposure).',
]

export const repairSteps: string[] = [
  'A reflection on what standard was violated.',
  'A conversation with a Guide to reset.',
  'A repair step or restorative action when the behavior affected others.',
  'Re-entry once the student is ready to participate in a way that protects the community.',
]

export const academicBehaviorEquivalence =
  'In the Access Model, academic standards and behavior standards are synonymous because both are expressions of whether a student is participating in the community as a capable, responsible contributor.'
