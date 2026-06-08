import type { Module, SimulationMoment } from '../types'

// ---------------------------------------------------------------------------
// COURSE CONTENT — authorship model
// Each module builds toward ONE Guide competency and ends with an authored
// artifact saved to the teacher's portfolio. Text is kept deliberately short
// (one idea per page) to reduce cognitive load.
// Sources: Access Model Brainlift, Future 2 Playbook, Scenarios CSV,
// T2G Philosophy, Guide OS for Culture.
// ---------------------------------------------------------------------------

export const TOTAL_UNITS = 10 // 9 content modules + the final capstone

export const modules: Module[] = [
  {
    id: 1,
    title: 'The Access Model',
    estimatedTime: '12 min',
    competency: 'Get to know students better than anyone',
    learningGoal: 'See students from an asset model — capability is the default, not the exception.',
    scenario:
      'First week. A parent stops you: "The kids were on screens and you weren\'t at the front teaching. Why doesn\'t this look like real school?"',
    lessonPoints: [
      'The Access Model brings Alpha\'s proven model to mainstream public-school families — re-engineered, not diluted.',
      'Mornings: mastery-based Timeback. Afternoons: Experiences where students build. They earn time back.',
      'Capability is the default. Brownsville — working-class kids at 15–20:1 — outperformed the flagship for two years.',
    ],
    example:
      'A Guide starts from what a student already HAS, then removes what\'s in the way — not from what they lack.',
    artifact: {
      title: 'Student Capability Map',
      prompt: 'Pick one real student. Map them from an asset model, not a deficit one.',
      starters: [
        'What is this student already capable of (often unmapped)?',
        'What is their "why" — what do they care about?',
        'What is in the way of them using it?',
      ],
      strongLooksLike: [
        'Names real strengths, not just gaps',
        'Captures the student\'s own "why"',
        'Identifies the obstacle to remove',
      ],
      linkLabel: 'Link to a fuller map (optional)',
      placeholder: 'Student (initials), what they have, their why, what\'s in the way…',
    },
    reflectionPrompt: 'Which student do you most often see for what they lack? What do they actually have?',
    nonNegotiables: ['Capability is the default, not the exception.', 'Full-day model — mornings AND afternoons.'],
    keyTerms: [
      {
        term: 'Timeback',
        def: 'The mastery-based platform for the morning block. Students earn time back by hitting daily XP targets.',
      },
    ],
  },

  {
    id: 2,
    title: 'The Role of the Guide',
    estimatedTime: '12 min',
    competency: 'Coach students through stuck points',
    learningGoal: 'Coach, don\'t rescue — adjust friction on the path, never remove it.',
    scenario:
      'During Core Skills a student raises a hand: "I don\'t get problem 4." Your instinct is to walk over and explain it. Three more hands go up.',
    lessonPoints: [
      'Guides don\'t lecture, grade, or write lesson plans. They build conditions so students carry themselves.',
      '"Support, don\'t solve." Rescue trains a student to wait for rescue.',
      'The only exception is unproductive struggle — friction with no learning value.',
    ],
    example:
      'Instead of solving it: "What have you tried? What tool could help?" — then point to a peer who just mastered it, and keep moving.',
    artifact: {
      title: 'Stuck-Point Coaching Playbook',
      prompt: 'Author your go-to moves for 3 common stuck points — coaching, not rescuing.',
      starters: [
        'Name the stuck point (e.g., "I don\'t get it")',
        'Your question that hands the thinking back',
        'The tool or peer you route them to',
      ],
      strongLooksLike: [
        'Three real stuck points',
        'A question for each that keeps the work on the student',
        'Routes to tools/peers — no solving',
      ],
    },
    reflectionPrompt: 'Where do you "solve" instead of "support"? Name one habit to catch tomorrow.',
    nonNegotiables: [
      'Support, don\'t solve — friction adjusted, never removed.',
      'Don\'t direct from the front of the room.',
    ],
  },

  {
    id: 3,
    title: 'Motivation and Autonomy',
    estimatedTime: '12 min',
    competency: 'Develop motivational models',
    learningGoal: 'Design intrinsic, contribution-based motivation instead of extrinsic control.',
    scenario:
      'A 5th-grader keeps earning minimal XP. A colleague says: give them candy or screen time every day they hit target.',
    lessonPoints: [
      'Self-Determination Theory: meet Autonomy, Competence, Relatedness and motivation sustains itself.',
      'Extrinsic rewards backfire — remove the reward and motivation drops below baseline.',
      'XP is informational feedback, not a bribe. Autonomy is earned, not given.',
    ],
    example:
      'A Guide diagnoses the stall from data, finds the student\'s "why," and ties effort to a real goal — no prize.',
    artifact: {
      title: 'Cohort Motivational Model',
      prompt: 'Design a contribution-based motivational model for your cohort — no bribes.',
      starters: [
        'How students earn status by contributing',
        'What autonomy they unlock by demonstrating mastery',
        'How you find an individual\'s "why"',
      ],
      strongLooksLike: [
        'Contribution-based, not pay-for-work',
        'An earned-autonomy ladder tied to mastery',
        'A move for the low-motivation individual using data + their "why"',
      ],
    },
    reflectionPrompt: 'One extrinsic reward you\'ve leaned on — what contribution-based swap could replace it?',
    nonNegotiables: [
      'Rewards only for exceeding expectations or contribution — never routine pay-for-work.',
      'Autonomy is earned through mastery.',
    ],
    keyTerms: [
      {
        term: 'XP',
        def: 'Roughly a minute of verified learning on Timeback — a mastery signal, not a bribe.',
      },
    ],
  },

  {
    id: 4,
    title: 'Classroom Culture',
    estimatedTime: '14 min',
    competency: 'Uphold student-created systems',
    learningGoal: 'Build belonging through contribution; meet harm with repair, not punishment.',
    scenario:
      'A student tells the team not to let a peer join. The excluded student is visibly upset.',
    lessonPoints: [
      'Belonging comes from contribution — the way to matter is to add to the community.',
      'Standards are signed by students. Harm meets repair, not punishment-as-control.',
      'Read the room: sheep, shepherds, wolves. Catch drift early (Drift → Testing → Recruiting → Predation).',
    ],
    example:
      'The Guide names the harm and requires a repair that restores belonging — a real role for the excluded peer — before re-entry.',
    artifact: {
      title: 'Community Standards + Repair Plan',
      prompt: 'Draft standards students would sign, plus your repair flow for harm.',
      starters: [
        '2–3 standards in student voice',
        'Your repair steps: reflect → reset → restore → re-enter',
        'A repair script for one real situation',
      ],
      strongLooksLike: [
        'Standards in student language, signable',
        'Repair restores belonging — not just an apology',
        'Protects the community, not your authority',
      ],
    },
    reflectionPrompt: 'Is your recognition specific and behavior-named, or general praise? One to sharpen tomorrow.',
    nonNegotiables: [
      'Individual harm → individual repair; group harm → group repair.',
      'Standards signed by students; removal ends in repair before re-entry.',
    ],
    keyTerms: [
      {
        term: 'Intervention ladder',
        def: 'Drift → Testing → Recruiting → Predation. The earlier a Guide acts, the lighter the response. (See Foundations.)',
      },
    ],
  },

  {
    id: 5,
    title: 'Launch',
    estimatedTime: '10 min',
    competency: 'Curate environments',
    learningGoal: 'Run a calm, predictable, self-directed open that needs no Guide voice.',
    scenario:
      'It\'s 7:30. Students arrive at different times, some loud. You find yourself at the front getting them to settle.',
    lessonPoints: [
      'Launch is a calm, predictable self-start on a reflective/creative prompt.',
      'Stage prompt + lofi BEFORE entry. The Guide is not at the front. The move into Timeback is cued.',
      'For dysregulated arrivals: embed a daily regulation routine — don\'t manage reactively.',
    ],
    example:
      'Prompt on screen, lofi playing, materials in reach before anyone enters. Students step in and start; the Guide circulates quietly.',
    artifact: {
      title: 'Launch Environment Design',
      prompt: 'Design your Launch so it runs without your voice.',
      starters: [
        'The self-start prompt + audio',
        'What is staged before students enter',
        'The regulation tool a dysregulated student uses',
        'The cue into Timeback',
      ],
      strongLooksLike: [
        'Everything cued before entry',
        'A known regulation routine',
        'Guide stays off the front of the room',
      ],
    },
    reflectionPrompt: 'One thing you can stage before students enter tomorrow so Launch needs no voice?',
    nonNegotiables: [
      'Prompt + audio set before students enter.',
      'Guide does not direct from the front.',
      'Transition into Timeback is calm and cued.',
    ],
  },

  {
    id: 6,
    title: 'Core Skills',
    estimatedTime: '12 min',
    competency: 'Make data-informed decisions',
    learningGoal: 'Coach from live data, put mastery over speed, and keep the room running.',
    scenario:
      'During Timeback, one student is rushing to rack up XP; another is quietly scrolling something unrelated.',
    lessonPoints: [
      'Coach from live data — every interaction is data-informed. Not knowing your data isn\'t doing the job.',
      'Mastery over speed: gaming XP is an "isn\'t finished" problem. Check accuracy, not just XP.',
      'Redirect off-task within ~15 seconds, then keep circulating.',
    ],
    example:
      '"Your XP is up but accuracy dropped — let\'s get this one right." Brief, data-anchored, then keep moving.',
    artifact: {
      title: 'Daily Data-Coaching Routine',
      prompt: 'Write the routine you\'ll run to coach from data every day.',
      starters: [
        'What you scan first (XP, accuracy, target)',
        'Your move for a rushing student',
        'Your ~15-second off-task redirect',
        'How you keep time-on-task high',
      ],
      strongLooksLike: [
        'Uses accuracy, not just XP',
        'Mastery over speed',
        'Fast redirect; keeps circulating',
      ],
    },
    reflectionPrompt: 'How fast do you redirect off-task now? What would get you to ~15 seconds tomorrow?',
    nonNegotiables: [
      'Reference live Timeback data when coaching.',
      'Support, don\'t solve.',
      'Off-task corrected within ~15 seconds.',
    ],
    keyTerms: [
      {
        term: 'Q-Break',
        def: 'A short earned break after a focused block, gated by meeting subject minimums. A recharge, not a default.',
      },
    ],
  },

  {
    id: 7,
    title: 'Check Chart',
    estimatedTime: '10 min',
    competency: 'Structure earned autonomy',
    learningGoal: 'Tie autonomy to visible, student-owned evidence of mastery.',
    scenario:
      'One student never updates their Check Chart; another marked units "complete" with no proof of mastery.',
    lessonPoints: [
      'The Check Chart is physical, public, and student-administered — peer accountability by design.',
      'Autonomy is tied to evidence: visible progress unlocks the next freedom.',
      'Inflated marks meet "show me" — proof of mastery before a check stands.',
    ],
    example:
      'The Guide coaches the non-updater to mark their own chart and requires proof before a check counts — never marking it for them.',
    artifact: {
      title: 'Check Chart + Earned-Autonomy Map',
      prompt: 'Design your Check Chart and the autonomy it unlocks at each tier.',
      starters: [
        'How the chart stays physical, public, student-run',
        'What autonomy unlocks as students demonstrate mastery',
        'How you handle a non-updater and inflated marks',
      ],
      strongLooksLike: [
        'Student-administered, not Guide-run',
        'Autonomy tied to demonstrated mastery',
        'A proof-of-mastery standard peers can hold',
      ],
    },
    reflectionPrompt: 'Is your tracking student-run or Guide-run? One shift you can make tomorrow?',
    nonNegotiables: [
      'Charts are physical, public, student-administered.',
      'Autonomy is earned by evidence of mastery.',
    ],
    keyTerms: [
      {
        term: 'Builder Status tiers',
        def: 'Apprentice → Builder → Architect → Community Engineer — identity and demonstrated capability, not points.',
      },
    ],
  },

  {
    id: 8,
    title: 'Experiences',
    estimatedTime: '14 min',
    competency: 'Facilitate student-led Experiences',
    learningGoal: 'Facilitate hands-on, student-led work toward an observable Unit Assessment.',
    scenario:
      'Your afternoon Experience stalls: no clear goal, one student doing all the work, a prototype just failed — and some want to quit.',
    lessonPoints: [
      'Experiences are student-driven; the Guide facilitates, not lectures. Each anchors ONE competency.',
      '"If it doesn\'t work, it isn\'t finished." A failed prototype is feedback — require iteration, don\'t rescue.',
      'Lost direction = invisible target. Make Unit Assessment criteria observable so students self-direct.',
    ],
    example:
      '"It isn\'t finished until it works — what will you change next?" Iteration becomes the default; the Guide never fixes it.',
    artifact: {
      title: 'Experience Facilitation Plan',
      prompt: 'Plan a short student-led Experience you could facilitate (not teach).',
      starters: [
        'The ONE competency it anchors',
        'The observable Unit Assessment criteria',
        'Where reflection + iteration happen',
        'How you stay hands-off',
      ],
      strongLooksLike: [
        'Students do the building and thinking',
        'Criteria are observable and visible',
        'Iteration is built in; minimal lecture',
      ],
    },
    reflectionPrompt: 'Where could "if it doesn\'t work, it isn\'t finished" replace a moment you\'d normally fix?',
    nonNegotiables: [
      'Minimal lecture; students build.',
      'Reflection AND iteration included.',
      'Unit Assessment criteria observable.',
    ],
    keyTerms: [
      {
        term: 'Unit Assessment',
        def: 'The public, performance-based proof at the end of an Experience — single-skill, pass/fail, external quality bar.',
      },
    ],
  },

  {
    id: 9,
    title: 'Reflection and Coaching',
    estimatedTime: '10 min',
    competency: 'Provide emotional support to individuals',
    learningGoal: 'Verify real learning and close with specific, individual recognition.',
    scenario:
      'A student finished a unit but, asked to explain it in their own words, can\'t. The day is closing.',
    lessonPoints: [
      'Completion isn\'t the loop. "Tell me in your own words" is the always-on check.',
      'Data is a daily input — "what\'s happening now, and what am I doing today?"',
      'Close with specific, contribution-based shout-outs that name an Impact Skill.',
    ],
    example:
      'The Guide verifies with "own words," coaches the gap, then names a real contribution: "You taught two peers your method — that\'s Community Stewardship."',
    artifact: {
      title: 'Closing & Connection Routine',
      prompt: 'Write your end-of-day routine that verifies learning and supports individuals.',
      starters: [
        'Your "own words" verification question',
        'Two specific, contribution-based shout-outs (real students)',
        'How you check in on one student who needs support',
      ],
      strongLooksLike: [
        'Verifies understanding, not just completion',
        'Shout-outs name a specific contribution',
        'Includes a genuine individual check-in',
      ],
    },
    reflectionPrompt: 'How will you make "in your own words" a daily routine, not an afterthought?',
    nonNegotiables: [
      '"Tell me in your own words" is the always-on check.',
      'Shout-outs are specific and contribution-based.',
    ],
    keyTerms: [
      {
        term: 'Five Core Impact Skills',
        def: 'Interdependence, Resilience, Independence, Expression & Storytelling, Community Stewardship.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// FINAL GUIDE CERTIFICATION — capstone. Author a response to each moment.
// Covers every Guide competency, including planning a lasting-impact event.
// ---------------------------------------------------------------------------

export const finalSimulation: SimulationMoment[] = [
  {
    id: 'launch',
    label: 'A weak Launch',
    competency: 'Curate environments',
    scenario:
      'You arrive to a weak Launch: no prompt loaded, no audio, students entering loudly with nothing to do.',
    artifactPrompt: 'Write what you do in the next 3 minutes to recover Launch — and how you prevent it tomorrow.',
    strongLooksLike: [
      'Re-cues the environment fast (prompt + audio)',
      'Triggers the known regulation routine',
      'Stays off the front of the room',
      'Names a prevention for tomorrow',
    ],
    reflectionPrompt: 'What will you stage before students enter so Launch never depends on your voice?',
  },
  {
    id: 'transition',
    label: 'A messy transition',
    competency: 'Uphold student-created systems',
    scenario:
      'A messy transition: students wandering, materials not staged, the same question asked five times.',
    artifactPrompt: 'Author the student-run transition routine that fixes this — no Guide rescues.',
    strongLooksLike: [
      'Pre-staged next block',
      'Visible countdown / expectations',
      'Students self-manage materials',
      'No re-explaining, no idle waiting',
    ],
    reflectionPrompt: 'Which transition is still Guide-managed? How will you hand it to students?',
  },
  {
    id: 'coreskills',
    label: 'Off-task in Core Skills',
    competency: 'Make data-informed decisions',
    scenario:
      'During Timeback a student scrolls something unrelated while their XP sits well below target.',
    artifactPrompt: 'Write your move — fast, data-informed, support-not-solve — and how you keep the room running.',
    strongLooksLike: [
      'Redirects within ~15 seconds',
      'References live data / target',
      'Routes to a tool or peer',
      'Keeps circulating',
    ],
    reflectionPrompt: 'What signal will tell you, at a glance, that a student has drifted tomorrow?',
  },
  {
    id: 'motivation',
    label: 'A low-motivation student',
    competency: 'Develop motivational models',
    scenario:
      '"I don\'t care about any of this. School doesn\'t matter." XP and contribution are both low.',
    artifactPrompt: 'Author your approach — no bribes. How do you reach this student?',
    strongLooksLike: [
      'No extrinsic reward',
      'Uses data to find where it breaks',
      'Finds the student\'s "why"',
      'Creates a real contribution role',
    ],
    reflectionPrompt: 'Name one disengaged student. What real contribution could make them matter?',
  },
  {
    id: 'experience',
    label: 'A directionless Experience',
    competency: 'Facilitate student-led Experiences',
    scenario:
      'Halfway through an Experience, students are drifting — they don\'t know what they\'re working toward.',
    artifactPrompt: 'Write how you regain direction without lecturing.',
    strongLooksLike: [
      'Makes Unit Assessment criteria visible',
      'Students self-direct toward the target',
      'Embedded reflection',
      'No lecture',
    ],
    reflectionPrompt: 'How will you make your next Experience\'s end-goal visible enough to drive itself?',
  },
  {
    id: 'reflection',
    label: 'A reflection checkpoint',
    competency: 'Provide emotional support to individuals',
    scenario:
      'Day\'s end. A student hit a milestone but can\'t explain what they did or why it worked.',
    artifactPrompt: 'Write your close: verify the learning and recognize the student specifically.',
    strongLooksLike: [
      'Uses "tell me in your own words"',
      'Coaches the gap, not a redo',
      'A specific, skill-named shout-out',
      'A genuine individual connection',
    ],
    reflectionPrompt: 'One reflection question you\'ll ask every day to make "own words" routine?',
  },
  {
    id: 'event',
    label: 'A lasting-impact event',
    competency: 'Plan events with lasting impact',
    scenario:
      'The semester is ending. You want one event that students — and their families — remember.',
    artifactPrompt: 'Plan a student-led event that leaves a lasting impact on students and families.',
    strongLooksLike: [
      'Students lead and contribute — not just attend',
      'A real audience: families / community',
      'Shows what students built (public artifacts)',
      'Ties to belonging and contribution',
    ],
    reflectionPrompt: 'What event would make a family say "this school is different"?',
  },
]
