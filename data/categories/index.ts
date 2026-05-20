import type { Category } from '../schema'
import { videoCategory } from './video'
import { voiceCategory } from './voice'
import { imageCategory } from './image'
import { writingCategory } from './writing'
import { codeCategory } from './code'
import { slidesCategory } from './slides'
import { seoCategory } from './seo'
import { chatbotCategory } from './chatbot'
import { supportCategory } from './support'
import { dataCategory } from './data'

export const categories: Record<string, Category> = {
  video:   videoCategory,
  voice:   voiceCategory,
  image:   imageCategory,
  writing: writingCategory,
  code:    codeCategory,
  slides:  slidesCategory,
  seo:     seoCategory,
  chatbot: chatbotCategory,
  support: supportCategory,
  data:    dataCategory
}

export type CategoryId = keyof typeof categories

export function getCategory(id: string): Category | null {
  return categories[id as CategoryId] ?? null
}
