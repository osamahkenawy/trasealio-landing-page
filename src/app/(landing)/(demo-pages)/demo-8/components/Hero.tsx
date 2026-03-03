'use client'
import GlightBox from '@/components/GlightBox'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className="bg-home-3 bg-primary align-items-center" id="home">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={9}>
                        <div className="main-slider home-content text-center">
                            <Swiper
                                pagination={false} loop={true} className="slides text-white">
                                <SwiperSlide>
                                    <h3 className="home-title">{t('hero8.slide1Title')}
                                    </h3>
                                    <p className="text-white-50 mt-3">{t('hero8.slideDesc')}</p>
                                    <div className="mt-4 pt-3">
                                        <Link href='' className="btn btn-success me-3">{t('hero8.contactUs')} <i className="mdi mdi-arrow-right ms-2" /></Link>
                                        <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                            <Icon icon='mdi:play-circle-outline' className="text-white me-2" />{t('hero8.watchIntro')}
                                        </GlightBox>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <h3 className="home-title">{t('hero8.slide2Title')}
                                    </h3>
                                    <p className="text-white-50 mt-3">{t('hero8.slideDesc')}</p>
                                    <div className="mt-4 pt-3">
                                        <Link href='' className="btn btn-success me-3">{t('hero8.contactUs')} <i className="mdi mdi-arrow-right ms-2" /></Link>
                                        <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                            <Icon icon='mdi:play-circle-outline' className="text-white me-2" />{t('hero8.watchIntro')}
                                        </GlightBox>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <h3 className="home-title">{t('hero8.slide3Title')}
                                    </h3>
                                    <p className="text-white-50 mt-3">{t('hero8.slideDesc')}</p>
                                    <div className="mt-4 pt-3">
                                        <Link href='' className="btn btn-success me-3">{t('hero8.contactUs')} <i className="mdi mdi-arrow-right ms-2" /></Link>
                                        <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                            <Icon icon='mdi:play-circle-outline' className="text-white me-2" />{t('hero8.watchIntro')}
                                        </GlightBox>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Hero