'use client'
import React from 'react'
import rulers from '@/assets/images/icon/rulers.png'
import compose from '@/assets/images/icon/compose.png'
import presentation from '@/assets/images/icon/presentation.png'
import Image, { StaticImageData } from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

type FeaturesType = {
    id: string
    image: StaticImageData
    titleKey: string
    descKey: string
}

const FeaturesData: FeaturesType[] = [
    {
        id: "01",
        image: rulers,
        titleKey: "features.item1Title",
        descKey: "features.item1Desc",
    },
    {
        id: "02",
        image: compose,
        titleKey: "features.item2Title",
        descKey: "features.item2Desc",
    },
    {
        id: "03",
        image: presentation,
        titleKey: "features.item3Title",
        descKey: "features.item3Desc",
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
                            <Col lg={4} key={idx}>
                                <div className="features-box mt-4">
                                    <h1 className="features-title">{item.id}</h1>
                                    <div className="features-img">
                                        <Image src={item.image} className="img-fluid" alt='img' />
                                    </div>
                                    <h5 className="f-18 mt-4">{t(item.titleKey)}</h5>
                                    <p className="text-muted mt-3">{t(item.descKey)}</p>
                                    <div className="mt-3">
                                        <Link href='' className="text-primary font-weight-600"> {t('features.learnMore')} <Icon icon='mdi:arrow-right' className="ms-2" /> </Link>
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