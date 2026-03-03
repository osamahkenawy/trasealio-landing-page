export type Locale = 'en' | 'ar'

export type Direction = 'ltr' | 'rtl'

export const localeDirection: Record<Locale, Direction> = {
  en: 'ltr',
  ar: 'rtl',
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
}

export const locales: Locale[] = ['en', 'ar']
export const defaultLocale: Locale = 'en'
