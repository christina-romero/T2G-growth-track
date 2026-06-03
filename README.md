# T2G Growth Track

A self-paced web course that trains **Future 2 teachers to become certified Guides** who can run a
Future 2 classroom with high fidelity.

Built with **React + TypeScript + Vite**. Progress is saved to **localStorage**, so each teacher's
place, choices, and reflections persist on their own device — no backend required.

---

## Run it

> This machine does not currently have Node.js installed. Install Node 18+ first
> (https://nodejs.org — the LTS installer), then open a fresh terminal so `node` and `npm` are on
> your PATH.

```bash
cd "t2g-growth-track"
npm install
npm run dev
```

Vite prints a local URL (default http://localhost:5173). Open it in a browser.

To produce a static build you can host anywhere:

```bash
npm run build      # outputs to dist/
npm run preview    # serves the built app locally
```

The app uses a `HashRouter`, so the built `dist/` works from any static host (or even opened
directly) without server-side route config.

---

## Deploy to GitHub Pages (no local tooling required)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that **builds the app
in the cloud and publishes it to GitHub Pages on every push to `main`**. You do not need Node, npm,
or git installed locally — GitHub does the build for you.

> Treat the `t2g-growth-track/` folder as the repository root. Everything Pages needs
> (`package.json`, `index.html`, `src/`, `.github/`, `public/.nojekyll`) lives inside it.

### 1. Create the repository and add the files

Pick whichever is easiest — no command line needed:

- **GitHub web upload:** create a new repo at https://github.com/new (e.g. `t2g-growth-track`),
  then on the repo page choose **Add file → Upload files** and drag in the *contents* of the
  `t2g-growth-track` folder (so `package.json` sits at the repo root, not inside another folder).
  Commit to `main`.
  - Note: the web uploader skips dot-folders, so also create `.github/workflows/deploy.yml` via
    **Add file → Create new file** and paste it in. (`.nojekyll` can be created the same way.)
- **GitHub Desktop (recommended, GUI):** install from https://desktop.github.com, choose
  **File → Add local repository**, point it at the `t2g-growth-track` folder, publish to GitHub.
  It uploads everything including the `.github` folder.

### 2. Turn on Pages

In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions.**

### 3. Deploy

Push (or use **Actions → Deploy to GitHub Pages → Run workflow**). When the run finishes, the live
URL appears under **Settings → Pages** and on the workflow's `deploy` job — typically:

```
https://<your-username>.github.io/<repo-name>/
```

Because `vite.config.ts` sets `base: './'`, the app works at that project URL automatically — no repo
name to hard-code. Progress and reflections save per browser via `localStorage`.

> **Why not Streamlit?** Streamlit Community Cloud only runs Python (`streamlit run app.py`). A React
> app can only be embedded inside it via a sandboxed iframe, where `localStorage` is unreliable — so
> teacher progress would not reliably save. GitHub Pages serves this app natively with full
> persistence. If you still need a Streamlit wrapper for some reason, say so and I'll add one.

---

## How a teacher moves through it

Every module follows the same seven-step rhythm:

1. **Hook** — a realistic Future 2 classroom scenario
2. **Learn** — a short explanation of the core skill
3. **See It** — what strong Guide execution looks like
4. **Try It** — make the call on a real decision
5. **Get Feedback** — immediate, encouraging rubric feedback (Not Yet → Developing → Ready → Guide-Level)
6. **Reflect** — "What would you do differently tomorrow?"
7. **Certify** — a short written performance task that completes the module

### Modules

1. The Access Model
2. The Role of the Guide
3. Motivation and Autonomy
4. Classroom Culture
5. Launch
6. Core Skills
7. Check Chart
8. Experiences
9. Reflection and Coaching
10. **Final Guide Certification** — a six-moment classroom simulation (weak Launch, messy
   transition, off-task in Core Skills, low-motivation student, an Experience lacking direction, a
   reflection checkpoint)

### Certification levels

| Level | Earned at |
| --- | --- |
| **Explorer** | 25% complete |
| **Practitioner** | 50% complete |
| **Classroom Ready** | 75% complete |
| **Certified Guide** | completing the final performance task |

---

## Pages

- **Home dashboard** (`/`) — percent complete, modules completed, modules locked, certification
  level, and a Continue Course button
- **Course Map** (`/course`) — all ten steps, locking in sequence
- **Module page** (`/module/:id`) — the seven-step flow above
- **Certification progress** (`/certification`) — the level ladder, a module checklist, and your
  saved reflections
- **Final Guide Certification** (`/final`) — the classroom simulation
- The **Practice activity** and **Rubric feedback** appear as the Try It and Get Feedback steps
  inside each module flow.

## Reusable components

`DashboardCard`, `ModuleCard`, `ProgressBar`, `Badge`, `ScenarioCard`, `RubricFeedback`,
`ReflectionBox`, `CertificationStatus`.

---

## Where the content comes from

All terminology, scenarios, rubric language, non-negotiables, and certification-worthy behaviors are
drawn from three source files (treated as the source of truth):

1. **The Access Model Brainlift** — Design Laws, the five School Tenets, the Five Core Impact
   Skills, Builder Status tiers, the 15–20:1 ratio, "support, don't solve," Brownsville evidence.
2. **The Future 2 Operational Playbook** — the daily schedule, the Guide role and seven domains,
   the Walkthrough Rubric non-negotiables (Launch, Transitions, Core Skills, Check Chart,
   Experiences, Closing), and the glossary (XP, Timeback, Check Chart, Hole-Filling, Q-Break, Town
   Hall, Unit Assessment, Cycle, Experience).
3. **The Scenarios CSV** — the practice decisions are modelled on its pattern, where the
   *Traditional Teacher Move* maps to "Not Yet" and the *Guide Move* maps to "Guide-Level."

Anywhere a detail was not settled by the source files, the content is conservative and labelled
clearly rather than invented. A few program details are still **WIP in the source Playbook**
(e.g., the full Motivational & Emotional Support model, MAP testing specifics); those are referenced
but not fabricated here. If you want them built out, point me to the confirmed source and I'll add
them.

---

## Project structure

```
src/
  main.tsx                 app entry
  App.tsx                  router + ProgressProvider
  styles.css               full design system (Future 2 blue/gold)
  types.ts                 shared types (Module, RubricLevel, CourseProgress, …)
  data/courseContent.ts    all module + final-simulation content
  context/ProgressContext.tsx   localStorage-backed progress + certification logic
  components/              DashboardCard, ModuleCard, ProgressBar, Badge,
                           ScenarioCard, RubricFeedback, ReflectionBox,
                           CertificationStatus, Layout
  pages/                   Home, CourseMap, ModulePage,
                           CertificationProgress, FinalCertification
```
