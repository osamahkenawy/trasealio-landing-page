'use client'
import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import Image, { StaticImageData } from "next/image"
import img1 from "@/assets/images/user/img-1.jpg"
import img2 from "@/assets/images/user/img-2.jpg"
import img3 from "@/assets/images/user/img-3.jpg"
import img4 from "@/assets/images/user/img-4.jpg"
import testimonial from "@/assets/images/testimonial.png"
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from '@/i18n'

export type Testimonial = {
    id: number
    nameKey: string
    roleKey: string
    img: StaticImageData
    quoteKey: string
}

const testimonialData: Testimonial[] = [
    { id: 1, nameKey: "feedback.member1Name", roleKey: "feedback.member1Role", img: img1, quoteKey: "feedback.member1Quote" },
    { id: 2, nameKey: "feedback.member2Name", roleKey: "feedback.member2Role", img: img2, quoteKey: "feedback.member2Quote" },
    { id: 3, nameKey: "feedback.member3Name", roleKey: "feedback.member3Role", img: img3, quoteKey: "feedback.member3Quote" },
    { id: 4, nameKey: "feedback.member4Name", roleKey: "feedback.member4Role", img: img4, quoteKey: "feedback.member4Quote" },
]

const Feedback = () => {
    const { t } = useTranslation()
    return (
        <section className="section bg-testimonial" id="testimonial">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="title-sub-heading text-primary mb-3">{t('feedback.subtitle')}</p>
                            <h2 className="title-heading">{t('feedback.title')}</h2>
                            <p className="title-desc text-muted mt-2">{t('feedback.description')}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5 pt-5 justify-content-center align-items-center">
                    <Col lg={8}>
                        <Carousel indicators={false} controls={false}>
                            {testimonialData.map((item) => (
                                <Carousel.Item key={item.id}>
                                    <div className="client-box bg-light mt-4">
                                        <div className="media">
                                            <div className="client-img">
                                                <Image src={item.img} className="img-fluid rounded-circle" alt={t(item.nameKey)} />
                                            </div>
                                            <div className="media-body ms-3 mt-2">
                                                <h5 className="f-18">{t(item.nameKey)}</h5>
                                                <p className="text-primary mb-0">- {t(item.roleKey)}</p>
                                            </div>
                                            <div className="client-icon">
                                                <span className="text-primary">
                                                    <Icon icon='mdi:format-quote-close' />
                                                </span>
                                            </div>
                                        </div>
                                        <p className="client-desc mt-4 mb-0 pt-1 f-18">
                                            {t(item.quoteKey)}
                                        </p>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="text-center mt-2">
                            <Image src={testimonial} className="img-fluid" alt='testimonial decoration' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Feedback
