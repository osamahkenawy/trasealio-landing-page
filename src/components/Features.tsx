'use client'
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

type FeaturesType = {
    id: string
    iconName: string
    titleKey: string
    descKey: string
    slug: string
}

const FeaturesData: FeaturesType[] = [
    {
        id: "01",
        iconName: "mdi:store-outline",
        titleKey: "features.item1Title",
        descKey: "features.item1Desc",
        slug: "merchant-portal",
    },
    {
        id: "02",
        iconName: "mdi:monitor-dashboard",
        titleKey: "features.item2Title",
        descKey: "features.item2Desc",
        slug: "dispatch-command-center",
    },
    {
        id: "03",
        iconName: "mdi:map-marker-path",
        titleKey: "features.item3Title",
        descKey: "features.item3Desc",
        slug: "route-optimization",
    }
]


const Features = () => {
    const { t } = useTranslation()
    return (
        <section className="section pb-5" id="features">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="title-sub-heading text-primary f-18">{t('features.subtitle')}</p>
                            <h2 className="title-heading">{t('features.title')}</h2>
                            <p className="title-desc text-muted mt-2">{t('features.description')}</p>
                        </div>
                    </Col>
                </Row>
                <Row className=" mt-5 pt-4">
                    {
                        FeaturesData.map((item, idx) => (
                            <Col lg={4} key={idx} className="d-flex">
                                <div className="features-box mt-4">
                                    <h1 className="features-title">{item.id}</h1>
                                    <div className="features-icon-box">
                                        <Icon icon={item.iconName} width={32} />
                                    </div>
                                    <h5 className="f-18 mt-4">{t(item.titleKey)}</h5>
                                    <p className="text-muted mt-3 flex-grow-1">{t(item.descKey)}</p>
                                    <div className="mt-3">
                                        <Link href={`/features/${item.slug}`} className="text-primary font-weight-600"> {t('features.learnMore')} <Icon icon='mdi:arrow-right' className="ms-2" /> </Link>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>

    )
}

export default Features