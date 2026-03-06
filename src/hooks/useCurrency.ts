'use client'
import { useState, useEffect, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════
   Currency detection + live exchange rates from AED
   ═══════════════════════════════════════════════════════════════

   Flow:
   1. Detect user country via free geo-IP  →  country → currency code
   2. Fetch AED→X exchange rate from open API
   3. Fall back to AED if anything fails
   ══════════════════════════════════════════════════════════════ */

/** Country → currency mapping (most common) */
const COUNTRY_CURRENCY: Record<string, string> = {
  AE: 'AED', SA: 'SAR', EG: 'EGP', JO: 'JOD', LB: 'LBP',
  KW: 'KWD', BH: 'BHD', OM: 'OMR', QA: 'QAR', IQ: 'IQD',
  US: 'USD', GB: 'GBP', EU: 'EUR', DE: 'EUR', FR: 'EUR',
  IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR',
  PT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR', LU: 'EUR',
  IN: 'INR', PK: 'PKR', BD: 'BDT', TR: 'TRY', MA: 'MAD',
  TN: 'TND', DZ: 'DZD', LY: 'LYD', SD: 'SDG', YE: 'YER',
  SY: 'SYP', PS: 'ILS', IL: 'ILS', NG: 'NGN', KE: 'KES',
  ZA: 'ZAR', GH: 'GHS', CN: 'CNY', JP: 'JPY', KR: 'KRW',
  AU: 'AUD', CA: 'CAD', BR: 'BRL', MX: 'MXN', RU: 'RUB',
  PH: 'PHP', ID: 'IDR', MY: 'MYR', TH: 'THB', VN: 'VND',
  SG: 'SGD', HK: 'HKD', NZ: 'NZD', SE: 'SEK', NO: 'NOK',
  DK: 'DKK', PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON',
  CH: 'CHF',
}

/** Currency → symbol */
const CURRENCY_SYMBOLS: Record<string, string> = {
  AED: 'AED', SAR: 'SAR', EGP: 'EGP', JOD: 'JOD', KWD: 'KWD',
  BHD: 'BHD', OMR: 'OMR', QAR: 'QAR', IQD: 'IQD', LBP: 'LBP',
  USD: '$', GBP: '£', EUR: '€', INR: '₹', PKR: '₨',
  TRY: '₺', JPY: '¥', CNY: '¥', KRW: '₩', BRL: 'R$',
  RUB: '₽', THB: '฿', PHP: '₱', NGN: '₦', ZAR: 'R',
  MAD: 'MAD', TND: 'TND', DZD: 'DZD', BDT: '৳', MYR: 'RM',
  SGD: 'S$', HKD: 'HK$', AUD: 'A$', CAD: 'C$', NZD: 'NZ$',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', CZK: 'Kč',
  CHF: 'CHF', HUF: 'Ft', RON: 'lei', MXN: 'MX$',
  IDR: 'Rp', VND: '₫', GHS: 'GH₵', KES: 'KSh',
  LYD: 'LYD', SDG: 'SDG', YER: 'YER', SYP: 'SYP', ILS: '₪',
}

/** Supported currencies the user can manually switch to */
export const POPULAR_CURRENCIES = [
  'AED', 'USD', 'EUR', 'GBP', 'SAR', 'EGP', 'JOD', 'KWD',
  'QAR', 'OMR', 'BHD', 'INR', 'PKR', 'TRY',
]

export interface CurrencyInfo {
  code: string
  symbol: string
  rate: number        // 1 AED = rate X
  loading: boolean
  formatPrice: (aedAmount: number) => string
  setCurrency: (code: string) => void
}

const CACHE_KEY = 'traseallo_fx'
const CACHE_TTL = 3600_000 // 1 hour

function getCachedRates(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { ts, rates } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return rates
  } catch { return null }
}

function setCachedRates(rates: Record<string, number>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), rates }))
  } catch { /* quota */ }
}

export function useCurrency(): CurrencyInfo {
  const [code, setCode] = useState('AED')
  const [rates, setRates] = useState<Record<string, number>>({ AED: 1 })
  const [loading, setLoading] = useState(true)

  /* ── 1. Detect country → currency ── */
  useEffect(() => {
    let cancelled = false

    async function detectCountry() {
      try {
        // Try ipapi.co (free, no key needed, 1000 req/day)
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
        if (!res.ok) throw new Error('geo fail')
        const data = await res.json()
        const country = data.country_code || data.country
        if (!cancelled && country && COUNTRY_CURRENCY[country]) {
          setCode(COUNTRY_CURRENCY[country])
        }
      } catch {
        // Fallback: try ip-api.com
        try {
          const res = await fetch('http://ip-api.com/json/?fields=countryCode', { signal: AbortSignal.timeout(4000) })
          const data = await res.json()
          if (!cancelled && data.countryCode && COUNTRY_CURRENCY[data.countryCode]) {
            setCode(COUNTRY_CURRENCY[data.countryCode])
          }
        } catch {
          // stay on AED
        }
      }
    }

    detectCountry()
    return () => { cancelled = true }
  }, [])

  /* ── 2. Fetch exchange rates ── */
  useEffect(() => {
    let cancelled = false

    async function fetchRates() {
      // Check localStorage cache first
      const cached = getCachedRates()
      if (cached) {
        if (!cancelled) { setRates(cached); setLoading(false) }
        return
      }

      try {
        // Open exchange rate API (free, no key): https://open.er-api.com
        const res = await fetch('https://open.er-api.com/v6/latest/AED', { signal: AbortSignal.timeout(6000) })
        if (!res.ok) throw new Error('fx fail')
        const data = await res.json()
        if (!cancelled && data.rates) {
          const r = data.rates as Record<string, number>
          r['AED'] = 1
          setRates(r)
          setCachedRates(r)
        }
      } catch {
        // Fallback hardcoded approximate rates (AED base)
        const fallback: Record<string, number> = {
          AED: 1, USD: 0.2723, EUR: 0.2513, GBP: 0.2155,
          SAR: 1.0210, EGP: 13.35, JOD: 0.1929, KWD: 0.0837,
          QAR: 0.9911, OMR: 0.1048, BHD: 0.1026, INR: 22.76,
          PKR: 75.80, TRY: 9.82, GBR: 0.2155,
        }
        if (!cancelled) setRates(fallback)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRates()
    return () => { cancelled = true }
  }, [])

  const symbol = CURRENCY_SYMBOLS[code] || code
  const rate = rates[code] || 1

  const formatPrice = useCallback((aedAmount: number): string => {
    const converted = aedAmount * rate
    // For currencies where amounts are very large, no decimals
    if (converted >= 100) return Math.round(converted).toLocaleString()
    // For currencies with small values (KWD, BHD, OMR, JOD) keep 2 decimals
    if (rate < 0.15) return converted.toFixed(2)
    return Math.round(converted).toLocaleString()
  }, [rate])

  const setCurrency = useCallback((newCode: string) => {
    setCode(newCode)
  }, [])

  return { code, symbol, rate, loading, formatPrice, setCurrency }
}
