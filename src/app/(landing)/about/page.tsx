'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

// Placeholder images — user will supply real ones
import storyImg from '@/assets/images/about/story.png'
import missionImg from '@/assets/images/about/mission.png'

const VALUES_ICONS = [
  'mdi:eye-outline',           // Transparency
  'mdi:lightbulb-on-outline',  // Innovation
  'mdi:shield-check-outline',  // Reliability
  'mdi:rocket-launch-outline', // Empowerment
  'mdi:trending-up',           // Scale
  'mdi:account-heart-outline', // Customer First
]

const STATS_ICONS = [
  'mdi:truck-delivery-outline',
  'mdi:server-security',
  'mdi:domain',
  'mdi:earth',
]

const TIMELINE = [
  { year: '2024', icon: 'mdi:lightbulb-on-outline', key: 'timeline1' },
  { year: '2025', icon: 'mdi:rocket-launch-outline', key: 'timeline2' },
  { year: '2025', icon: 'mdi:account-group-outline', key: 'timeline3' },
  { year: '2026', icon: 'mdi:earth', key: 'timeline4' },
]

const TEAM_MEMBERS = [
  { key: 'member1', icon: 'mdi:account-tie' },
  { key: 'member2', icon: 'mdi:code-braces' },
  { key: 'member3', icon: 'mdi:cog-outline' },
  { key: 'member4', icon: 'mdi:chart-box-outline' },
]

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <TopBar hideNav solidBg ctaLabel="Explore traseallo" ctaHref="/" />

      {/* ── Hero Section ── */}
      <section className="about-hero">
        {/* Decorative elements — pure CSS, no images needed */}
        <div className="about-hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-line" />
          <div className="decor-line" />
          <div className="decor-line" />
          <div className="decor-dots">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="decor-dots-right">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="about-hero-tag">{t('aboutUs.heroTag')}</span>
              <h1 className="about-hero-title">{t('aboutUs.heroTitle')}</h1>
              <p className="about-hero-subtitle">{t('aboutUs.heroSubtitle')}</p>
              <div className="about-hero-scroll">
                <div className="scroll-line" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Story Section ── */}
      <section className="about-story section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6} className="order-lg-2">
              <div className="about-story-image">
                <Image src={storyImg} alt="Our Story" fill style={{ objectFit: 'cover' }} />
                <div className="about-story-image-accent" />
              </div>
            </Col>
            <Col lg={6} className="order-lg-1">
              <span className="about-section-tag">{t('aboutUs.storyTag')}</span>
              <h2 className="about-section-title">{t('aboutUs.storyTitle')}</h2>
              <p className="about-story-text">{t('aboutUs.storyP1')}</p>
              <p className="about-story-text">{t('aboutUs.storyP2')}</p>
              <p className="about-story-text fw-medium" style={{ color: '#244066' }}>
                {t('aboutUs.storyP3')}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="about-mission-vision section bg-light">
        <Container>
          <Row className="gy-5">
            <Col lg={6}>
              <div className="about-mv-card about-mv-mission">
                <div className="about-mv-icon-wrap">
                  <Icon icon="mdi:target" />
                </div>
                <span className="about-section-tag">{t('aboutUs.missionTag')}</span>
                <h3 className="about-mv-title">{t('aboutUs.missionTitle')}</h3>
                <p className="about-mv-text">{t('aboutUs.missionText')}</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-mv-card about-mv-vision">
                <div className="about-mv-icon-wrap">
                  <Icon icon="mdi:telescope" />
                </div>
                <span className="about-section-tag">{t('aboutUs.visionTag')}</span>
                <h3 className="about-mv-title">{t('aboutUs.visionTitle')}</h3>
                <p className="about-mv-text">{t('aboutUs.visionText')}</p>
                <div className="about-mv-image-wrapper">
                  <Image src={missionImg} alt="Vision" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Values Section ── */}
      <section className="about-values section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="about-section-tag">{t('aboutUs.valuesTag')}</span>
              <h2 className="about-section-title">{t('aboutUs.valuesTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Col lg={4} md={6} key={i}>
                <div className="about-value-card">
                  <div className="about-value-icon">
                    <Icon icon={VALUES_ICONS[i - 1]} />
                  </div>
                  <h4 className="about-value-title">{t(`aboutUs.value${i}Title`)}</h4>
                  <p className="about-value-desc">{t(`aboutUs.value${i}Desc`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Stats Section ── */}
      <section className="about-stats">
        <div className="about-stats-overlay" />
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="about-section-tag text-white-50">{t('aboutUs.statsTag')}</span>
              <h2 className="about-section-title text-white">{t('aboutUs.statsTitle')}</h2>
            </Col>
          </Row>
          <Row className="gy-4">
            {[1, 2, 3, 4].map((i) => (
              <Col lg={3} md={6} key={i}>
                <div className="about-stat-card">
                  <div className="about-stat-icon">
                    <Icon icon={STATS_ICONS[i - 1]} />
                  </div>
                  <h3 className="about-stat-value">{t(`aboutUs.stat${i}Value`)}</h3>
                  <p className="about-stat-label">{t(`aboutUs.stat${i}Label`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Journey / Timeline Section ── */}
      <section className="about-timeline section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="about-section-tag">{t('aboutUs.timelineTag')}</span>
              <h2 className="about-section-title">{t('aboutUs.timelineTitle')}</h2>
              <p className="page-section-subtitle mx-auto">{t('aboutUs.timelineSubtitle')}</p>
            </Col>
          </Row>
          <div className="about-timeline-track">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="about-timeline-item">
                <div className="about-timeline-dot">
                  <Icon icon={item.icon} />
                </div>
                <div className="about-timeline-content">
                  <span className="about-timeline-year">{item.year}</span>
                  <h4>{t(`aboutUs.${item.key}Title`)}</h4>
                  <p>{t(`aboutUs.${item.key}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Team Section ── */}
      <section className="about-team section bg-light">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="about-section-tag">{t('aboutUs.teamTag')}</span>
              <h2 className="about-section-title">{t('aboutUs.teamTitle')}</h2>
              <p className="page-section-subtitle mx-auto">{t('aboutUs.teamSubtitle')}</p>
            </Col>
          </Row>
          <Row className="gy-4 justify-content-center">
            {TEAM_MEMBERS.map((m, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div className="about-team-card">
                  <div className="about-team-avatar">
                    <Icon icon={m.icon} />
                  </div>
                  <h4>{t(`team.${m.key}Name`)}</h4>
                  <span className="about-team-role">{t(`team.${m.key}Role`)}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── CTA Section ── */}
      <section className="about-cta section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="about-section-tag">{t('aboutUs.ctaTag')}</span>
              <h2 className="about-cta-title">{t('aboutUs.ctaTitle')}</h2>
              <p className="about-cta-text">{t('aboutUs.ctaText')}</p>
              <div className="about-cta-buttons">
                <Link href="/#pricing" className="btn btn-primary btn-lg about-cta-btn-primary">
                  {t('aboutUs.ctaButton')}
                </Link>
                <Link href="/#contact" className="btn btn-outline-primary btn-lg about-cta-btn-outline">
                  {t('aboutUs.ctaDemo')}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default AboutPage
