'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

import rulers from '@/assets/images/icon/rulers.png'
import compose from '@/assets/images/icon/compose.png'
import presentation from '@/assets/images/icon/presentation.png'
import { StaticImageData } from 'next/image'

// ── English screenshots ──
import en1 from '@/assets/images/features/english/1.png'
import en2 from '@/assets/images/features/english/2.png'
import en3 from '@/assets/images/features/english/3.png'
import en4 from '@/assets/images/features/english/4.png'
import en5 from '@/assets/images/features/english/5.png'
import en6 from '@/assets/images/features/english/6.png'
import en7 from '@/assets/images/features/english/7.png'
import en8 from '@/assets/images/features/english/8.png'
// ── Arabic screenshots ──
import ar1 from '@/assets/images/features/arabic/1.png'
import ar2 from '@/assets/images/features/arabic/2.png'
import ar3 from '@/assets/images/features/arabic/3.png'
import ar4 from '@/assets/images/features/arabic/4.png'
import ar5 from '@/assets/images/features/arabic/5.png'
import ar6 from '@/assets/images/features/arabic/6.png'
import ar7 from '@/assets/images/features/arabic/7.png'

type FeatureMeta = {
    icon: StaticImageData
    num: string
    translationKey: string
    heroImage: { en: StaticImageData; ar: StaticImageData }
    gallery: { en: StaticImageData[]; ar: StaticImageData[] }
}

const featureMeta: Record<string, FeatureMeta> = {
    'merchant-portal': {
        icon: rulers,
        num: '01',
        translationKey: 'featureDetail.merchantPortal',
        heroImage: { en: en2, ar: ar7 },
        gallery: {
            en: [en1, en5, en6],
            ar: [ar1, ar5, ar6],
        },
    },
    'dispatch-command-center': {
        icon: compose,
        num: '02',
        translationKey: 'featureDetail.dispatchCenter',
        heroImage: { en: en3, ar: ar3 },
        gallery: {
            en: [en7, en8, en4],
            ar: [ar2, ar4, ar7],
        },
    },
    'route-optimization': {
        icon: presentation,
        num: '03',
        translationKey: 'featureDetail.routeOptimization',
        heroImage: { en: en4, ar: ar4 },
        gallery: {
            en: [en6, en1, en5],
            ar: [ar3, ar1, ar5],
        },
    },
}

const slugOrder = ['merchant-portal', 'dispatch-command-center', 'route-optimization']

const FeatureDetailPage = () => {
    const params = useParams()
    const slug = params.slug as string
    const { t, locale } = useTranslation()
    const lang = locale as 'en' | 'ar'

    const meta = featureMeta[slug]

    if (!meta) {
        return (
            <>
                <TopBar />
                <section className="feature-detail-page" style={{ paddingTop: 140 }}>
                    <Container>
                        <div className="text-center py-5">
                            <h2>Feature not found</h2>
                            <Link href="/#features" className="btn btn-primary mt-3">
                                <Icon icon="mdi:arrow-left" className="me-2" />
                                {t('featureDetail.backToFeatures')}
                            </Link>
                        </div>
                    </Container>
                </section>
                <Footer />
            </>
        )
    }

    const k = meta.translationKey
    const currentIdx = slugOrder.indexOf(slug)
    const prevSlug = currentIdx > 0 ? slugOrder[currentIdx - 1] : null
    const nextSlug = currentIdx < slugOrder.length - 1 ? slugOrder[currentIdx + 1] : null

    const highlights: string[] = []
    for (let i = 1; i <= 6; i++) {
        const val = t(`${k}.highlights.item${i}`)
        if (val && !val.startsWith(`${k}.highlights`)) highlights.push(val)
    }

    const useCases: string[] = []
    for (let i = 1; i <= 4; i++) {
        const val = t(`${k}.useCases.item${i}`)
        if (val && !val.startsWith(`${k}.useCases`)) useCases.push(val)
    }

    const galleryImages = meta.gallery[lang]

    return (
        <>
            <TopBar />

            {/* ── Hero ── */}
            <section className="feature-detail-hero">
                <Container>
                    <div className="feature-detail-hero-inner">
                        <p className="feature-detail-label">{t(`${k}.labelTag`) || t('features.subtitle')}</p>
                        <h1 className="feature-detail-title">{t(`${k}.title`)}</h1>
                        <p className="feature-detail-subtitle">{t(`${k}.subtitle`)}</p>
                    </div>

                    <div className="feature-detail-screenshot">
                        <div className="screenshot-frame">
                            <Image
                                src={meta.heroImage[lang]}
                                alt={t(`${k}.title`)}
                                className="img-fluid"
                                style={{ width: '100%', height: 'auto' }}
                                priority
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── Overview with side image ── */}
            <section className="section feature-detail-overview">
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={6}>
                            <p className="feature-detail-label mb-2">{t(`${k}.labelTag`)}</p>
                            <h3 className="mb-4">{t(`${k}.overviewTitle`)}</h3>
                            <p className="text-muted f-16 lh-lg">{t(`${k}.overviewText`)}</p>
                        </Col>
                        <Col lg={6}>
                            <div className="overview-image-stack">
                                <div className="overview-img-main">
                                    <Image src={galleryImages[0]} alt="" className="img-fluid" style={{ width: '100%', height: 'auto', borderRadius: 16 }} />
                                </div>
                                <div className="overview-img-float">
                                    <Image src={galleryImages[1]} alt="" className="img-fluid" style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ── Key highlights with gallery image ── */}
            {highlights.length > 0 && (
                <section className="section feature-detail-highlights">
                    <Container>
                        <Row className="align-items-center gy-5">
                            <Col lg={5} className="order-lg-1 order-2">
                                <div className="highlight-gallery-img">
                                    <Image src={galleryImages[2]} alt="" className="img-fluid" style={{ width: '100%', height: 'auto', borderRadius: 16 }} />
                                </div>
                            </Col>
                            <Col lg={7} className="order-lg-2 order-1">
                                <p className="feature-detail-label mb-2">{t(`${k}.labelTag`)}</p>
                                <h3 className="mb-4">{t(`${k}.highlightsTitle`)}</h3>
                                <Row>
                                    {highlights.map((item, idx) => (
                                        <Col sm={6} key={idx} className="mb-3">
                                            <div className="highlight-card">
                                                <div className="highlight-icon">
                                                    <Icon icon="mdi:check-decagram" />
                                                </div>
                                                <p className="mb-0">{item}</p>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}

            {/* ── Use cases ── */}
            {useCases.length > 0 && (
                <section className="section feature-detail-usecases bg-light">
                    <Container>
                        <div className="text-center mb-5">
                            <p className="feature-detail-label">{t(`${k}.labelTag`)}</p>
                            <h3>{t(`${k}.useCasesTitle`)}</h3>
                        </div>
                        <Row className="gy-4">
                            {useCases.map((uc, idx) => (
                                <Col md={6} key={idx}>
                                    <div className="usecase-item">
                                        <span className="usecase-number">{String(idx + 1).padStart(2, '0')}</span>
                                        <p className="mb-0">{uc}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="section feature-detail-cta bg-primary text-white text-center">
                <Container>
                    <h3 className="text-white mb-3">{t(`${k}.ctaTitle`)}</h3>
                    <p className="text-white-50 mb-4">{t(`${k}.ctaText`)}</p>
                    <Link href="/#contact" className="btn btn-light btn-lg px-4">
                        {t(`${k}.ctaButton`)}
                    </Link>
                </Container>
            </section>

            {/* ── Navigation ── */}
            <section className="feature-detail-nav-section">
                <Container>
                    <div className="feature-nav-bar">
                        <div>
                            {prevSlug && (
                                <Link href={`/features/${prevSlug}`} className="feature-nav-link">
                                    <Icon icon="mdi:arrow-left" className="me-2" />
                                    {t(`featureDetail.${prevSlug === 'merchant-portal' ? 'merchantPortal' : prevSlug === 'dispatch-command-center' ? 'dispatchCenter' : 'routeOptimization'}.title`)}
                                </Link>
                            )}
                        </div>
                        <Link href="/#features" className="feature-nav-link feature-nav-back">
                            <Icon icon="mdi:view-grid-outline" className="me-2" />
                            {t('featureDetail.backToFeatures')}
                        </Link>
                        <div className="text-end">
                            {nextSlug && (
                                <Link href={`/features/${nextSlug}`} className="feature-nav-link">
                                    {t(`featureDetail.${nextSlug === 'merchant-portal' ? 'merchantPortal' : nextSlug === 'dispatch-command-center' ? 'dispatchCenter' : 'routeOptimization'}.title`)}
                                    <Icon icon="mdi:arrow-right" className="ms-2" />
                                </Link>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default FeatureDetailPage
