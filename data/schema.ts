// Generic category schema. Every category uses this shape:
//   - questions: ordered list of weighted multiple-choice questions
//   - tools: array of tools with scoreable fields keyed by the option ids
// The scoring engine in `scoring.ts` walks the questions and applies each
// option's effect against each tool. Supports numeric weighting and hard
// filters (penalties) in a uniform way.

export type Color = 'primary' | 'match' | 'accent'

export type Badge = { label: string; kind: 'match' | 'accent' | 'muted' | 'pop' }

export type OptionEffect =
  | {
      // looks up tool[field] (a 0–10 number) and adds it × weight
      kind: 'numeric'
      field: string
      weight: number
    }
  | {
      // looks up tool[field] (boolean) — adds `value` if true, else 0
      kind: 'boolean'
      field: string
      value: number // points when boolean is true
    }
  | {
      // looks up tool[field] (boolean) — subtracts `penalty` if NOT matching `expect`
      kind: 'hardFilter'
      field: string
      expect: boolean
      penalty: number
      reason: string // user-facing "why it lost" reason
    }
  | {
      // numeric threshold filter — subtracts `penalty` if tool[field] > max
      // and tool.hasFree is false
      kind: 'priceFilter'
      max: number
      penalty: number
      reason: string
    }

export type Option = {
  id: string
  label: string
  desc: string
  effects: OptionEffect[]
  // for the original simple flow (icon-only questions)
  icon?: string
}

export type Question = {
  id: string
  num: number
  title: string
  subtitle: string
  weightLabel: string // 'High weight ×3' | 'Medium weight ×1.5' | 'Hard filter'
}

export type CategoryQuestion = Question & {
  options: Option[]
}

export type Tool = Record<string, any> & {
  id: string
  name: string
  maker: string
  icon: string
  color: Color
  affiliateUrl: string
  hasFree: boolean
  price: number
}

export type Category = {
  id: string
  label: string
  icon: string
  // Highest possible score = sum of every question's max contribution
  // (computed automatically by the scoring engine — no need to set it)
  questions: CategoryQuestion[]
  tools: Tool[]
}

export type Answers = Record<string, string> // questionId → optionId

export type ScoredTool = Tool & {
  score: number
  maxScore: number
  matchPercentage: number
  whyItWon: string[]
  whyItLost: string[]
}
