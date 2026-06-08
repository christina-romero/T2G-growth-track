// ---------------------------------------------------------------------------
// T2G (Teacher-to-Guide) Philosophy — the foundational framework
// Source of truth: the "T2G Philosophy" document. Quotes are verbatim.
// The internal strategy memo and editorial notes in the source are intentionally
// omitted; this captures the teacher-facing philosophical framework.
// ---------------------------------------------------------------------------

export interface Pillar {
  n: number
  title: string
  teacher: string
  guide: string
  body: string
  implication: string
}

export const northStar =
  'Children are ready to contribute to their communities right now — not after more years of preparation.'

export const premise =
  'The Teacher-to-Guide conversion is not a retraining, a new set of classroom-management strategies, or a different delivery style. It is a philosophical shift — a reorganization of the belief system underneath the adult\'s relationship with children, with learning, and with their own professional identity.'

export const inversionTeacher =
  'Traditional teaching is organized around a fundamental premise: the teacher is the source. The teacher holds knowledge, delivers it, and evaluates whether students received it. The teacher\'s authority is the organizing center of the room.'

export const inversionGuide =
  'The Guide is organized around the opposite premise: the student is the source — not of content (the platform handles that), but of motivation, of community, of forward movement. The Guide engineers the conditions under which that capability is activated, sustained, and expanded.'

export const inversionNote =
  'One premise positions the adult as the answer. The other positions the adult as the question-asker. These are not two points on the same spectrum — they are incompatible operating systems.'

export const sevenPillars: Pillar[] = [
  {
    n: 1,
    title: 'Capability Is the Default, Not the Exception',
    teacher: 'Source of knowledge',
    guide: 'Condition of capability',
    body: 'The Guide\'s first question is never "what does this student lack?" It is "what does this student have, and what is in the way of them using it?"',
    implication:
      'A Guide never rescues a student from productive struggle — because rescue communicates, at the level the student receives it, "I didn\'t think you could do it."',
  },
  {
    n: 2,
    title: 'Motivation Is Your Product, Not Your Tool',
    teacher: 'Motivation as tool',
    guide: 'Motivation as product',
    body: 'A Guide builds environments that meet the needs for Autonomy, Competence, and Relatedness so deeply that the student\'s own system generates the energy.',
    implication:
      'If a student is not motivated, the Guide has not done their job yet. The student is not the problem; the conditions are — and the Guide owns the conditions.',
  },
  {
    n: 3,
    title: 'Authority Is Earned Through Relationship, Not Assigned Through Role',
    teacher: 'Authority by credential',
    guide: 'Authority by relationship',
    body: 'At 15–20:1 there is no institutional backstop. Authority is built when a student trusts the Guide wants them to succeed more than the Guide needs them to comply.',
    implication:
      'The Guide must be genuinely curious about each student, not performatively supportive. Performed care is legible to students within days.',
  },
  {
    n: 4,
    title: 'The Room Belongs to the Community, Not the Teacher',
    teacher: 'Room as domain',
    guide: 'Room as community',
    body: 'Standards are established, agreed upon, and signed by students. The behavioral system protects the community\'s ability to function — not the Guide\'s authority.',
    implication:
      'A Guide who takes misbehavior personally has confused their role. Behavior is information about conditions, not a personal challenge.',
  },
  {
    n: 5,
    title: 'Friction Is the Medium, Not the Problem',
    teacher: 'Removes difficulty',
    guide: 'Calibrates friction',
    body: 'Productive struggle builds capability. The one exception is unproductive struggle — friction with no learning value. The Guide must always know which is which.',
    implication:
      'Guides adjust friction on the path — they calibrate it, stage it, sequence it. They never remove it.',
  },
  {
    n: 6,
    title: 'Knowledge Moves in All Directions',
    teacher: 'Transmits knowledge',
    guide: 'Activates knowledge in all directions',
    body: 'A student who mastered a skill last week is often a more useful resource for a struggling peer than the Guide — because they remember what it felt like not to know it.',
    implication:
      'A Guide must derive satisfaction from student capability, not from being the most capable person in the room. That is a genuine identity shift.',
  },
  {
    n: 7,
    title: 'Community Stewardship Is the Target — Not Compliance',
    teacher: 'Builds compliance',
    guide: 'Builds community stewardship',
    body: 'The endpoint is not a compliant student but one who would rather not harm the community they belong to — behavior produced by internalized ownership, not external pressure.',
    implication:
      'A Guide\'s ultimate job is to make themselves unnecessary. A Guide who cannot aim at their own redundancy has not understood what they are building.',
  },
]

export const teacherIdentityPillars: string[] = [
  'Expert authority — I know, therefore I lead',
  'Content ownership — I deliver the material; the lesson is mine',
  'Evaluative power — I determine whether you succeeded',
  'Behavioral control — I manage this room',
]

export const guideIdentityPillars: string[] = [
  'Relational intelligence — I know this student, therefore I can reach them',
  'Conditions engineering — I design the environment; the learning is theirs',
  'Mastery facilitation — the standard determines success; I hold the standard',
  'Community architecture — the community manages this room; I hold the container',
]

export const conversionMarker =
  'The observable marker of genuine T2G conversion: a Guide can describe a specific moment when a student made them abandon an assumption about children — not a technique they added, but a belief they let go.'

export const selectionFilter =
  'The selection filter for T2G is not "Can this person learn new strategies?" It is "Does this person still believe they are becoming?"'
