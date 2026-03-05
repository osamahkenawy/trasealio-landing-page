'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'
import { useCurrency, POPULAR_CURRENCIES } from '@/hooks/useCurrency'

/* ──────────────────────────────────────────
   API base URL — reads from env or defaults to localhost:4001
   ────────────────────────────────────────── */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'

/* ──────────────────────────────────────────
   Slider stops (logarithmic-like scale)
   ────────────────────────────────────────── */
const STOPS = [0, 500, 1_000, 10_000, 100_000, 250_000, 500_000, 1_000_000]

function formatStops(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`
  return n.toLocaleString()
}

function sliderToStops(pct: number): number {
  const segments = STOPS.length - 1
  const segSize = 100 / segments
  const seg = Math.min(Math.floor(pct / segSize), segments - 1)
  const local = (pct - seg * segSize) / segSize
  return Math.round(STOPS[seg] + (STOPS[seg + 1] - STOPS[seg]) * local)
}

function stopsToSlider(stops: number): number {
  const segments = STOPS.length - 1
  const segSize = 100 / segments
  for (let i = 0; i < segments; i++) {
    if (stops <= STOPS[i + 1]) {
      const local = (stops - STOPS[i]) / (STOPS[i + 1] - STOPS[i])
      return i * segSize + local * segSize
    }
  }
  return 100
}

/* ──────────────────────────────────────────
   Plan definitions — fallback (used if API is unreachable)
   ────────────────────────────────────────── */
interface Plan {
  key: string
  base: number
  baseStops: number
  extraRate: number
  featured: boolean
  iconSvg: React.ReactNode
  badgeKey?: string
  featureCount: number
  featureKeys?: string[]
}

const StarterIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="2" y="12" width="26" height="26" rx="2" fill="#B7C2D6"/><path d="M14 14c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12H14V14Z" fill="url(#sg)" style={{ mixBlendMode: 'multiply' }}/><defs><linearGradient id="sg" x1="26" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse"><stop stopColor="#78A4F9"/><stop offset="1" stopColor="#4C87F7"/></linearGradient></defs></svg>
)

const GrowthIcon = () => (
  <svg width="41" height="40" viewBox="0 0 41 40" fill="none"><path d="M2.667 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v16.93a2 2 0 0 1-.891 1.664l-20 13.333c-1.33.886-3.11-.067-3.11-1.664V4Z" fill="#B7C2D6"/><rect x="14.666" y="14" width="24" height="24" rx="12" fill="url(#gg)" style={{ mixBlendMode: 'multiply' }}/><defs><linearGradient id="gg" x1="26.666" y1="14" x2="26.666" y2="38" gradientUnits="userSpaceOnUse"><stop stopColor="#78A4F9"/><stop offset="1" stopColor="#4C87F7"/></linearGradient></defs></svg>
)

const EnterpriseIcon = () => (
  <svg width="41" height="40" viewBox="0 0 41 40" fill="none"><path d="M14.336 10.763c-.001-.894-.002-1.342.154-1.714a2 2 0 0 1 .645-.827c.323-.242.757-.35 1.625-.568l17.597-4.399c1.356-.339 2.033-.508 2.567-.344.468.145.867.456 1.12.875.29.478.29 1.176.29 2.573v28.702a2 2 0 0 1-1.2 1.834 2 2 0 0 1-.8.166H17.568a2 2 0 0 1-2-2L14.336 10.763Z" fill="#B7C2D6"/><g style={{ mixBlendMode: 'multiply' }}><path d="M2.333 24.769a2 2 0 0 1 .156-1.711 2 2 0 0 1 .645-.826c.323-.242.756-.35 1.622-.567l17.6-4.407c1.356-.34 2.034-.509 2.567-.344a2 2 0 0 1 1.12.875c.29.478.29 1.177.29 2.574v14.699a2 2 0 0 1-2 2H5.533a2 2 0 0 1-2-2V24.77Z" fill="url(#eg)"/></g><defs><linearGradient id="eg" x1="14.333" y1="16.262" x2="14.333" y2="38.261" gradientUnits="userSpaceOnUse"><stop stopColor="#78A4F9"/><stop offset="1" stopColor="#4C87F7"/></linearGradient></defs></svg>
)

/** Icon mapping by slug */
const PLAN_ICONS: Record<string, React.ReactNode> = {
  starter: <StarterIcon />,
  growth: <GrowthIcon />,
  professional: <GrowthIcon />,
  enterprise: <EnterpriseIcon />,
}

/** Hardcoded fallback plans (used if API is unreachable) */
const FALLBACK_PLANS: Plan[] = [
  { key: 'starter', base: 750, baseStops: 1_000, extraRate: 0.04, featured: false, iconSvg: <StarterIcon />, featureCount: 6, featureKeys: ['starterF1','starterF2','starterF3','starterF4','starterF5','starterF6'] },
  { key: 'professional', base: 1350, baseStops: 2_000, extraRate: 0.06, featured: true, badgeKey: 'pricing.bestForFleets', iconSvg: <GrowthIcon />, featureCount: 5, featureKeys: ['growthF1','growthF2','growthF3','growthF4','growthF5'] },
  { key: 'enterprise', base: 2500, baseStops: 12_000, extraRate: 0.07, featured: false, iconSvg: <EnterpriseIcon />, featureCount: 4, featureKeys: ['enterpriseF1','enterpriseF2','enterpriseF3','enterpriseF4'] },
]

/* ──────────────────────────────────────────
   Feature check item
   ────────────────────────────────────────── */
const CheckItem = ({ text, badge }: { text: string; badge?: string }) => (
  <div className="pricing-check-item">
    <Icon icon="tabler:check" className="pricing-check-icon" />
    <div className="pricing-check-text-wrap">
      <span>{text}</span>
      {badge && <span className="pricing-coming-badge">{badge}</span>}
    </div>
  </div>
)

/* ──────────────────────────────────────────
   Billing popover
   ────────────────────────────────────────── */
const BillingPopover = ({
  plan, extraStops, extraCost, total, t, sym, fmt
}: { plan: Plan; extraStops: number; extraCost: number; total: number; t: (k: string) => string; sym: string; fmt: (n: number) => string }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="billing-popover-wrap" ref={ref}>
      <button
        className="billing-info-btn"
        aria-label="Show calculation"
        onClick={() => setOpen(o => !o)}
      >
        <Icon icon="tabler:info-circle" width={22} />
      </button>
      <div className={`billing-popover ${open ? 'is-open' : ''}`}>
        <div className="billing-popover-row">
          <div className="billing-popover-row-head">
            <span>{t('pricing.basePrice')}</span>
            <span>{sym} {fmt(plan.base)}</span>
          </div>
          <p className="billing-popover-sub">{t('pricing.includes')} {plan.baseStops.toLocaleString()} {t('pricing.deliveries')}</p>
        </div>
        <div className="billing-popover-row">
          <div className="billing-popover-row-head">
            <span>{t('pricing.extraStopsCost')}</span>
            <span>{sym} {fmt(extraCost)}</span>
          </div>
          <p className="billing-popover-sub">{extraStops.toLocaleString()} × {sym} {fmt(plan.extraRate)}</p>
        </div>
        <div className="billing-popover-row billing-popover-total">
          <div className="billing-popover-row-head">
            <span>{t('pricing.totalPerMonth')}</span>
            <span>{sym} {fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────
   Currency selector dropdown
   ────────────────────────────────────────── */
const CurrencySelector = ({
  current, onChange, loading
}: { current: string; onChange: (c: string) => void; loading: boolean }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="currency-selector" ref={ref}>
      <button
        className="currency-selector-btn"
        onClick={() => setOpen(o => !o)}
        disabled={loading}
      >
        <Icon icon="tabler:coin" width={16} />
        <span>{current}</span>
        <Icon icon="tabler:chevron-down" width={14} className={`currency-chevron ${open ? 'is-open' : ''}`} />
      </button>
      {open && (
        <div className="currency-dropdown">
          {POPULAR_CURRENCIES.map(c => (
            <button
              key={c}
              className={`currency-option ${c === current ? 'is-active' : ''}`}
              onClick={() => { onChange(c); setOpen(false) }}
            >
              {c}
              {c === current && <Icon icon="tabler:check" width={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   PRICING  COMPONENT
   ══════════════════════════════════════════ */
const Pricing = () => {
  const { t, dir } = useTranslation()
  const isRtl = dir === 'rtl'
  const { code: currCode, symbol: currSym, formatPrice, setCurrency, loading: currLoading } = useCurrency()

  /* ── Fetch plans from backend API ── */
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS)
  useEffect(() => {
    let cancelled = false
    async function fetchPlans() {
      try {
        const res = await fetch(`${API_BASE}/api/public/pricing`, { signal: AbortSignal.timeout(5000) })
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        if (!cancelled && data.success && data.plans?.length) {
          const mapped: Plan[] = data.plans.map((p: any) => ({
            key: p.key,
            base: p.base,
            baseStops: p.baseStops,
            extraRate: p.extraRate,
            featured: p.featured,
            badgeKey: p.badgeKey || undefined,
            iconSvg: PLAN_ICONS[p.key] || <StarterIcon />,
            featureCount: (p.featureKeys || []).length,
            featureKeys: p.featureKeys || [],
          }))
          setPlans(mapped)
        }
      } catch {
        // Keep fallback plans if API is unreachable
      }
    }
    fetchPlans()
    return () => { cancelled = true }
  }, [])

  /* slider state (0-100) */
  const [sliderPct, setSliderPct] = useState(() => stopsToSlider(500))
  const deliveries = useMemo(() => sliderToStops(sliderPct), [sliderPct])

  /* calculator modal */
  const [showCalc, setShowCalc] = useState(false)
  const [drivers, setDrivers] = useState('')
  const [stopsPerDriver, setStopsPerDriver] = useState('')
  const [freq, setFreq] = useState<'day' | 'week' | 'month'>('day')
  const [workDays, setWorkDays] = useState(5)

  const calcResult = useCallback(() => {
    const d = parseInt(drivers) || 0
    const s = parseInt(stopsPerDriver) || 0
    let monthly = d * s
    if (freq === 'day') monthly *= workDays * 4.33
    else if (freq === 'week') monthly *= 4.33
    return Math.round(monthly)
  }, [drivers, stopsPerDriver, freq, workDays])

  const handleUpdatePlans = () => {
    const result = calcResult()
    setSliderPct(stopsToSlider(Math.min(result, 1_000_000)))
    setShowCalc(false)
  }

  const handleResetSlider = () => setSliderPct(0)

  /* close modal on Escape + lock body scroll */
  useEffect(() => {
    if (!showCalc) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowCalc(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [showCalc])

  /* price computation per plan */
  const computePrice = useCallback((plan: Plan) => {
    const extra = Math.max(0, deliveries - plan.baseStops)
    const extraCost = Math.round(extra * plan.extraRate)
    return { price: plan.base + extraCost, extra, extraCost }
  }, [deliveries])

  return (
    <section className="pricing-section" id="pricing">
      <Container>
        {/* ── Header ── */}
        <Row>
          <Col lg={12}>
            <div className="text-center mb-5">
              <p className="title-sub-heading text-primary f-18">{t('pricing.subtitle')}</p>
              <h2 className="title-heading">{t('pricing.title')}</h2>
              <p className="title-desc text-muted mt-2">{t('pricing.description')}</p>
              <div className="pricing-currency-row">
                <span className="pricing-currency-label">{t('pricing.showPricesIn')}</span>
                <CurrencySelector current={currCode} onChange={setCurrency} loading={currLoading} />
              </div>
            </div>
          </Col>
        </Row>

        {/* ── Stops slider row ── */}
        <div className="pricing-slider-container">
          <div className="pricing-slider-top">
            <p className="pricing-slider-label">{t('pricing.howManyStops')}</p>
            <div className="pricing-slider-actions">
              {deliveries > 0 && (
                <button type="button" className="pricing-reset-btn" onClick={handleResetSlider}>
                  <Icon icon="tabler:arrow-back-up" width={14} />
                  <span>{t('pricing.resetStops')}</span>
                </button>
              )}
              <button type="button" className="pricing-calc-btn" onClick={() => setShowCalc(true)}>
                {t('pricing.useCalculator')}
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="pricing-slider-wrap">
            <div className="pricing-track">
              <div className="pricing-track-fill" style={{ width: `${sliderPct}%` }} />
              <input
                type="range"
                className="pricing-range-input"
                min={0}
                max={100}
                step={0.1}
                value={sliderPct}
                onChange={e => setSliderPct(parseFloat(e.target.value))}
                style={{ direction: 'ltr' }}
              />
            </div>
            <div className="pricing-slider-marks">
              {STOPS.map(s => (
                <div key={s} className="pricing-slider-mark">
                  <div className="pricing-mark-tick" />
                  <span className="pricing-mark-label">{s === 0 ? '0' : formatStops(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Plan cards ── */}
        <div className="pricing-cards-grid">
          {plans.map(plan => {
            const { price, extra, extraCost } = computePrice(plan)
            const headerKey = `pricing.${plan.key}Header`
            const featureKeys = plan.featureKeys?.length
              ? plan.featureKeys.map(fk => `pricing.${fk}`)
              : Array.from({ length: plan.featureCount }, (_, i) => `pricing.${plan.key}F${i + 1}`)
            return (
              <div key={plan.key} className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                <div className="pricing-card-top">
                  {plan.iconSvg}
                  {plan.badgeKey && (
                    <span className="pricing-card-badge">{t(plan.badgeKey)}</span>
                  )}
                </div>

                <h3 className="pricing-card-name">{t(`pricing.${plan.key}Name`)}</h3>
                <p className="pricing-card-desc">
                  <strong>{plan.baseStops.toLocaleString()} {t('pricing.baseDeliveries')}</strong> {t('pricing.andUnlimited')}
                </p>

                <div className="pricing-price-row">
                  <span className="pricing-price-symbol">{currSym}</span>
                  <span className="pricing-price">{formatPrice(price)}</span>
                  <div className="pricing-price-meta">
                    <span>{t('pricing.perMonth')}</span>
                    <span>{t('pricing.billedMonthly')}</span>
                  </div>
                  <BillingPopover plan={plan} extraStops={extra} extraCost={extraCost} total={price} t={t} sym={currSym} fmt={formatPrice} />
                </div>

                <a href="#contact" className={`pricing-cta ${plan.featured ? 'pricing-cta--primary' : ''}`}>
                  {t('pricing.getStarted')}
                </a>

                <div className="pricing-divider" />

                <div className="pricing-features-list">
                  <p className="pricing-features-header">{t(headerKey)}</p>
                  {featureKeys.map((fk, i) => (
                    <CheckItem key={i} text={t(fk)} />
                  ))}
                  {/* Special "Coming soon" items for enterprise */}
                  {plan.key === 'enterprise' && (
                    <CheckItem text={t('pricing.geofencing')} badge={t('pricing.comingSoon')} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Enterprise CTA ── */}
        <div className="pricing-enterprise-cta">
          <span>{t('pricing.lookingForEnterprise')}</span>
          <a href="#contact" className="pricing-enterprise-link">{t('pricing.getInTouch')}</a>
        </div>
      </Container>

      {/* ══ Calculator Modal (custom, no react-bootstrap) ══ */}
      {showCalc && (
        <div className="calc-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCalc(false) }}>
          <div className="calc-dialog">
            <h4 className="calc-title">{t('pricing.calcTitle')}</h4>

            <label className="calc-label">{t('pricing.calcDrivers')}</label>
            <input
              className="calc-input"
              type="number"
              min={0}
              placeholder={t('pricing.calcDriversPlaceholder')}
              value={drivers}
              onChange={e => setDrivers(e.target.value)}
            />

            <label className="calc-label">{t('pricing.calcStopsPerDriver')}</label>
            <input
              className="calc-input"
              type="number"
              min={0}
              placeholder={t('pricing.calcStopsPlaceholder')}
              value={stopsPerDriver}
              onChange={e => setStopsPerDriver(e.target.value)}
            />

            <label className="calc-label" style={{ marginTop: 18 }}>Frequency</label>
            <div className="calc-freq-group">
              {(['day', 'week', 'month'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  className={`calc-freq-btn ${freq === f ? 'is-active' : ''}`}
                  onClick={() => setFreq(f)}
                >
                  {t(`pricing.freq${f.charAt(0).toUpperCase() + f.slice(1)}`)}
                </button>
              ))}
            </div>

            {freq !== 'month' && (
              <>
                <label className="calc-label">{t('pricing.calcWorkDays')}</label>
                <div className="calc-days-group">
                  {[1, 2, 3, 4, 5, 6, 7].map(d => (
                    <button
                      key={d}
                      type="button"
                      className={`calc-day-btn ${workDays === d ? 'is-active' : ''}`}
                      onClick={() => setWorkDays(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Live result preview */}
            <div className="calc-result-preview">
              <span className="calc-result-label">{t('pricing.estimatedMonthly') || 'Estimated monthly deliveries'}</span>
              <span className="calc-result-value">{calcResult().toLocaleString()}</span>
            </div>

            <button type="button" className="calc-update-btn" onClick={handleUpdatePlans}>
              {t('pricing.updatePlans')}
            </button>
            <button type="button" className="calc-cancel-btn" onClick={() => setShowCalc(false)}>
              {t('pricing.cancel')}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Pricing
