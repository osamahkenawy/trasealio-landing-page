'use client'
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const ENDPOINTS = [
  { icon: 'mdi:package-variant-closed', key: 'orders' },
  { icon: 'mdi:truck-delivery-outline', key: 'shipments' },
  { icon: 'mdi:account-group-outline', key: 'clients' },
  { icon: 'mdi:account-hard-hat', key: 'drivers' },
  { icon: 'mdi:webhook', key: 'webhooks' },
  { icon: 'mdi:file-document-outline', key: 'invoices' },
]

const ApiDocsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <TopBar hideNav solidBg ctaLabel="Explore traseallo" ctaHref="/" />

      <section className="page-hero">
        <div className="page-hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
        </div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-hero-tag">{t('apiDocsPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('apiDocsPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('apiDocsPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Overview */}
      <section className="section page-content-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <span className="page-section-tag">{t('apiDocsPage.overviewTag')}</span>
              <h2 className="page-section-title">{t('apiDocsPage.overviewTitle')}</h2>
              <p className="page-content-text">{t('apiDocsPage.overviewText1')}</p>
              <p className="page-content-text">{t('apiDocsPage.overviewText2')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Endpoints Grid */}
      <section className="section bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('apiDocsPage.endpointsTag')}</span>
              <h2 className="page-section-title">{t('apiDocsPage.endpointsTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {ENDPOINTS.map((ep, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div className="page-card">
                  <div className="page-card-icon">
                    <Icon icon={ep.icon} />
                  </div>
                  <h4 className="page-card-title">{t(`apiDocsPage.${ep.key}Title`)}</h4>
                  <p className="page-card-text">{t(`apiDocsPage.${ep.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Auth & Rate Limits */}
      <section className="section page-content-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <h3>{t('apiDocsPage.authTitle')}</h3>
              <p className="page-content-text">{t('apiDocsPage.authText')}</p>
              <h3>{t('apiDocsPage.rateLimitTitle')}</h3>
              <p className="page-content-text">{t('apiDocsPage.rateLimitText')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="page-cta section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="page-cta-title">{t('apiDocsPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('apiDocsPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#contact" className="btn btn-primary btn-lg">{t('apiDocsPage.ctaButton')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default ApiDocsPage
