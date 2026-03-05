'use client'
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const SECURITY_ITEMS = [
  { icon: 'mdi:shield-lock-outline', key: 'encryption' },
  { icon: 'mdi:account-key-outline', key: 'auth' },
  { icon: 'mdi:server-security', key: 'infra' },
  { icon: 'mdi:database-lock-outline', key: 'dataProtection' },
  { icon: 'mdi:eye-off-outline', key: 'privacy' },
  { icon: 'mdi:update', key: 'monitoring' },
]

const SecurityPage = () => {
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
              <span className="page-hero-tag">{t('securityPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('securityPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('securityPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Security Overview */}
      <section className="section page-content-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <span className="page-section-tag">{t('securityPage.overviewTag')}</span>
              <h2 className="page-section-title">{t('securityPage.overviewTitle')}</h2>
              <p className="page-content-text">{t('securityPage.overviewText')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Security Features Grid */}
      <section className="section bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('securityPage.gridTag')}</span>
              <h2 className="page-section-title">{t('securityPage.gridTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {SECURITY_ITEMS.map((item, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div className="page-card">
                  <div className="page-card-icon">
                    <Icon icon={item.icon} />
                  </div>
                  <h4 className="page-card-title">{t(`securityPage.${item.key}Title`)}</h4>
                  <p className="page-card-text">{t(`securityPage.${item.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Compliance */}
      <section className="section page-content-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <span className="page-section-tag">{t('securityPage.complianceTag')}</span>
              <h2 className="page-section-title">{t('securityPage.complianceTitle')}</h2>
              <p className="page-content-text">{t('securityPage.complianceText')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="page-cta section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="page-cta-title">{t('securityPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('securityPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#contact" className="btn btn-primary btn-lg">{t('securityPage.ctaButton')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default SecurityPage
