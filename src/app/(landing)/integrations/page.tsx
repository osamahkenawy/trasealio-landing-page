'use client'
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const INTEGRATIONS = [
  { icon: 'mdi:shopping-outline', key: 'ecommerce' },
  { icon: 'mdi:credit-card-outline', key: 'payments' },
  { icon: 'mdi:message-text-outline', key: 'sms' },
  { icon: 'mdi:email-outline', key: 'email' },
  { icon: 'mdi:map-outline', key: 'maps' },
  { icon: 'mdi:cloud-outline', key: 'storage' },
  { icon: 'mdi:webhook', key: 'webhooks' },
  { icon: 'mdi:api', key: 'restApi' },
  { icon: 'mdi:cellphone-nfc', key: 'pushNotif' },
]

const IntegrationsPage = () => {
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
              <span className="page-hero-tag">{t('integrationsPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('integrationsPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('integrationsPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('integrationsPage.gridTag')}</span>
              <h2 className="page-section-title">{t('integrationsPage.gridTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {INTEGRATIONS.map((item, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div className="page-card">
                  <div className="page-card-icon">
                    <Icon icon={item.icon} />
                  </div>
                  <h4 className="page-card-title">{t(`integrationsPage.${item.key}Title`)}</h4>
                  <p className="page-card-text">{t(`integrationsPage.${item.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="page-cta section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-section-tag">{t('integrationsPage.ctaTag')}</span>
              <h2 className="page-cta-title">{t('integrationsPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('integrationsPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#pricing" className="btn btn-primary btn-lg">{t('integrationsPage.ctaButton')}</Link>
                <Link href="/#contact" className="btn btn-outline-primary btn-lg">{t('integrationsPage.ctaDemo')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default IntegrationsPage
