import { en } from './en'
import { es } from './es'

export type Translations = typeof en
export type Lang = 'en' | 'es'

export const translations: Record<Lang, Translations> = { en, es }
