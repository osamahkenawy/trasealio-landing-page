'use client'
import GlightBox from '@/components/GlightBox'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className="bg-home align-items-center" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="home-contact mt-4">
                            <p className="text-primary fw-bold">{t('hero9.subtitle')}</p>
                            <h1 className="home-title mt-3">{t('hero9.title')}</h1>
                            <p className="text-muted mt-4">
                                {t('hero9.description')}
                            </p>
                            <div className="mt-4 pt-3">
                                <Link href='' className="btn btn-primary me-3">{t('hero9.estimateProject')}</Link>&nbsp;
                                <Link href='' className="btn btn-outline-primary">{t('hero9.ourPortfolio')}</Link>
                            </div>
                            <div className="watch-video pt-5">
                                <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                    <div className='play-icon-circle play play-iconbar'>
                                        <Icon icon='mdi:play' />
                                    </div>&nbsp;
                                    <span className="text-dark">{t('hero9.watchVideo')}</span></GlightBox>
                            </div>
                        </div>
                    </Col>
                    <Col lg={5} className="offset-lg-1">
                        <div className="home-registration-form bg-white p-5 mt-4">
                            <h5 className="form-title mb-4 text-center fw-bold">{t('hero9.freeTrialTitle')}</h5>
                            <form className="registration-form">
                                <label className="text-muted">{t('hero9.firstName')}</label>
                                <input type="text" id="exampleInputName1" className="form-control mb-4 registration-input-box" />
                                <label className="text-muted">{t('hero9.lastName')}</label>
                                <input type="text" id="exampleInputName2" className="form-control mb-4 registration-input-box" />
                                <label className="text-muted">{t('hero9.email')}</label>
                                <input type="email" id="exampleInputEmail1" className="form-control mb-4 registration-input-box" />
                                <button className="btn btn-primary w-100 mt-3">{t('hero9.freeTrial')}</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Hero