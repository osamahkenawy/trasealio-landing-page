'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img3 from '@/assets/images/img-3.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Typewriter } from 'react-simple-typewriter'
import GlightBox from '@/components/GlightBox'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className="bg-home-6 align-items-center" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="home-contact mt-4">
                            <p className="text-primary font-weight-bold">{t('hero6.lookingFor')}</p>
                            <h1 className="home-title mt-3">{t('hero6.iAm')}<span className="element text-primary">
                                <Typewriter
                                    words={t('hero6.typewords').split(',')}
                                    loop={5}
                                    cursor />
                            </span>
                            </h1>
                            <p className="text-muted mt-4">
                                {t('hero6.description')}
                            </p>
                            <div className="mt-4 pt-3">
                                <Link href='' className="btn btn-primary me-3">{t('hero6.hireMe')}</Link>&nbsp;
                                <Link href='' className="btn btn-outline-primary mt-lg-0 mt-3">{t('hero6.downloadCV')}</Link>
                            </div>
                            <div className="watch-video pt-5">
                                <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                    <div className='play-icon-circle play play-iconbar'>
                                        <Icon icon='mdi:play' />
                                    </div>&nbsp;
                                    <span className="text-dark">{t('hero6.watchVideo')}</span></GlightBox>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Image src={img3} className="img-fluid" alt='img3' />
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Hero