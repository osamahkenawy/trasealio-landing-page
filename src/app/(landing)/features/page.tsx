'use client'
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const FEATURES = [
  { icon: 'mdi:package-variant-closed', key: 'orderMgmt' },
  { icon: 'mdi:truck-fast-outline', key: 'dispatch' },
  { icon: 'mdi:map-marker-path', key: 'routing' },
  { icon: 'mdi:cellphone-link', key: 'driverApp' },
  { icon: 'mdi:map-marker-radius-outline', key: 'liveTracking' },
  { icon: 'mdi:cash-multiple', key: 'cod' },
  { icon: 'mdi:file-document-outline', key: 'invoicing' },
  { icon: 'mdi:chart-bar', key: 'analytics' },
  { icon: 'mdi:account-group-outline', key: 'clientPortal' },
  { icon: 'mdi:barcode-scan', key: 'barcode' },
  { icon: 'mdi:bell-outline', key: 'notifications' },
  { icon: 'mdi:cog-outline', key: 'multiTenant' },
]

const FeaturesPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <TopBar hideNav solidBg ctaLabel="Explore traseallo" ctaHref="/" />

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
        </div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-hero-tag">{t('featuresPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('featuresPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('featuresPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('featuresPage.gridTag')}</span>
              <h2 className="page-section-title">{t('featuresPage.gridTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {FEATURES.map((f, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div className="page-card">
                  <div className="page-card-icon">
                    <Icon icon={f.icon} />
                  </div>
                  <h4 className="page-card-title">{t(`featuresPage.${f.key}Title`)}</h4>
                  <p className="page-card-text">{t(`featuresPage.${f.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="page-cta section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-section-tag">{t('featuresPage.ctaTag')}</span>
              <h2 className="page-cta-title">{t('featuresPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('featuresPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#pricing" className="btn btn-primary btn-lg">{t('featuresPage.ctaButton')}</Link>
                <Link href="/#contact" className="btn btn-outline-primary btn-lg">{t('featuresPage.ctaDemo')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default FeaturesPage
