'use client'
import React from 'react'
import bg1 from '@/assets/images/bg-1.jpg'
import bg2 from '@/assets/images/bg-2.jpg'
import bg3 from '@/assets/images/bg-3.jpg'
import { Carousel, CarouselItem, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className="home-slider" id="home">
            <Container fluid>
                <Row>
                    <Carousel indicators={false} controls={true} id="carouselExample" className="slide px-0" data-bs-ride="carousel">
                        <CarouselItem className=" active" style={{ backgroundImage: `url(${bg1.src})` }}>
                            <div className="bg-overlay" />
                            <div className="home-center">
                                <div className="home-desc-center">
                                    <Container>
                                        <Row className=" align-items-center justify-content-center">
                                            <Col lg={10}>
                                                <div className="home-content text-center text-white">
                                                    <h1 className="home-title">{t('hero4.slide1Title')}</h1>
                                                    <p className="text-white-50 mt-4 f-16">{t('hero4.slide1Desc')}</p>
                                                    <div className="mt-5">
                                                        <div className="mt-4 pt-2">
                                                            <Link href='' className="btn btn-primary btn-rounded me-3">{t('hero4.contactUs')} <Icon icon='mdi:arrow-right' className="ms-1" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem style={{ backgroundImage: `url(${bg2.src})` }}>
                            <div className="bg-overlay" />
                            <div className="home-center">
                                <div className="home-desc-center">
                                    <Container>
                                        <Row className=" align-items-center justify-content-center">
                                            <Col lg={10}>
                                                <div className="home-content text-center text-white">
                                                    <h1 className="home-title">{t('hero4.slide2Title')}</h1>
                                                    <p className="text-white-50 mt-4 f-16">{t('hero4.slide2Desc')}</p>
                                                    <div className="mt-5">
                                                        <div className="mt-4 pt-2">
                                                            <Link href='' className="btn btn-primary btn-rounded me-3">{t('hero4.contactUs')} <Icon icon='mdi:arrow-right' className="ms-1" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem style={{ backgroundImage: `url(${bg3.src})` }}>
                            <div className="bg-overlay" />
                            <div className="home-center">
                                <div className="home-desc-center">
                                    <Container>
                                        <Row className=" align-items-center justify-content-center">
                                            <Col lg={10}>
                                                <div className="home-content text-center text-white">
                                                    <h1 className="home-title">{t('hero4.slide3Title')}</h1>
                                                    <p className="text-white-50 mt-4 f-16">{t('hero4.slide3Desc')}</p>
                                                    <div className="mt-5">
                                                        <div className="mt-4 pt-2">
                                                            <Link href='' className="btn btn-primary btn-rounded me-3">{t('hero4.contactUs')} <Icon icon='mdi:arrow-right' className="ms-1" /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </CarouselItem>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">{t('hero4.previous')}</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">{t('hero4.next')}</span>
                        </button>
                    </Carousel>
                </Row>
            </Container>
        </section>

    )
}

export default Hero