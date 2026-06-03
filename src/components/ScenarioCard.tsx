import type { ReactNode } from 'react'

interface ScenarioCardProps {
  /** e.g. "Hook" or "The moment" */
  kicker?: string
  scenario: string
  children?: ReactNode
}

/** Displays a realistic classroom scenario at the top of a module or moment. */
export default function ScenarioCard({ kicker = 'The Moment', scenario, children }: ScenarioCardProps) {
  return (
    <div className="scenariocard">
      <span className="scenariocard__kicker">🎬 {kicker}</span>
      <p className="scenariocard__text">{scenario}</p>
      {children}
    </div>
  )
}
