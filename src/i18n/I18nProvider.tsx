'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { Locale, Direction, localeDirection, defaultLocale } from './types'
import en from './locales/en.json'
import ar from './locales/ar.json'

const translations: Record<Locale, Record<string, unknown>> = { en, ar }

type I18nContextType = {
  locale: Locale
  dir: Direction
  t: (key: string) => string
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path // fallback to key
    }
  }
  return typeof current === 'string' ? current : path
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  const dir = localeDirection[locale]

  // Read persisted locale from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && stored !== locale) {
      setLocaleState(stored)
    }
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    document.body.dir = dir

    if (dir === 'rtl') {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }, [locale, dir, mounted])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
  }, [])

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key)
    },
    [locale]
  )

  const value = useMemo(() => ({ locale, dir, t, setLocale }), [locale, dir, t, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return ctx
}
