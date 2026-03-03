'use client'
import Image from 'next/image'
import React from 'react'
import img2 from '@/assets/images/img-2.png'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className="bg-light" id="home">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="home-contact mt-5 pt-5 text-center">
                            <h1 className="home-title mt-5">{t('hero2.title')}</h1>
                            <p className="text-muted mt-4">
                                {t('hero2.description')}
                            </p>
                            <div className="mt-5">
                                <div className="search-form">
                                    <form action="#">
                                        <input type="text" placeholder={t('hero2.emailPlaceholder')} />
                                        <button type="submit" className="btn btn-primary">{t('hero2.subscribe')}</button>
                                    </form>
                                </div>
                            </div>
                            <div className="home-img-2">
                                <Image src={img2} className="img-fluid" alt='img2' />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero