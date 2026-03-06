'use client'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const SECTIONS = [
  'infoCollect', 'howUse', 'sharing', 'cookies',
  'dataSecurity', 'retention', 'rights', 'children', 'changes', 'contact',
]

const PrivacyPolicyPage = () => {
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
              <span className="page-hero-tag">{t('privacyPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('privacyPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('privacyPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section legal-page">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <p className="legal-effective-date">{t('privacyPage.effectiveDate')}</p>
              <p className="page-content-text">{t('privacyPage.intro')}</p>

              {SECTIONS.map((key) => (
                <div className="legal-section" key={key}>
                  <h3>{t(`privacyPage.${key}Title`)}</h3>
                  <p>{t(`privacyPage.${key}Text`)}</p>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default PrivacyPolicyPage
