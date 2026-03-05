'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from '@/i18n'

/* ── Circular progress ring ───────────────────────────── */
const CircleProgress = ({ value, label, color = '#15c7ae' }: { value: number; label: string; color?: string }) => {
    const r = 54
    const circ = 2 * Math.PI * r
    const [offset, setOffset] = useState(circ)

    useEffect(() => {
        const timer = setTimeout(() => setOffset(circ - (value / 100) * circ), 200)
        return () => clearTimeout(timer)
    }, [value, circ])

    return (
        <div className="skill-ring">
            <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle
                    cx="65" cy="65" r={r} fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    transform="rotate(-90 65 65)"
                    style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' }}
                />
                <text x="65" y="65" textAnchor="middle" dominantBaseline="central" className="skill-ring-value">
                    {value}%
                </text>
            </svg>
            <p className="skill-ring-label">{label}</p>
        </div>
    )
}

/* ── Main Skill section ───────────────────────────────── */
const Skill = () => {
    const { t } = useTranslation()
    const sectionRef = useRef<HTMLElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold: 0.2 }
        )
        if (sectionRef.current) obs.observe(sectionRef.current)
        return () => obs.disconnect()
    }, [])

    const stats = [
        { end: 49, unit: t('skill.unitM'), label: t('skill.creativeUser'), desc: t('skill.creativeUserDesc'), icon: 'mdi:truck-delivery-outline' },
        { end: 97, unit: t('skill.unitPercent'), label: t('skill.successfulRate'), desc: t('skill.successfulRateDesc'), icon: 'mdi:server-security' },
    ]

    const rings = [
        { value: 96, label: t('skill.html'), color: '#15c7ae' },
        { value: 94, label: t('skill.css'), color: '#4C87F7' },
        { value: 91, label: t('skill.bootstrap'), color: '#F59E0B' },
    ]

    return (
        <section className="skill-section" ref={sectionRef}>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <span className="skill-badge">{t('skill.subtitle')}</span>
                            <h2 className="skill-heading mt-3">{t('skill.title')}</h2>
                            <p className="skill-subtext mt-2 mx-auto">{t('skill.description')}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5 pt-3 g-4 align-items-stretch">
                    {stats.map((s, i) => (
                        <Col lg={4} md={6} key={i}>
                            <div className={`skill-stat-card ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                                <div className="skill-stat-icon">
                                    <Icon icon={s.icon} width={28} />
                                </div>
                                <h2 className="skill-stat-number">
                                    {visible ? <CountUp end={s.end} duration={2.5} /> : '0'}
                                    <span className="skill-stat-unit">{s.unit}</span>
                                </h2>
                                <h5 className="skill-stat-label">{s.label}</h5>
                                <p className="skill-stat-desc">{s.desc}</p>
                            </div>
                        </Col>
                    ))}
                    <Col lg={4} md={12}>
                        <div className={`skill-rings-card ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                            <div className="skill-rings-row">
                                {rings.map((r, i) => (
                                    <CircleProgress key={i} value={visible ? r.value : 0} label={r.label} color={r.color} />
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Skill