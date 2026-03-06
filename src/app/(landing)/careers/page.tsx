'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'

const CULTURE_ITEMS = [
  { icon: 'mdi:rocket-launch-outline', key: 'innovation' },
  { icon: 'mdi:account-group-outline', key: 'collaboration' },
  { icon: 'mdi:chart-line', key: 'growth' },
  { icon: 'mdi:scale-balance', key: 'balance' },
]

const BENEFITS = [
  { icon: 'mdi:laptop', key: 'remote' },
  { icon: 'mdi:school-outline', key: 'learning' },
  { icon: 'mdi:hospital-box-outline', key: 'health' },
  { icon: 'mdi:cash-multiple', key: 'equity' },
  { icon: 'mdi:island', key: 'pto' },
  { icon: 'mdi:food-apple-outline', key: 'wellness' },
]

const PROCESS_STEPS = [
  { icon: 'mdi:file-document-edit-outline', num: '01', key: 'step1' },
  { icon: 'mdi:phone-in-talk-outline', num: '02', key: 'step2' },
  { icon: 'mdi:code-tags', num: '03', key: 'step3' },
  { icon: 'mdi:handshake-outline', num: '04', key: 'step4' },
]

interface Opening {
  id: number
  title: string
  department: string
  location: string
  employment_type: string
  icon: string
}

const CareersPage = () => {
  const { t } = useTranslation()
  const [openings, setOpenings] = useState<Opening[]>([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/careers`, { signal: AbortSignal.timeout(5000) })
      .then(r => r.json())
      .then(d => { if (d.success && d.openings) setOpenings(d.openings) })
      .catch(() => {})
      .finally(() => setLoadingJobs(false))
  }, [])

  return (
    <>
      <TopBar hideNav solidBg ctaLabel="Explore Trasealio" ctaHref="/" />

      <section className="page-hero">
        <div className="page-hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
        </div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-hero-tag">{t('careersPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('careersPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('careersPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Culture */}
      <section className="section careers-culture">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('careersPage.cultureTag')}</span>
              <h2 className="page-section-title">{t('careersPage.cultureTitle')}</h2>
              <p className="page-section-subtitle mx-auto">{t('careersPage.cultureSubtitle')}</p>
            </Col>
          </Row>
          <Row className="gy-4">
            {CULTURE_ITEMS.map((c, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div className="culture-card">
                  <div className="culture-icon"><Icon icon={c.icon} /></div>
                  <h4>{t(`careersPage.${c.key}Title`)}</h4>
                  <p>{t(`careersPage.${c.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="section bg-light careers-openings">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('careersPage.openingsTag')}</span>
              <h2 className="page-section-title">{t('careersPage.openingsTitle')}</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              {loadingJobs ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="mt-2 text-muted">Loading positions...</p>
                </div>
              ) : openings.length === 0 ? (
                <div className="text-center py-4">
                  <Icon icon="mdi:briefcase-search-outline" style={{ fontSize: 48, color: '#787a7d' }} />
                  <p className="mt-2 text-muted">No open positions at the moment. Check back soon!</p>
                </div>
              ) : (
                openings.map((job) => (
                  <div className="opening-card" key={job.id}>
                    <div className="opening-info">
                      <h4>{job.title}</h4>
                      <div className="opening-meta">
                        <span><Icon icon="mdi:briefcase-outline" /> {job.department}</span>
                        <span><Icon icon="mdi:map-marker-outline" /> {job.location}</span>
                        <span><Icon icon="mdi:clock-outline" /> {job.employment_type}</span>
                      </div>
                    </div>
                    <Link href={`/careers/apply/${job.id}`} className="btn btn-outline-primary btn-sm">Apply</Link>
                  </div>
                ))
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits & Perks */}
      <section className="section careers-benefits">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('careersPage.benefitsTag')}</span>
              <h2 className="page-section-title">{t('careersPage.benefitsTitle')}</h2>
              <p className="page-section-subtitle mx-auto">{t('careersPage.benefitsSubtitle')}</p>
            </Col>
          </Row>
          <Row className="gy-4">
            {BENEFITS.map((b, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div className="benefit-card">
                  <div className="benefit-icon"><Icon icon={b.icon} /></div>
                  <h4>{t(`careersPage.${b.key}Title`)}</h4>
                  <p>{t(`careersPage.${b.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Hiring Process */}
      <section className="section bg-light careers-process">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('careersPage.processTag')}</span>
              <h2 className="page-section-title">{t('careersPage.processTitle')}</h2>
              <p className="page-section-subtitle mx-auto">{t('careersPage.processSubtitle')}</p>
            </Col>
          </Row>
          <Row className="gy-4 justify-content-center">
            {PROCESS_STEPS.map((s, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div className="process-step-card">
                  <div className="process-step-num">{s.num}</div>
                  <div className="process-step-icon"><Icon icon={s.icon} /></div>
                  <h4>{t(`careersPage.${s.key}Title`)}</h4>
                  <p>{t(`careersPage.${s.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="page-cta section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="page-cta-title">{t('careersPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('careersPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#contact" className="btn btn-primary btn-lg">{t('careersPage.ctaButton')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default CareersPage
