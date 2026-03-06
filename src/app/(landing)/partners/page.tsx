'use client'
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const PARTNER_TYPES = [
  { icon: 'mdi:store-outline', key: 'merchant' },
  { icon: 'mdi:handshake-outline', key: 'reseller' },
  { icon: 'mdi:code-tags', key: 'technology' },
  { icon: 'mdi:truck-outline', key: 'logistics' },
]

const BENEFITS = [
  { icon: 'mdi:cash-plus', key: 'revenue' },
  { icon: 'mdi:school-outline', key: 'training' },
  { icon: 'mdi:bullhorn-outline', key: 'comarketing' },
  { icon: 'mdi:headset', key: 'support' },
  { icon: 'mdi:api', key: 'api' },
  { icon: 'mdi:account-tie-outline', key: 'manager' },
]

const PartnersPage = () => {
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
              <span className="page-hero-tag">{t('partnersPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('partnersPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('partnersPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Partner Types */}
      <section className="section partners-types">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('partnersPage.typesTag')}</span>
              <h2 className="page-section-title">{t('partnersPage.typesTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {PARTNER_TYPES.map((pt, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div className="partner-type-card">
                  <div className="partner-type-icon"><Icon icon={pt.icon} /></div>
                  <h4>{t(`partnersPage.${pt.key}Title`)}</h4>
                  <p>{t(`partnersPage.${pt.key}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section bg-light partners-benefits">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('partnersPage.benefitsTag')}</span>
              <h2 className="page-section-title">{t('partnersPage.benefitsTitle')}</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              {BENEFITS.map((b, idx) => (
                <div className="benefit-item" key={idx}>
                  <div className="benefit-icon"><Icon icon={b.icon} /></div>
                  <div className="benefit-text">
                    <h5>{t(`partnersPage.${b.key}BenefitTitle`)}</h5>
                    <p>{t(`partnersPage.${b.key}BenefitDesc`)}</p>
                  </div>
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
              <h2 className="page-cta-title">{t('partnersPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('partnersPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#contact" className="btn btn-primary btn-lg">{t('partnersPage.ctaButton')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default PartnersPage
