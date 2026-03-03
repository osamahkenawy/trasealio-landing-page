'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import React from 'react'
// English feature images
import en1 from '@/assets/images/features/english/1.png'
import en2 from '@/assets/images/features/english/2.png'
import en3 from '@/assets/images/features/english/3.png'
import en4 from '@/assets/images/features/english/4.png'
import en5 from '@/assets/images/features/english/5.png'
import en6 from '@/assets/images/features/english/6.png'
import en7 from '@/assets/images/features/english/7.png'
import en8 from '@/assets/images/features/english/8.png'
// Arabic feature images
import ar1 from '@/assets/images/features/arabic/1.png'
import ar2 from '@/assets/images/features/arabic/2.png'
import ar3 from '@/assets/images/features/arabic/3.png'
import ar4 from '@/assets/images/features/arabic/4.png'
import ar5 from '@/assets/images/features/arabic/5.png'
import ar6 from '@/assets/images/features/arabic/6.png'
import ar7 from '@/assets/images/features/arabic/7.png'
import ar8 from '@/assets/images/features/arabic/8.png'
import ar9 from '@/assets/images/features/arabic/9.png'
import ar10 from '@/assets/images/features/arabic/10.png'
import ar11 from '@/assets/images/features/arabic/11.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import GlightBox from '@/components/GlightBox'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useTranslation } from '@/i18n'

const enImages = [en1, en2, en3, en4, en5, en6, en7, en8]
const arImages = [ar1, ar2, ar3, ar4, ar5, ar6, ar7, ar8, ar9, ar10, ar11]

const Hero = () => {
    const { t, locale } = useTranslation()
    const images = locale === 'ar' ? arImages : enImages

    return (
        <section className="bg-home align-items-center overflow-hidden" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="home-contact mt-4">
                            <p className="text-primary fw-bold">{t('hero.subtitle')}</p>
                            <h1 className="home-title mt-3">{t('hero.title')}</h1>
                            <p className="text-muted mt-4">
                                {t('hero.description')}
                            </p>
                            <div className="mt-4 pt-3">
                                <Link href='' className="btn btn-primary me-3">{t('hero.estimateProject')}</Link>&nbsp;
                                <Link href='' className="btn btn-outline-primary">{t('hero.ourPortfolio')}</Link>
                            </div>
                            <div className="watch-video pt-5">
                                <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                    <div className="play-icon-circle play play-iconbar">
                                        <Icon icon='mdi:play' />
                                    </div>&nbsp;
                                    <span className="text-dark">{t('hero.watchVideo')}</span>
                                </GlightBox>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="slider mt-4">
                            <Swiper
                                modules={[Autoplay]}
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                speed={800}
                                className="swiper-container">
                                {images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Image src={img} width={1745} height={1000} className="img-fluid rounded shadow" alt={`feature-${idx + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-pagination" />
                            </Swiper>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero