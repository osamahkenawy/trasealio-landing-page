'use client'
import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/logo-dark.png'
import Link from 'next/link'
import appleStore from '@/assets/images/apple-store.png'
import googlePlay from '@/assets/images/google-play.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Footer = () => {
    const { t } = useTranslation()
    return (
        <section className="section bg-light pb-5">
            <Container>
                <Row>
                    <Col lg={4} >
                        <div className="footer-info mt-4">
                            <Image src={logo} alt='logo' height={22} />
                            <h5 className="f-18 mt-4 pt-1 line-height_1_6">
                                {t('footer.tagline')}
                            </h5>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <Row>
                            <Col lg={4} >
                                <div className="mt-4">
                                    <h5 className="f-18">{t('footer.features')}</h5>
                                    <ul className="list-unstyled footer-link mt-3">
                                        <li><Link href=''>{t('footer.sixHome')}</Link></li>
                                        <li><Link href=''>{t('footer.technology')}</Link></li>
                                        <li><Link href=''>{t('footer.newsEvents')}</Link></li>
                                        <li><Link href=''>{t('footer.company')}</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={4} >
                                <div className="mt-4">
                                    <h5 className="f-18">{t('footer.policies')}</h5>
                                    <ul className="list-unstyled footer-link mt-3">
                                        <li><Link href=''>{t('footer.security')}</Link></li>
                                        <li><Link href=''>{t('footer.jobs')}</Link></li>
                                        <li><Link href=''>{t('footer.policy')}</Link></li>
                                        <li><Link href=''>{t('footer.condition')}</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={4} >
                                <div className="mt-4">
                                    <h5 className="f-18">{t('footer.company')}</h5>
                                    <ul className="list-unstyled footer-link mt-3">
                                        <li><Link href=''>{t('footer.leadership')}</Link></li>
                                        <li><Link href=''>{t('footer.careers')}</Link></li>
                                        <li><Link href=''>{t('footer.contactUs')}</Link></li>
                                        <li><Link href=''>{t('footer.maps')}</Link></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <div className="mt-4 pl-0 pl-lg-4">
                            <h5 className="f-18">{t('footer.followUs')}</h5>
                            <ul className="list-inline social-icons-list pt-3">
                                <li className="list-inline-item">
                                    <Link href=""><Icon icon='mdi:facebook' /></Link>
                                </li>&nbsp;
                                <li className="list-inline-item">
                                    <Link href=""><Icon icon='mdi:twitter' /></Link>
                                </li>&nbsp;
                                <li className="list-inline-item">
                                    <Link href=""><Icon icon='mdi:linkedin' /></Link>
                                </li>&nbsp;
                                <li className="list-inline-item">
                                    <Link href=""><Icon icon='mdi:google-plus' /></Link>
                                </li>
                            </ul>
                            <h5 className="f-18">{t('footer.downloadApp')}</h5>
                            <div className="mt-4">
                                <Link href='' className="pr-3">
                                    <Image src={appleStore} height={30} alt='appleStore' />
                                </Link>&nbsp;
                                <Link href=''>
                                    <Image src={googlePlay} height={30} alt='googlePlay' />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr className="my-5" />
                <Row>
                    <Col xs={12}>
                        <div className="text-center">
                            <p className="text-muted mb-0">{new Date().getFullYear()} {t('footer.copyright')}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default Footer