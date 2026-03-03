'use client'
import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className="bg-home-3 align-items-center  bg-primary" id="home">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div className="home-contact text-white text-center mt-4">
                            <h1 className="home-title mt-3">{t('hero3.title')}</h1>
                            <p className="text-white-50 mt-4">
                                {t('hero3.description')}
                            </p>
                            <div className="mt-4 pt-3">
                                <Link href='' className="btn btn-light me-3">{t('hero3.wantToHire')}</Link>&nbsp;
                                <Link href='' className="btn btn-outline-light">{t('hero3.wantToWork')}</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Hero