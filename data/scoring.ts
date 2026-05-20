import type {
  Answers, Category, CategoryQuestion, Option, OptionEffect, ScoredTool, Tool
} from './schema'

function findOption(q: CategoryQuestion, optionId: string): Option | null {
  return q.options.find((o) => o.id === optionId) ?? null
}

// Best-case points the effect can contribute (used to compute maxScore)
function maxContribution(effect: OptionEffect): number {
  switch (effect.kind) {
    case 'numeric':     return 10 * effect.weight
    case 'boolean':     return effect.value
    case 'hardFilter':  return 0
    case 'priceFilter': return 0
  }
}

// Best contribution across all options of a given question
function maxQuestionContribution(q: CategoryQuestion): number {
  let best = 0
  for (const opt of q.options) {
    let optMax = 0
    for (const e of opt.effects) optMax += maxContribution(e)
    if (optMax > best) best = optMax
  }
  return best
}

function applyEffect(
  tool: Tool,
  effect: OptionEffect,
  whyItWon: string[],
  whyItLost: string[],
  questionTitle: string
): number {
  switch (effect.kind) {
    case 'numeric': {
      const val = (tool[effect.field] ?? 0) as number
      const pts = val * effect.weight
      if (val >= 8) whyItWon.push(`Strong on ${effect.field} (${val}/10)`)
      return pts
    }
    case 'boolean': {
      const match = !!tool[effect.field]
      if (match) whyItWon.push(`Matches ${effect.field}`)
      else whyItLost.push(`Doesn't match ${effect.field}`)
      return match ? effect.value : 0
    }
    case 'hardFilter': {
      const actual = !!tool[effect.field]
      if (actual !== effect.expect) {
        whyItLost.push(effect.reason)
        return -effect.penalty
      }
      return 0
    }
    case 'priceFilter': {
      if (tool.price > effect.max && !tool.hasFree) {
        whyItLost.push(effect.reason.replace('{price}', String(tool.price)))
        return -effect.penalty
      }
      return 0
    }
  }
}

export function scoreCategory(category: Category, answers: Answers): ScoredTool[] {
  // Compute maxScore = sum of best-possible contributions across all questions
  const maxScore = category.questions.reduce(
    (sum, q) => sum + maxQuestionContribution(q),
    0
  )

  const scored = category.tools.map<ScoredTool>((tool) => {
    let score = 0
    const won: string[] = []
    const lost: string[] = []

    for (const q of category.questions) {
      const answerId = answers[q.id]
      if (!answerId) continue
      const opt = findOption(q, answerId)
      if (!opt) continue
      for (const eff of opt.effects) {
        score += applyEffect(tool, eff, won, lost, q.title)
      }
    }

    return {
      ...tool,
      score,
      maxScore,
      matchPercentage: Math.max(0, Math.min(100, Math.round((score / maxScore) * 100))),
      whyItWon: dedupe(won).slice(0, 3),
      whyItLost: dedupe(lost).slice(0, 3)
    }
  })

  return scored.sort((a, b) => b.score - a.score)
}

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr))
}
