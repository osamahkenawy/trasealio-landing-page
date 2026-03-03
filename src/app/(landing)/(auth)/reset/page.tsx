'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoDark from '@/assets/images/logo-dark.png'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Page = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className="account-home-btn d-none d-sm-block">
                <Link href="/" className="text-primary"><Icon icon='mdi:home' className="h1" /></Link>
            </div>
            <section className="bg-account-pages align-items-center">
                <Container>
                    <Row className="align-items-center justify-content-center">
                        <Col lg={5}>
                            <div className="form-box bg-white">
                                <div className="p-4">
                                    <div className="text-center mt-3">
                                        <Link href="/"><Image src={logoDark} alt='logoDark' height={24} /></Link>
                                        <p className="text-muted mt-3">{t('auth.resetPassword')}</p>
                                    </div>
                                    <div className="p-2 custom-form">
                                        <div className="alert alert-success bg-soft-success text-success border-0  text-center" role="alert">
                                            {t('auth.resetPasswordDesc')}
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="email">{t('auth.email')}</label>
                                                <input type="email" className="form-control" id="email" placeholder={t('auth.enterEmail')} />
                                            </div>
                                            <div className="mt-3">
                                                <button type="submit" className="btn btn-primary btn-block w-100">{t('auth.resetYourPassword')}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}

export default Page