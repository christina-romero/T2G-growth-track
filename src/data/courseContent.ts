import type { Module, SimulationMoment } from '../types'

// ---------------------------------------------------------------------------
// COURSE CONTENT
// Source of truth:
//   1. Access Model Brainlift (Paige Fults)
//   2. Future 2 Operational Playbook (Gregg + C. Martinez, SY 2026-27)
//   3. Access Model Training Data — Scenarios CSV
// Practice options are modelled on the CSV pattern:
//   Traditional Teacher Move  -> "Not Yet"
//   Partial / well-meant move -> "Developing" / "Ready"
//   Guide Move                -> "Guide-Level"
// ---------------------------------------------------------------------------

export const TOTAL_UNITS = 10 // 9 content modules + the final certification task

export const modules: Module[] = [
  // ----- MODULE 1 ---------------------------------------------------------
  {
    id: 1,
    title: 'The Access Model',
    estimatedTime: '20 min',
    learningGoal:
      'Explain what the Access Model is, why Future 2 is built on it, and how it differs from a traditional classroom.',
    scenario:
      'It is the first week of school. A parent stops you in the hallway: "I walked past your room and the kids were working on screens and the teacher wasn\'t at the front teaching. This doesn\'t look like real school. Why doesn\'t it look like the classroom I grew up in?"',
    lesson: [
      'The Access Model is Alpha\'s framework for extending its proven school model to mainstream public-school families — the students the flagship was never built for. Future 2 (Gregg and C. Martinez) is the Houston ISD translation of that model. It is not a watered-down version; it is engineered for a different set of constraints, and in some ways it is more rigorous.',
      'The day has two halves. Mornings protect focused, mastery-based academic work on Timeback. Afternoons turn that knowledge into capability through Experiences, where students prove what they know by doing. Students "earn time back" by mastering core skills, then spend it building.',
      'The model rests on five Design Laws: (1) Autonomy is earned, (2) Systems > subjects, (3) If it doesn\'t work, it isn\'t finished, (4) Belonging follows contribution, (5) Capability is forged through friction. These are engineering specs, not slogans.',
      'A defining feature is the 15-20:1 guide-to-student ratio. It is first a systems unlock, then an economic one: at that ratio guides cannot carry students, which forces independence, peer accountability, and community standards to become load-bearing. The proof point is Alpha Brownsville, where this model outperformed Alpha Austin for two consecutive years with a working- and middle-class population.',
    ],
    example: [
      'A strong Guide does not get defensive. They reframe: "You\'re right — it doesn\'t look like a traditional classroom, and that\'s deliberate. In the morning every child works at exactly their level on mastery-based lessons, so a student covers the same ground faster and deeper. I\'m not at the front because my job is to coach each student using their live data, not to lecture all of them at one pace."',
      'They anchor it in results, not theory: "This is the same model that, in Brownsville, helped mainstream public-school kids reach top-tier growth. In the afternoon your child builds and presents real work. You\'ll see it." Specific, calm, evidence-first — exactly the voice the Brainlift prescribes for talking to parents.',
    ],
    practice: {
      prompt:
        'A colleague says: "Honestly, Alpha\'s whole model only works for rich kids." What is the strongest Guide response?',
      options: [
        {
          id: 'a',
          text: 'Agree — the flagship costs $40-75k, so it probably does only work for advantaged families.',
          level: 'Not Yet',
          feedback:
            'This concedes the central claim the Access Model was built to disprove. The flagship tuition is real, but the model\'s mechanism is not tuition.',
        },
        {
          id: 'b',
          text: 'Say it works for any kid because all kids are capable, and move on.',
          level: 'Developing',
          feedback:
            'The belief is right but the response is generic. The Brainlift is explicit: a single number beats three paragraphs. Bring the proof.',
        },
        {
          id: 'c',
          text: 'Point to the model design — earned autonomy, mastery, contribution — and explain why it fits mainstream families.',
          level: 'Ready',
          feedback:
            'Good — you are arguing from the model\'s architecture. To reach Guide-Level, attach the evidence.',
        },
        {
          id: 'd',
          text: 'Name the data: Brownsville — mainstream public-school kids, 15-20:1, top-percentile growth — outperformed the flagship for two years. People say it can\'t be replicated because they need that to be true.',
          level: 'Guide-Level',
          feedback:
            'Exactly the Brainlift\'s Spiky POV #1 voice: lead with the inconvenient data, name the reflex, and let the number carry the argument.',
        },
      ],
    },
    rubric: [
      {
        name: 'Grounds the answer in the model',
        levels: {
          'Not Yet': 'Repeats the misconception or stays vague.',
          Developing: 'States a belief but offers no mechanism.',
          Ready: 'Explains the design (autonomy, mastery, contribution).',
          'Guide-Level':
            'Explains the design AND anchors it in named outcome data.',
        },
      },
      {
        name: 'Uses evidence over opinion',
        levels: {
          'Not Yet': 'No evidence; relies on assertion.',
          Developing: 'General claim ("kids are capable").',
          Ready: 'References that proof exists.',
          'Guide-Level': 'Cites the Brownsville result specifically.',
        },
      },
    ],
    reflectionPrompt:
      'A family member or skeptical colleague will ask you "why does this look different?" What is the one-sentence answer you would give tomorrow?',
    certifyTask:
      'Write a 3-4 sentence explanation of the Access Model you could give a Future 2 parent on day one. Name the morning/afternoon structure, one Design Law, and one piece of evidence.',
    nonNegotiables: [
      'Full-day commitment — morning academic block AND afternoon contribution, never just one half.',
      'The model is translated for the population, not diluted.',
    ],
    keyTerms: [
      {
        term: 'Timeback',
        def: 'The personalized, mastery-based platform powering the morning academic block. Students earn time back, and earned autonomy, by hitting daily XP targets.',
      },
      {
        term: 'Design Laws',
        def: 'The five core principles: autonomy is earned; systems > subjects; if it doesn\'t work it isn\'t finished; belonging follows contribution; capability is forged through friction.',
      },
    ],
  },

  // ----- MODULE 2 ---------------------------------------------------------
  {
    id: 2,
    title: 'The Role of the Guide',
    estimatedTime: '20 min',
    learningGoal:
      'Distinguish the Guide role from the traditional teacher role and operate from the seven responsibility domains.',
    scenario:
      'During the Core Skills block a student raises a hand: "I don\'t get problem 4." Your instinct, built over years of teaching, is to walk over and explain how to solve it. Three other hands go up while you do.',
    lesson: [
      'A Guide is not a teacher with a new title. Guides do not grade, write lesson plans, or deliver lectures. Their job is to create the conditions for students to build independence, sustain productive struggle, track their own mastery, and grow the Five Core Impact Skills.',
      'The Playbook names seven interlocking domains: Systems Execution, Motivation, Coaching, Accountability, Environment, Facilitation, and Reflection. A Guide is evaluated on whether the systems they run produce student ownership — not on personality, performance style, or how much they talk.',
      'The defining operating principle is "Support, don\'t solve." Guides adjust friction on the path; they never remove it. The only exception is unproductive struggle — friction with no learning value. A Guide who rescues a student from productive difficulty is training that student to wait for rescue.',
      'Great Guides know every student\'s Timeback XP every single day and coach from it. They coach more than they correct, move continuously through the room, and build systems students can run without them. At 15-20:1, that is not optional — it is the only way the room works.',
    ],
    example: [
      'Strong execution: the Guide does not walk over and solve problem 4. They ask, "What have you already tried? What tool could help here?" and point the student toward a resource or a peer who just mastered it. They keep moving.',
      'This is the "first responders are peers" design from the Five Design Choices. The Guide protects the productive struggle, distributes the cognitive load to the cohort, and reaches more students because they are not anchored to one desk solving one problem.',
    ],
    practice: {
      prompt:
        'A student says "I don\'t get this" during Timeback. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Walk over and explain the full solution so they can move on.',
          level: 'Not Yet',
          feedback:
            'This is the traditional rescue. It removes the friction that builds capability and trains the student to wait for an adult. (CSV: "Rescue reduces independence.")',
        },
        {
          id: 'b',
          text: 'Tell them to keep trying and come back later.',
          level: 'Developing',
          feedback:
            'You preserved the struggle but offered no scaffold or coaching — that can tip into unproductive struggle. Support is still your job.',
        },
        {
          id: 'c',
          text: 'Ask what they have tried and which tool or resource could help.',
          level: 'Ready',
          feedback:
            'Good coaching move — you adjust friction instead of removing it. To reach Guide-Level, route them to peers/resources and check their live data.',
        },
        {
          id: 'd',
          text: 'Glance at their XP/data, ask what they have tried, then point them to a tool or a peer who just mastered it — and keep circulating.',
          level: 'Guide-Level',
          feedback:
            'This is data-informed, support-not-solve coaching that keeps the room running and the cognitive load on the student. Exactly the role.',
        },
      ],
    },
    rubric: [
      {
        name: 'Support, don\'t solve',
        levels: {
          'Not Yet': 'Solves the problem for the student.',
          Developing: 'Withholds help but offers no path.',
          Ready: 'Coaches with a question and a resource.',
          'Guide-Level':
            'Coaches, routes to peers/tools, and protects the room.',
        },
      },
      {
        name: 'Uses live data',
        levels: {
          'Not Yet': 'Ignores data entirely.',
          Developing: 'Does not reference data.',
          Ready: 'Could check data but does not.',
          'Guide-Level': 'Glances at XP/data to inform the coaching move.',
        },
      },
    ],
    reflectionPrompt:
      'Where in your current practice do you "solve" instead of "support"? Name one habit you will catch yourself doing tomorrow.',
    certifyTask:
      'Pick one of the seven Guide domains (Systems Execution, Motivation, Coaching, Accountability, Environment, Facilitation, Reflection). Describe one concrete thing you will do tomorrow to make students — not you — do the work in that domain.',
    nonNegotiables: [
      'Guides support, do not solve — friction is adjusted, never removed.',
      'The Guide does not direct from the front of the room.',
      'The Guide knows every student\'s daily XP and coaches from it.',
    ],
  },

  // ----- MODULE 3 ---------------------------------------------------------
  {
    id: 3,
    title: 'Motivation and Autonomy',
    estimatedTime: '25 min',
    learningGoal:
      'Use intrinsic-motivation design (autonomy, competence, relatedness) and the Future 2 motivational architecture instead of extrinsic control.',
    scenario:
      'A 5th-grade student consistently earns minimal XP. A colleague suggests you offer them a prize — candy or extra screen time — every day they hit their target.',
    lesson: [
      'The Access Model\'s motivation design is grounded in Self-Determination Theory: humans have three needs — Autonomy (ownership over your actions), Competence (mastery at meaningful challenges), and Relatedness (belonging to something larger). Meet all three and intrinsic motivation becomes self-sustaining.',
      'The most important finding for Guides: extrinsic reward systems don\'t just fail to build motivation — they actively undermine it. Pay a student for expected work and the behavior\'s intrinsic value is replaced by the payment; remove it and motivation drops below baseline. Fryer\'s field experiment showed paying for test scores produced zero effect; paying for specific behaviors produced gains.',
      'That is why the model is contribution-based, not economic. "Autonomy Is the Currency": students earn independence by demonstrating mastery, never as a default. XP works because it is informational feedback (a mastery signal), not a tangible bribe — every 10 XP shows forward motion, and there is no way to fall behind a peer benchmark.',
      'For a low-XP student, the move is data-driven coaching and finding the student\'s "why" — not a prize. You diagnose with the data, build a plan, and connect the work to something the student values.',
    ],
    example: [
      'A strong Guide pulls the student\'s data, sees where XP stalls, and asks coaching questions: "Where does it get hard? What would make this feel worth it to you?" They build a short action plan and tie effort to a real goal the student names.',
      'They protect the system\'s integrity: rewards are reserved for exceeding expectations or genuine contribution (both unexpected and non-contingent), never as routine payment for routine work. That keeps the motivation durable instead of creating a dependency that collapses the moment the candy stops.',
    ],
    practice: {
      prompt:
        'A student keeps earning minimal XP. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Offer a daily prize for hitting the XP target.',
          level: 'Not Yet',
          feedback:
            'Tangible, expected, contingent rewards undermine intrinsic motivation and collapse when withdrawn. This trains "what do I get?" not "what can I build?"',
        },
        {
          id: 'b',
          text: 'Remind the student of the target and tell them to try harder.',
          level: 'Developing',
          feedback:
            'Raises awareness but offers no diagnosis or plan. Effort talk without data rarely moves a stalled student.',
        },
        {
          id: 'c',
          text: 'Pull the student\'s Timeback data and build a coaching plan around where they stall.',
          level: 'Ready',
          feedback:
            'Strong — data drives coaching. To reach Guide-Level, connect the plan to the student\'s own "why".',
        },
        {
          id: 'd',
          text: 'Use the data to diagnose the stall, find the student\'s "why," and build a weekly action plan tied to it.',
          level: 'Guide-Level',
          feedback:
            'This is the model: data-driven coaching + intrinsic motivation. Durable, and it does not depreciate when no one is watching.',
        },
      ],
    },
    rubric: [
      {
        name: 'Protects intrinsic motivation',
        levels: {
          'Not Yet': 'Introduces an extrinsic bribe.',
          Developing: 'Neutral nudge, no design.',
          Ready: 'Uses data, no "why".',
          'Guide-Level': 'Combines data with the student\'s own motivation.',
        },
      },
      {
        name: 'Data-driven',
        levels: {
          'Not Yet': 'No data used.',
          Developing: 'No data used.',
          Ready: 'Diagnoses with live data.',
          'Guide-Level': 'Diagnoses with data and plans from it.',
        },
      },
    ],
    reflectionPrompt:
      'Think of one extrinsic reward you have leaned on before. What is an intrinsic, contribution-based alternative you could try tomorrow?',
    certifyTask:
      'Describe how you would coach a low-motivation student WITHOUT any extrinsic reward. Reference live data and the student\'s "why".',
    nonNegotiables: [
      'Rewards are reserved for exceeding expectations or genuine contribution — never routine payment for routine work.',
      'Autonomy is earned through demonstrated mastery, not given by default.',
    ],
    keyTerms: [
      {
        term: 'XP',
        def: 'Roughly one minute of focused, verified learning on Timeback. A mastery signal and informational feedback — not a bribe. Earned for completion, lost for anti-patterns (gaming, rushing), bonus for 100% accuracy.',
      },
      {
        term: 'Autonomy Is the Currency',
        def: 'Tenet 1 — autonomy is always paired with accountability; students earn it by meeting standards.',
      },
    ],
  },

  // ----- MODULE 4 ---------------------------------------------------------
  {
    id: 4,
    title: 'Classroom Culture',
    estimatedTime: '25 min',
    learningGoal:
      'Build a culture of Community, Character, and Culture where belonging is earned through contribution and harm is met with repair.',
    scenario:
      'A student intentionally excludes a peer from a team during an Experience, telling others not to let them join. The excluded student is visibly upset.',
    lesson: [
      'Future 2 culture stands on three pillars: Community (belonging earned through contribution), Character (resilience, responsibility, autonomy built through real stakes), and Culture (high standards plus high support, visible every day). Each shows up in something a student does — co-creating Community Standards, running Town Hall, holding peers accountable — not a poster on the wall.',
      'The load-bearing principle is "Belonging Comes From Contribution." The way to matter in this school is to add something to it. That is the antidote to chronic disengagement: belonging through usefulness instead of belonging through compliance.',
      'Harm is handled with repair protocols, not punishment-as-control. The CSV is explicit about scale: individual harm requires individual repair; group harm requires group repair; property damage requires restitution and a repair plan; exclusion is restored through a repair action that rebuilds belonging.',
      'Culture is student-owned. The Guide protects the conditions; students do the culture work. Recognition names specific behavior tied to the Impact Skills rather than praising in the abstract — "effort is named by behavior rather than praised."',
    ],
    example: [
      'A strong Guide does not simply order the student to "let them play." They name the harm, require a repair action that restores belonging (the student finds a real role for the excluded peer and follows through), and tie the reset to contribution.',
      'They keep dignity intact and keep the standard high: the repair is the path back in. Over time, Town Hall and co-created Community Standards mean the cohort — not the Guide — holds this line.',
    ],
    practice: {
      prompt:
        'A student intentionally excludes a peer. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Send the student to the office / take away recess as punishment.',
          level: 'Not Yet',
          feedback:
            'Compliance-by-punishment does not restore belonging or teach contribution. Culture beats control. (CSV principle: Belonging Through Contribution.)',
        },
        {
          id: 'b',
          text: 'Tell both students to "work it out" on their own.',
          level: 'Developing',
          feedback:
            'Hands-off is not the same as student-owned. Exclusion is real harm and needs a structured repair, not avoidance.',
        },
        {
          id: 'c',
          text: 'Name the harm and require the student to apologize before rejoining.',
          level: 'Ready',
          feedback:
            'You are using repair, which is right. To reach Guide-Level, make the repair a contribution that actively restores belonging — not just words.',
        },
        {
          id: 'd',
          text: 'Name the harm and require a repair action that restores belonging — a real role for the excluded peer — before re-entry.',
          level: 'Guide-Level',
          feedback:
            'Restore belonging through a repair action. Exactly the CSV protocol for exclusion, and it builds the contribution culture.',
        },
      ],
    },
    rubric: [
      {
        name: 'Repair over punishment',
        levels: {
          'Not Yet': 'Punishes or removes the student.',
          Developing: 'Avoids / offloads the conflict.',
          Ready: 'Requires a verbal repair.',
          'Guide-Level': 'Requires a contribution-based repair that restores belonging.',
        },
      },
      {
        name: 'Builds contribution culture',
        levels: {
          'Not Yet': 'Relies on control.',
          Developing: 'No culture-building.',
          Ready: 'Restores the individual relationship.',
          'Guide-Level': 'Restores belonging through usefulness.',
        },
      },
    ],
    reflectionPrompt:
      'Recognition in your room — is it specific and behavior-named, or general praise? What is one shout-out you could make more specific tomorrow?',
    certifyTask:
      'Write the repair script you would use for a student who damaged shared classroom materials. Use restitution + a repair plan, and keep the student\'s dignity intact.',
    nonNegotiables: [
      'Individual harm -> individual repair; group harm -> group repair.',
      'The Guide protects the conditions; students do the culture work.',
      'Recognition is specific and contribution-based, not abstract praise.',
    ],
    keyTerms: [
      {
        term: 'Town Hall',
        def: 'The weekly student-led meeting where students shape and maintain culture. A student facilitator runs the room; adults are present but minimally intervene.',
      },
    ],
  },

  // ----- MODULE 5 ---------------------------------------------------------
  {
    id: 5,
    title: 'Launch',
    estimatedTime: '20 min',
    learningGoal:
      'Run a calm, predictable, self-directed Launch that regulates students for the Timeback block.',
    scenario:
      'It is 7:30. Students arrive at different times, some loud and dysregulated. You find yourself at the front calling for quiet and managing the room to settle before anyone can start.',
    lesson: [
      'Launch is the consistent, calm opening of the day with a focus on self-regulation. Students enter and self-start on a consistent reflective or creative prompt — journaling, drawing, creating to music — that regulates them before the academic block.',
      'The design is deliberately predictable. For elementary-age students, environmental predictability is how executive function and arousal are regulated; an unpredictable, high-energy opening produces dysregulation, not engagement. (In the Access Model the high-energy celebration moves to the CLOSE of the day, not the open.)',
      'The core look-for: the visual prompt and lofi audio are staged before students enter, entry is quiet and self-directed, the opening follows the same daily format, and the Guide does NOT direct from the front of the room. The transition into Timeback is calm and cued.',
      'When students arrive dysregulated, the answer is to embed a regulation routine INTO Launch and practice it daily — not to manage the room reactively. The CSV is consistent: predictable routines build regulation; teach the skill before you expect it.',
    ],
    example: [
      'Strong execution: before any student walks in, the prompt is on the screen, lofi is playing, and materials are within reach. Students step in, see the cue, and start — no Guide voice needed. The Guide circulates quietly.',
      'A dysregulated student has a known regulation tool to use as part of the routine. Because the format is identical every day, students could nearly run it themselves, and the move into Timeback happens on a cue, not a lecture.',
    ],
    practice: {
      prompt:
        'Students are arriving loud and unsettled at Launch. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Stand at the front and call the class to attention until they quiet down.',
          level: 'Not Yet',
          feedback:
            'Front-of-room management violates a Launch non-negotiable and makes the room depend on you. It also models an unpredictable opening.',
        },
        {
          id: 'b',
          text: 'Wait silently for them to settle before turning on the prompt.',
          level: 'Developing',
          feedback:
            'Better than directing, but the space was not cued before they entered. The prompt and audio should be set BEFORE arrival.',
        },
        {
          id: 'c',
          text: 'Have the prompt and lofi staged before entry so students self-start.',
          level: 'Ready',
          feedback:
            'Strong — the environment is cued. To reach Guide-Level, build a regulation routine into Launch for the dysregulated arrivals.',
        },
        {
          id: 'd',
          text: 'Stage the prompt and audio before entry, and embed a daily-practiced regulation check-in so dysregulated students have a known tool.',
          level: 'Guide-Level',
          feedback:
            'Predictable structure + an embedded regulation routine. This is exactly the Launch design for a mainstream cohort.',
        },
      ],
    },
    rubric: [
      {
        name: 'Predictable, cued environment',
        levels: {
          'Not Yet': 'Guide manages the room live.',
          Developing: 'Reactive; space cued late.',
          Ready: 'Prompt + audio staged before entry.',
          'Guide-Level': 'Fully cued AND regulation built into the routine.',
        },
      },
      {
        name: 'Guide posture',
        levels: {
          'Not Yet': 'Directs from the front.',
          Developing: 'Hovers / waits passively.',
          Ready: 'Circulates quietly.',
          'Guide-Level': 'Quiet presence; students self-run the open.',
        },
      },
    ],
    reflectionPrompt:
      'What is one thing you can stage before students enter tomorrow so Launch runs without your voice?',
    certifyTask:
      'Design your Launch routine: name the prompt, the audio, what is staged before entry, and the regulation tool a dysregulated student would use. Keep the Guide out of the front of the room.',
    nonNegotiables: [
      'Visual prompt and lofi audio are set before students enter.',
      'Entry is quiet and self-directed; opening follows the same daily format.',
      'The Guide does not direct from the front of the room.',
      'Transition into the Timeback block is calm and cued.',
    ],
  },

  // ----- MODULE 6 ---------------------------------------------------------
  {
    id: 6,
    title: 'Core Skills',
    estimatedTime: '25 min',
    learningGoal:
      'Sustain focused, self-directed Timeback work while coaching from live data and normalizing productive struggle.',
    scenario:
      'During the Timeback block you notice a student clicking through lessons quickly, earning XP but clearly rushing — and another student quietly off-task, scrolling something unrelated.',
    lesson: [
      'The Core Skills block is the morning Timeback academic work. The look-for: students sustain focused, self-directed work while the Guide coaches using live data. The target is 95-100% time on task, with the Guide continuously mobile and reaching every student multiple times.',
      'Two failure modes show up constantly. Gaming XP (rushing, clicking through) is an "If it doesn\'t work, it isn\'t finished" problem — the response is to prioritize mastery evidence over speed, not to celebrate the XP. Avoidance / off-task behavior should be redirected within 15 seconds.',
      'The Guide references live Timeback data continuously — every interaction is data-informed. The non-negotiable is blunt: a Guide who does not know their students\' data is not doing the job.',
      'Productive struggle is the default culture: students exhaust tools, resources, and peers before adult support, and push past difficulty rather than being rescued. The Guide supports, does not solve — friction is adjusted, never removed.',
    ],
    example: [
      'For the rushing student, a strong Guide checks the accuracy data, not just the XP, and coaches toward mastery: "Your XP is up but your accuracy dropped — let\'s slow down and get this one right. Speed isn\'t the goal; mastery is."',
      'For the off-task student, the Guide redirects within ~15 seconds with a brief, data-informed nudge — "Where are you against your daily target?" — and keeps circulating. The room stays at high time-on-task because the Guide is mobile and the systems are student-run.',
    ],
    practice: {
      prompt:
        'A student is rushing lessons to rack up XP. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Praise the high XP and let them keep going.',
          level: 'Not Yet',
          feedback:
            'XP without mastery is gaming the system. Rewarding it trains speed over learning. (CSV: "Mastery over speed.")',
        },
        {
          id: 'b',
          text: 'Tell them to slow down.',
          level: 'Developing',
          feedback:
            'The instinct is right but there is no data and no mastery check — easy for the student to ignore.',
        },
        {
          id: 'c',
          text: 'Check their accuracy data and coach toward mastery evidence.',
          level: 'Ready',
          feedback:
            'Strong — you are prioritizing mastery and using data. To reach Guide-Level, make it a clear, brief, data-anchored coaching loop and keep moving.',
        },
        {
          id: 'd',
          text: 'Pull accuracy vs. XP, name the gap ("XP up, accuracy down"), coach toward mastery, then continue circulating to keep time-on-task high.',
          level: 'Guide-Level',
          feedback:
            'Data-informed, mastery-first, room-aware. This is exactly Core Skills execution.',
        },
      ],
    },
    rubric: [
      {
        name: 'Mastery over speed',
        levels: {
          'Not Yet': 'Rewards XP / gaming.',
          Developing: 'Corrects without evidence.',
          Ready: 'Uses accuracy data to coach.',
          'Guide-Level': 'Names the data gap and coaches to mastery.',
        },
      },
      {
        name: 'Keeps the room running',
        levels: {
          'Not Yet': 'Ignores the rest of the room.',
          Developing: 'Stationary intervention.',
          Ready: 'Brief coaching move.',
          'Guide-Level': 'Coaches and keeps circulating; high time-on-task.',
        },
      },
    ],
    reflectionPrompt:
      'How quickly do you currently redirect off-task behavior? What system would help you hit the 15-second standard tomorrow?',
    certifyTask:
      'Describe how you will use live Timeback data in a single coaching interaction — what you look at, what you say, and how you keep the rest of the room at high time-on-task.',
    nonNegotiables: [
      'Students are actively engaged in Timeback work; daily XP target is visible and trackable.',
      'The Guide references live Timeback data when coaching.',
      'The Guide supports, does not solve — friction is adjusted, never removed.',
      'Off-task behavior is corrected within ~15 seconds.',
    ],
    keyTerms: [
      {
        term: 'Hole-Filling',
        def: 'The targeted, time-boxed intervention block for specific flagged knowledge gaps or missed subject minimums. Precise, not generic re-teaching.',
      },
      {
        term: 'Q-Break',
        def: 'A short earned break that follows a focused block, gated by meeting subject minimums. A recharge, not a default.',
      },
    ],
  },

  // ----- MODULE 7 ---------------------------------------------------------
  {
    id: 7,
    title: 'Check Chart',
    estimatedTime: '20 min',
    learningGoal:
      'Run a physical, public, student-administered Check Chart where students own their progress and peer accountability holds.',
    scenario:
      'You notice one student never updates their Check Chart, and another has marked several units "complete" with no evidence they actually mastered them.',
    lesson: [
      'The Check Chart is a physical, public, student-administered tracker — typically a whiteboard or wall display — that maps each student\'s path toward demonstrated mastery of Impact Skills and Competencies. It is the daily midday anchor where students reconcile, choose what to pursue next, and request a Unit Assessment when ready.',
      'Three non-negotiables: charts are physical and public (not digital), they are student-administered (not Guide-administered), and students know their current check status, Builder Status tier, and next milestone.',
      'Public, self-administered tracking changes ownership. When a student marks their own check, they are not receiving feedback — they are making a commitment visible to their peers. The student who has not marked their boxes is visible to every peer, not just the Guide. Peer accountability is the design, and it is essential at 15-20:1.',
      'Two failure modes: a student who never updates (tie autonomy to evidence of progress) and inflated reporting (require proof of mastery — "If it doesn\'t work, it isn\'t finished"). Peer verification needs taught quality standards so students don\'t rubber-stamp each other.',
    ],
    example: [
      'For the non-updater, a strong Guide ties autonomy to evidence: the student updates their own chart, and visible progress is what unlocks the next freedom. The Guide coaches the habit; the Guide does not mark the chart for them.',
      'For inflated reporting, the Guide requires proof of mastery before a check stands and uses it to teach the verification standard — "show me." Over time the cohort holds the quality bar, because the chart is public and peer accountability is built in.',
    ],
    practice: {
      prompt:
        'A student marks units "complete" on the Check Chart without evidence of mastery. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Trust the marks and move on — the chart is student-owned.',
          level: 'Not Yet',
          feedback:
            'Student ownership does not mean unverified. Inflated reporting erodes the whole system. (CSV: "Evidence matters.")',
        },
        {
          id: 'b',
          text: 'Erase their marks and tell them to stop cheating.',
          level: 'Developing',
          feedback:
            'Taking over the chart breaks the student-administered design and the dignity of the system. Require proof instead of punishing.',
        },
        {
          id: 'c',
          text: 'Ask the student to show proof of mastery before the check stands.',
          level: 'Ready',
          feedback:
            'Right — proof of mastery. To reach Guide-Level, use it to teach the verification standard so peers can hold it too.',
        },
        {
          id: 'd',
          text: 'Require proof of mastery, and use the moment to teach the quality-verification standard so peer accountability holds the bar.',
          level: 'Guide-Level',
          feedback:
            '"If it doesn\'t work, it isn\'t finished" + building peer verification. This protects the public, student-run system at scale.',
        },
      ],
    },
    rubric: [
      {
        name: 'Protects evidence of mastery',
        levels: {
          'Not Yet': 'Accepts unverified marks.',
          Developing: 'Polices without proof standard.',
          Ready: 'Requires proof of mastery.',
          'Guide-Level': 'Requires proof AND teaches verification.',
        },
      },
      {
        name: 'Keeps the chart student-owned',
        levels: {
          'Not Yet': 'No accountability.',
          Developing: 'Guide takes over the chart.',
          Ready: 'Student keeps ownership.',
          'Guide-Level': 'Student owns it; peers hold the standard.',
        },
      },
    ],
    reflectionPrompt:
      'Is your progress tracking physical and student-administered, or digital and Guide-run? What is one shift you can make tomorrow?',
    certifyTask:
      'Describe how you would set up your Check Chart so it is physical, public, and student-administered — and how you would coach a student who never updates theirs.',
    nonNegotiables: [
      'Charts are physical and public — not digital.',
      'Charts are student-administered — not Guide-administered.',
      'Students know their current check status, Builder Status tier, and next milestone.',
    ],
    keyTerms: [
      {
        term: 'Builder Status tiers',
        def: 'Apprentice -> Builder -> Architect -> Community Engineer. Tiers mark identity and demonstrated capability, not accumulated points.',
      },
      {
        term: 'Unit Assessment',
        def: 'The public, performance-based proof point at the end of an Experience or Cycle (equivalent to Alpha\'s Test2Pass): single-skill, pass/fail, anchored to an external quality bar.',
      },
    ],
  },

  // ----- MODULE 8 ---------------------------------------------------------
  {
    id: 8,
    title: 'Experiences',
    estimatedTime: '25 min',
    learningGoal:
      'Facilitate rigorous, hands-on Experiences anchored to one Competency, with reflection, iteration, and a public Unit Assessment.',
    scenario:
      'Your afternoon Experience has stalled. Students are milling around the materials with no clear goal, one student is doing all the work for the team, and a prototype just failed during testing — and several students want to quit.',
    lesson: [
      'Experiences are the hands-on, student-driven afternoon blocks where knowledge becomes capability. Each Experience anchors primarily ONE HISD Competency and 1-2 Habits of Success, follows a roadmap toward a public Unit Assessment, and is built so the Guide facilitates rather than lectures. Year 1 runs six Cycles, each anchoring one Impact Skill.',
      'The non-negotiables: a clear challenge at the appropriate Builder Status tier, minimal lecture, students actively building/creating/problem-solving, reflection included, an iteration opportunity, and Unit Assessment criteria that are referenced and observable.',
      'Iteration is the heart of it: "If it doesn\'t work, it isn\'t finished." A failed prototype is feedback, not the end — the response is to require iteration, not rescue or quit. Reflection is embedded throughout, not a perfunctory exit step.',
      'When one student does all the work, belonging-through-contribution is at stake: redistribute roles so every student has a meaningful contribution. An Experience "lacking direction" usually means the challenge, the criteria, or the end-goal are not visible — make the Unit Assessment target explicit so students can self-direct toward it.',
    ],
    example: [
      'A strong Guide does not jump in to fix the prototype. They point to the standard — "It doesn\'t work yet, so it isn\'t finished. What will you change on the next attempt?" — and normalize iteration as the default. Quitting is not on the table; revising is.',
      'For the lopsided team, the Guide assigns a meaningful contribution role to the disengaged student rather than letting one student carry it. For the directionless room, the Guide makes the Unit Assessment criteria visible so students can drive toward an observable target without being told each step.',
    ],
    practice: {
      prompt:
        'A team\'s prototype fails during testing and students want to give up. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Step in and fix the prototype so they can finish on time.',
          level: 'Not Yet',
          feedback:
            'Rescuing removes the friction that builds capability and ends the learning. Failure is feedback, not a stopping point.',
        },
        {
          id: 'b',
          text: 'Tell them it\'s okay, they tried their best, and move on.',
          level: 'Developing',
          feedback:
            'Kind, but it lets first attempt be final. There is no iteration and no revision culture.',
        },
        {
          id: 'c',
          text: 'Ask them what failed and require another attempt.',
          level: 'Ready',
          feedback:
            'Right — iteration. To reach Guide-Level, anchor it to the standard and the Unit Assessment criteria so the revision is purposeful.',
        },
        {
          id: 'd',
          text: 'Name the standard ("it isn\'t finished until it works"), have them diagnose the failure against the criteria, and run another iteration.',
          level: 'Guide-Level',
          feedback:
            '"If it doesn\'t work, it isn\'t finished," made concrete with the Unit Assessment criteria. Iteration becomes the default culture.',
        },
      ],
    },
    rubric: [
      {
        name: 'Iteration culture',
        levels: {
          'Not Yet': 'Fixes it for them.',
          Developing: 'Treats first attempt as final.',
          Ready: 'Requires a retry.',
          'Guide-Level': 'Anchors iteration to the standard / criteria.',
        },
      },
      {
        name: 'Facilitates, does not lecture',
        levels: {
          'Not Yet': 'Guide does the thinking.',
          Developing: 'Mostly Guide-led.',
          Ready: 'Balanced student/Guide talk.',
          'Guide-Level': 'Students do the cognitive heavy lifting.',
        },
      },
    ],
    reflectionPrompt:
      'In your next Experience, where could "if it doesn\'t work, it isn\'t finished" replace a moment where you would normally step in and fix it?',
    certifyTask:
      'Plan a short Experience: name the one Competency it anchors, the observable Unit Assessment criteria, where reflection happens, and how you build in iteration.',
    nonNegotiables: [
      'Clear challenge at the appropriate Builder Status tier; minimal lecture.',
      'Students actively building, creating, or problem-solving.',
      'Reflection AND an iteration opportunity are included.',
      'Unit Assessment criteria are referenced and observable.',
    ],
    keyTerms: [
      {
        term: 'Cycle',
        def: 'A 6-week period during which Experiences run. Year 1 has six Cycles, each anchoring one Impact Skill.',
      },
      {
        term: 'Experience',
        def: 'A hands-on, student-driven afternoon block where students practice an Impact Skill or HISD Competency through real, observable performance toward a Unit Assessment.',
      },
    ],
  },

  // ----- MODULE 9 ---------------------------------------------------------
  {
    id: 9,
    title: 'Reflection and Coaching',
    estimatedTime: '20 min',
    learningGoal:
      'Use embedded reflection, "tell me in your own words," and daily data as a coaching input — and close the day with contribution-based recognition.',
    scenario:
      'A student finished a Timeback unit and a colleague is reviewing data only in the monthly team meeting. Meanwhile a student you ask "tell me about what you just learned" can\'t explain it in their own words.',
    lesson: [
      'In the Access Model, completing a lesson is not the end of the learning loop. The always-on verification standard is "Tell me about that in your own words." A student who finished a lesson but cannot explain it, teach it, or build on it has not finished learning.',
      'Data is a daily coaching input, not a reporting tool. The question is never just "what did the data show at the end of term?" — it is "what is happening right now, and what am I doing about it today?" Guides know every student\'s XP every day and adjust. The data lag in traditional schooling is a culture problem; the Access Model solves it by coaching from data daily.',
      'Reflection is embedded, not bolted on. Students regularly analyze and improve their own performance. The Weekly Action Plan and self-audit (over rescue) turn reflection into a habit students run themselves.',
      'The day closes with high-energy, team-based recognition. Shout-outs are specific and contribution-based, and they explicitly name which of the Five Core Impact Skills or Builder Status tier a student demonstrated — recognition is a routine, not a random moment.',
    ],
    example: [
      'A strong Guide uses "tell me in your own words" as a routine check after mastery, catching shallow completion before it becomes a gap. When a student can\'t explain it, that is coaching information, not a verdict.',
      'They coach from data the same day a signal appears, build a quick action plan with the student, and close with named, specific shout-outs: "Maria hit Architect on the Check Chart and taught two peers her method — that\'s Community Stewardship." Recognition ties effort to behavior and to the Impact Skills.',
    ],
    practice: {
      prompt:
        'A student "completed" a unit but can\'t explain it in their own words. What is the Guide move?',
      options: [
        {
          id: 'a',
          text: 'Mark it done — the platform says they passed.',
          level: 'Not Yet',
          feedback:
            'Lesson completion is not the same as retention. Timeback verifies speed; the Guide verifies understanding.',
        },
        {
          id: 'b',
          text: 'Tell them to redo the whole lesson.',
          level: 'Developing',
          feedback:
            'Re-running the same input is what demotivates a stuck learner. Diagnose first; don\'t just repeat.',
        },
        {
          id: 'c',
          text: 'Use "tell me in your own words" to find where understanding breaks, then coach that spot.',
          level: 'Ready',
          feedback:
            'Strong verification + targeted coaching. To reach Guide-Level, turn it into a reflection habit the student runs themselves.',
        },
        {
          id: 'd',
          text: 'Verify with "tell me in your own words," coach the gap, and build a reflection/action-plan habit so the student self-audits next time.',
          level: 'Guide-Level',
          feedback:
            'Embedded reflection + self-audit over rescue. This makes the morning\'s content stick and builds metacognition.',
        },
      ],
    },
    rubric: [
      {
        name: 'Verifies real understanding',
        levels: {
          'Not Yet': 'Trusts completion alone.',
          Developing: 'Repeats input blindly.',
          Ready: 'Uses "own words" to diagnose.',
          'Guide-Level': 'Verifies and builds a reflection habit.',
        },
      },
      {
        name: 'Coaches from data daily',
        levels: {
          'Not Yet': 'Defers data to later.',
          Developing: 'No data use.',
          Ready: 'Acts on the signal now.',
          'Guide-Level': 'Acts now AND builds student self-audit.',
        },
      },
    ],
    reflectionPrompt:
      'What would you do differently tomorrow to make reflection a daily habit students run themselves — not something you tack on at the end?',
    certifyTask:
      'Write two specific, contribution-based closing shout-outs for real students, each naming one of the Five Core Impact Skills or a Builder Status tier.',
    nonNegotiables: [
      '"Tell me about that in your own words" is the always-on verification standard.',
      'Data is a daily coaching input, not an end-of-term report.',
      'Closing shout-outs are specific, contribution-based, and name an Impact Skill or Builder Status tier.',
    ],
    keyTerms: [
      {
        term: 'Five Core Impact Skills',
        def: 'Interdependence, Resilience, Independence/Autonomy, Expression & Storytelling, Community Stewardship — built in sequence across the year.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// FINAL GUIDE CERTIFICATION — classroom simulation (six moments)
// ---------------------------------------------------------------------------

export const finalSimulation: SimulationMoment[] = [
  {
    id: 'launch',
    label: 'A weak Launch',
    scenario:
      'You arrive to find the prompt isn\'t loaded, no audio is playing, and students are entering loudly with nothing to do. What is your Guide move?',
    practice: {
      prompt: 'Choose the strongest move for a weak Launch.',
      options: [
        {
          id: 'a',
          text: 'Call the room to order from the front and start a verbal mini-lesson.',
          level: 'Not Yet',
          feedback:
            'Front-of-room direction violates the Launch non-negotiables and makes the open depend on you.',
        },
        {
          id: 'b',
          text: 'Quietly get the prompt and lofi up, then wait for students to notice.',
          level: 'Developing',
          feedback:
            'Recovering the cue is right, but the space should be staged before entry and supported with a regulation routine.',
        },
        {
          id: 'c',
          text: 'Stage the prompt/audio now and cue the daily routine students recognize.',
          level: 'Ready',
          feedback:
            'Good recovery using the predictable structure. Add a regulation tool for dysregulated arrivals to reach Guide-Level.',
        },
        {
          id: 'd',
          text: 'Get the cued environment running, trigger the known regulation routine, and let the predictable format carry students into self-start.',
          level: 'Guide-Level',
          feedback:
            'Predictable, cued, self-directed, regulation-embedded — a Guide-Level Launch recovery.',
        },
      ],
    },
    reflectionPrompt:
      'What will you stage before students enter tomorrow so Launch never depends on your voice?',
  },
  {
    id: 'transition',
    label: 'A messy transition',
    scenario:
      'Moving from Core Skills to the next block, students are wandering, materials aren\'t staged, and you are being asked the same question five times. What is your Guide move?',
    practice: {
      prompt: 'Choose the strongest move for a messy transition.',
      options: [
        {
          id: 'a',
          text: 'Distribute and set up all the materials yourself to speed things up.',
          level: 'Not Yet',
          feedback:
            'Guide-managed materials break the student-run design and create idle waiting and rescues.',
        },
        {
          id: 'b',
          text: 'Re-explain the next steps to the whole group again.',
          level: 'Developing',
          feedback:
            'Re-explaining signals the routine isn\'t student-run yet. The fix is a visible system, not more instruction.',
        },
        {
          id: 'c',
          text: 'Point to the visible countdown/expectations and let students manage materials.',
          level: 'Ready',
          feedback:
            'Good — student-run with a visible cue. To reach Guide-Level, ensure next-block materials are pre-staged so handoff is seamless.',
        },
        {
          id: 'd',
          text: 'Pre-stage the next block, make the countdown and expectations visible, and let students self-manage materials with no Guide rescues.',
          level: 'Guide-Level',
          feedback:
            'Student-run, cued, seamless materials handoff, no idle waiting. Exactly the transition standard.',
        },
      ],
    },
    reflectionPrompt:
      'Which transition routine in your day is still Guide-managed? How will you hand it to students?',
  },
  {
    id: 'coreskills',
    label: 'A student off-task in Core Skills',
    scenario:
      'During Timeback a student has been scrolling something unrelated for nearly a minute while their XP sits well below their daily target. What is your Guide move?',
    practice: {
      prompt: 'Choose the strongest move for an off-task Core Skills moment.',
      options: [
        {
          id: 'a',
          text: 'Ignore it; they\'ll get back to it eventually.',
          level: 'Not Yet',
          feedback:
            'Off-task behavior should be redirected within ~15 seconds. Letting it linger lowers time-on-task across the room.',
        },
        {
          id: 'b',
          text: 'Publicly call the student out to make an example of them.',
          level: 'Developing',
          feedback:
            'Compliance-by-shame harms culture and dignity. Redirect briefly and use the data, not embarrassment.',
        },
        {
          id: 'c',
          text: 'Quietly redirect and ask where they stand against their daily target.',
          level: 'Ready',
          feedback:
            'Good, quick, data-aware redirect. To reach Guide-Level, root them in tools/peers first and keep circulating.',
        },
        {
          id: 'd',
          text: 'Redirect within ~15 seconds, reference their live data and target, point them to a tool or peer, and keep moving.',
          level: 'Guide-Level',
          feedback:
            'Fast, data-informed, support-not-solve, room-aware. Core Skills execution at Guide-Level.',
        },
      ],
    },
    reflectionPrompt:
      'What signal will tell you, at a glance, that a student has drifted off-task tomorrow?',
  },
  {
    id: 'motivation',
    label: 'A low-motivation student',
    scenario:
      'A student tells you flatly, "I don\'t care about any of this. School doesn\'t matter." Their XP and contribution are both low. What is your Guide move?',
    practice: {
      prompt: 'Choose the strongest move for a low-motivation student.',
      options: [
        {
          id: 'a',
          text: 'Offer a reward — screen time or candy — for hitting targets this week.',
          level: 'Not Yet',
          feedback:
            'Extrinsic bribes undermine intrinsic motivation and collapse when removed. This is the trap the model is built to avoid.',
        },
        {
          id: 'b',
          text: 'Tell them school matters for their future and they need to try harder.',
          level: 'Developing',
          feedback:
            'A lecture on importance rarely reaches a disengaged student. Connection and contribution do.',
        },
        {
          id: 'c',
          text: 'Increase contribution opportunities and look for the student\'s "why".',
          level: 'Ready',
          feedback:
            'Right direction — belonging through contribution. To reach Guide-Level, pair it with the data and a concrete plan.',
        },
        {
          id: 'd',
          text: 'Use data to find where it breaks, find the student\'s "why," and create a real contribution role that builds belonging.',
          level: 'Guide-Level',
          feedback:
            'Belonging through contribution + intrinsic motivation + data. Durable engagement, no bribe.',
        },
      ],
    },
    reflectionPrompt:
      'Name one student who feels disengaged. What real contribution could make them matter in your room?',
  },
  {
    id: 'experience',
    label: 'An Experience lacking direction',
    scenario:
      'Halfway through an Experience, students are drifting — they don\'t seem to know what they\'re working toward, and the energy is fading. What is your Guide move?',
    practice: {
      prompt: 'Choose the strongest move for a directionless Experience.',
      options: [
        {
          id: 'a',
          text: 'Switch to a lecture to fill the time and regain control.',
          level: 'Not Yet',
          feedback:
            'Experiences are facilitated, not lectured. Lecturing abandons the design and the student ownership.',
        },
        {
          id: 'b',
          text: 'Tell them to keep going and figure it out.',
          level: 'Developing',
          feedback:
            'Direction is missing because the target isn\'t visible — "figure it out" doesn\'t supply it.',
        },
        {
          id: 'c',
          text: 'Restate the challenge and the end goal so students can re-orient.',
          level: 'Ready',
          feedback:
            'Good — you are surfacing the goal. To reach Guide-Level, make the Unit Assessment criteria observable so students self-direct toward them.',
        },
        {
          id: 'd',
          text: 'Make the Unit Assessment criteria visible and observable, then let students self-direct toward the target with embedded reflection.',
          level: 'Guide-Level',
          feedback:
            'Visible, observable criteria let students self-direct — exactly how an Experience regains direction without lecture.',
        },
      ],
    },
    reflectionPrompt:
      'How will you make the end-goal of your next Experience visible enough that students can drive toward it without you?',
  },
  {
    id: 'reflection',
    label: 'A reflection checkpoint',
    scenario:
      'The day is closing. You have a few minutes. A student just hit a milestone but, when asked, can\'t quite explain what they did or why it worked. What is your Guide move?',
    practice: {
      prompt: 'Choose the strongest move for the reflection checkpoint.',
      options: [
        {
          id: 'a',
          text: 'Skip reflection — it\'s late and they passed anyway.',
          level: 'Not Yet',
          feedback:
            'Skipping reflection treats completion as the end of learning. The loop isn\'t finished until they can explain it.',
        },
        {
          id: 'b',
          text: 'Give a generic "good job today, everyone" and dismiss.',
          level: 'Developing',
          feedback:
            'Generic praise isn\'t recognition. Shout-outs should be specific and contribution-based.',
        },
        {
          id: 'c',
          text: 'Ask "tell me in your own words" and give a specific shout-out.',
          level: 'Ready',
          feedback:
            'Strong — verification + specific recognition. To reach Guide-Level, name the Impact Skill / Builder Status tier explicitly.',
        },
        {
          id: 'd',
          text: 'Use "tell me in your own words" to close the loop, then give a specific shout-out that names the Impact Skill or Builder Status tier demonstrated.',
          level: 'Guide-Level',
          feedback:
            'Embedded reflection + contribution-based, skill-named recognition. A Guide-Level close.',
        },
      ],
    },
    reflectionPrompt:
      'What is one reflection question you will ask every day to make "in your own words" a routine, not an afterthought?',
  },
]
