'use client'
import React, { useState } from 'react'
import img1 from '@/assets/images/portfolio/img-1.png'
import img2 from '@/assets/images/portfolio/img-2.png'
import img3 from '@/assets/images/portfolio/img-3.png'
import img4 from '@/assets/images/portfolio/img-4.png'
import img5 from '@/assets/images/portfolio/img-5.png'
import img6 from '@/assets/images/portfolio/img-6.png'
import Image, { StaticImageData } from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import GlightBox from './GlightBox'
import { useTranslation } from '@/i18n'

type PortfolioType = {
    id: number
    category: string[]
    img: StaticImageData
    titleKey: string
}

const PortfolioData: PortfolioType[] = [
    { id: 1, category: ["Brand"], img: img1, titleKey: "portfolio.item1" },
    { id: 2, category: ["Design"], img: img2, titleKey: "portfolio.item2" },
    { id: 3, category: ["Design"], img: img3, titleKey: "portfolio.item3" },
    { id: 4, category: ["Graphic"], img: img4, titleKey: "portfolio.item4" },
    { id: 5, category: ["Brand"], img: img5, titleKey: "portfolio.item5" },
    { id: 6, category: ["Design", "Brand"], img: img6, titleKey: "portfolio.item6" }
]

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const { t } = useTranslation()

    const categoryKeys = ["all", "brand", "design", "graphic"]
    const categoryMap: Record<string, string> = { all: "All", brand: "Brand", design: "Design", graphic: "Graphic" }

    // Filter items based on category
    const filteredData = selectedCategory === "All"
        ? PortfolioData
        : PortfolioData.filter(item => item.category.includes(selectedCategory))

    return (
        <section className="section" id="portfolio">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="title-sub-heading text-primary f-18">{t('portfolio.subtitle')}</p>
                            <h2 className="title-heading">{t('portfolio.title')}</h2>
                            <p className="title-desc text-muted mt-2">
                                {t('portfolio.description')}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5 pt-2">
                    <Col lg={12}>
                        <div className="text-center">
                            <ul className="col container-filter portfolioFilte list-unstyled mb-0">
                                {categoryKeys.map(key => (
                                    <li key={key}>
                                        <a
                                            className={`categories ${selectedCategory === categoryMap[key] ? "active" : ""}`}
                                            onClick={() => setSelectedCategory(categoryMap[key])}
                                        >
                                            {t(`portfolio.${key}`)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
                <div className="port portfolio-masonry mt-5">
                    <Row className="portfolioContainer ">
                        {filteredData.map(item => (
                            <Col lg={4} md={4} className={`p-3`} key={item.id}>
                                <div className="item-box p-2 rounded">
                                    <GlightBox className="cbox-gallary1 mfp-image" href={item.img.src} title={t(item.titleKey)}>
                                        <Image
                                            className="item-container rounded img-fluid"
                                            src={item.img}
                                            alt={t(item.titleKey)}
                                        />
                                    </GlightBox>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default Portfolio
