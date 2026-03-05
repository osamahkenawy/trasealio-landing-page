'use client'
import React, { useState, useEffect, useRef, memo } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from '@/i18n'
import 'glightbox/dist/css/glightbox.min.css'

// English feature images
import en1 from '@/assets/images/features/english/1.png'
import en2 from '@/assets/images/features/english/2.png'
import en3 from '@/assets/images/features/english/3.png'
import en4 from '@/assets/images/features/english/4.png'
import en5 from '@/assets/images/features/english/5.png'
import en7 from '@/assets/images/features/english/7.png'

// Arabic feature images
import ar1 from '@/assets/images/features/arabic/1.png'
import ar2 from '@/assets/images/features/arabic/2.png'
import ar3 from '@/assets/images/features/arabic/3.png'
import ar4 from '@/assets/images/features/arabic/4.png'
import ar5 from '@/assets/images/features/arabic/5.png'
import ar7 from '@/assets/images/features/arabic/7.png'

type PortfolioType = {
    id: number
    category: string[]
    imgEn: StaticImageData
    imgAr: StaticImageData
    titleKey: string
    descKey: string
    iconName: string
}

const PortfolioData: PortfolioType[] = [
    { id: 1, category: ["Brand"],   imgEn: en1, imgAr: ar1, titleKey: "portfolio.item1", descKey: "portfolio.item1Desc", iconName: "mdi:view-dashboard-outline" },
    { id: 2, category: ["Brand"],   imgEn: en2, imgAr: ar2, titleKey: "portfolio.item2", descKey: "portfolio.item2Desc", iconName: "mdi:clipboard-text-outline" },
    { id: 3, category: ["Design"],  imgEn: en3, imgAr: ar3, titleKey: "portfolio.item3", descKey: "portfolio.item3Desc", iconName: "mdi:map-marker-radius" },
    { id: 4, category: ["Design"],  imgEn: en7, imgAr: ar7, titleKey: "portfolio.item4", descKey: "portfolio.item4Desc", iconName: "mdi:routes" },
    { id: 5, category: ["Brand"],   imgEn: en5, imgAr: ar5, titleKey: "portfolio.item5", descKey: "portfolio.item5Desc", iconName: "mdi:cellphone" },
    { id: 6, category: ["Graphic"], imgEn: en4, imgAr: ar4, titleKey: "portfolio.item6", descKey: "portfolio.item6Desc", iconName: "mdi:cash-multiple" },
]

/* ── Memoized card — avoids re-render when sibling cards change ────── */
const PortfolioCard = memo(({ item, img, title, desc }: {
    item: PortfolioType
    img: StaticImageData
    title: string
    desc: string
}) => (
    <div className="portfolio-card">
        <div className="portfolio-card-img">
            <a
                className="portfolio-gallery-item"
                href={img.src}
                data-gallery="portfolio"
                data-glightbox={`title: ${title}`}
            >
                <Image
                    className="img-fluid"
                    src={img}
                    alt={title}
                    placeholder="blur"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </a>
            <div className="portfolio-card-overlay">
                <span className="portfolio-card-zoom">
                    <Icon icon="mdi:magnify-plus-outline" width={24} />
                </span>
            </div>
        </div>
        <div className="portfolio-card-body">
            <div className="portfolio-card-icon">
                <Icon icon={item.iconName} width={22} />
            </div>
            <div className="portfolio-card-text">
                <h5>{title}</h5>
                <p>{desc}</p>
            </div>
        </div>
    </div>
))
PortfolioCard.displayName = 'PortfolioCard'

/* ── Main component ─────────────────────────────────────────────── */
const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const { t, locale } = useTranslation()
    const lbRef = useRef<{ destroy?: () => void } | null>(null)

    const categoryKeys = ["all", "brand", "design", "graphic"]
    const categoryMap: Record<string, string> = { all: "All", brand: "Brand", design: "Design", graphic: "Graphic" }

    const filteredData = selectedCategory === "All"
        ? PortfolioData
        : PortfolioData.filter(item => item.category.includes(selectedCategory))

    const getImg = (item: PortfolioType) => locale === 'ar' ? item.imgAr : item.imgEn

    // GLightbox: destroy previous → create new on filter / locale change
    useEffect(() => {
        let cancelled = false

        const timer = setTimeout(() => {
            if (typeof window === 'undefined' || cancelled) return
            // Destroy previous instance
            lbRef.current?.destroy?.()
            lbRef.current = null

            import('glightbox').then(({ default: GLightbox }) => {
                if (cancelled) return
                lbRef.current = GLightbox({
                    selector: '.portfolio-gallery-item',
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    loop: true,
                })
            })
        }, 50)

        return () => {
            cancelled = true
            clearTimeout(timer)
            lbRef.current?.destroy?.()
            lbRef.current = null
        }
    }, [selectedCategory, locale])

    return (
        <section className="section portfolio-section" id="portfolio">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <span className="portfolio-badge">{t('portfolio.subtitle')}</span>
                            <h2 className="title-heading mt-3">{t('portfolio.title')}</h2>
                            <p className="title-desc text-muted mt-2 mx-auto" style={{ maxWidth: 640 }}>
                                {t('portfolio.description')}
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4 pt-2">
                    <Col lg={12}>
                        <div className="text-center">
                            <ul className="portfolio-filter list-unstyled mb-0">
                                {categoryKeys.map(key => (
                                    <li key={key}>
                                        <button
                                            className={`portfolio-filter-btn ${selectedCategory === categoryMap[key] ? "active" : ""}`}
                                            onClick={() => setSelectedCategory(categoryMap[key])}
                                        >
                                            {t(`portfolio.${key}`)}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>

                <div className="portfolio-grid mt-5">
                    <Row className="g-4">
                        {filteredData.map(item => {
                            const img = getImg(item)
                            return (
                                <Col lg={4} md={6} key={item.id}>
                                    <PortfolioCard
                                        item={item}
                                        img={img}
                                        title={t(item.titleKey)}
                                        desc={t(item.descKey)}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default Portfolio
