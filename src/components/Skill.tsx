'use client'
import React from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import { useTranslation } from '@/i18n'

const Skill = () => {
    const { t } = useTranslation()
    return (
        <section className="section bg-light">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="title-sub-heading text-primary f-18">{t('skill.subtitle')}</p>
                            <h2 className="title-heading">{t('skill.title')}</h2>
                            <p className="title-desc text-muted mt-2">{t('skill.description')}</p>
                        </div>
                    </Col>
                </Row>
                <Row className=" align-items-center mt-4 pt-3" id="counter">
                    <Col lg={4}>
                        <div className="counter-box mt-4 p-4">
                            <h2 className="counter-count text-primary"><CountUp className="counter-value" delay={0} end={49} /> <span className="count-plus">{t('skill.unitM')}</span></h2>
                            <h5 className="mt-2 f-18">{t('skill.creativeUser')}</h5>
                            <p className="text-muted mt-3 mb-0">{t('skill.creativeUserDesc')}</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="counter-box mt-4 p-4">
                            <h2 className="counter-count text-primary">
                                <CountUp className="counter-value" delay={0} end={97} />
                            <span className="count-plus">{t('skill.unitPercent')}</span></h2>
                            <h5 className="mt-2 f-18">{t('skill.successfulRate')}</h5>
                            <p className="text-muted mt-3 mb-0">{t('skill.successfulRateDesc')}</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="p-4">
                            <div className="mt-4">
                                <p className="font-weight-500 mb-2">{t('skill.html')}</p>
                                <ProgressBar variant='primary' style={{ height: 9 }} now={70} label={'70%'} />
                            </div>
                            <div className="mt-4">
                                <p className="font-weight-500 mb-2">{t('skill.css')}</p>
                                <ProgressBar variant='primary' style={{ height: 9 }} now={87} label={'87%'} />
                            </div>
                            <div className="mt-4">
                                <p className="font-weight-500 mb-2">{t('skill.bootstrap')}</p>
                                <ProgressBar variant='primary' style={{ height: 9 }} now={60} label={'60%'} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Skill