'use client'
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const CULTURE_ITEMS = [
  { icon: 'mdi:rocket-launch-outline', key: 'innovation' },
  { icon: 'mdi:account-group-outline', key: 'collaboration' },
  { icon: 'mdi:chart-line', key: 'growth' },
  { icon: 'mdi:scale-balance', key: 'balance' },
]

const OPENINGS = [
  { key: 'fullstack', icon: 'mdi:code-braces', dept: 'Engineering', location: 'Remote' },
  { key: 'mobile', icon: 'mdi:cellphone', dept: 'Engineering', location: 'Remote' },
  { key: 'productMgr', icon: 'mdi:clipboard-check-outline', dept: 'Product', location: 'Dubai, UAE' },
  { key: 'salesExec', icon: 'mdi:handshake-outline', dept: 'Sales', location: 'Dubai, UAE' },
  { key: 'support', icon: 'mdi:headset', dept: 'Support', location: 'Remote' },
]

const CareersPage = () => {
  const { t } = useTranslation()

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
              {OPENINGS.map((job, idx) => (
                <div className="opening-card" key={idx}>
                  <div className="opening-info">
                    <h4>{t(`careersPage.${job.key}Title`)}</h4>
                    <div className="opening-meta">
                      <span><Icon icon="mdi:briefcase-outline" /> {job.dept}</span>
                      <span><Icon icon="mdi:map-marker-outline" /> {job.location}</span>
                      <span><Icon icon="mdi:clock-outline" /> Full-time</span>
                    </div>
                  </div>
                  <Link href="/#contact" className="btn btn-outline-primary btn-sm">Apply</Link>
                </div>
              ))}
            </Col>
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
