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
                                        <Link href="/"><Image src={logoDark} alt='img' height={24} /></Link>
                                        <p className="text-muted mt-3">{t('auth.signUpNewAccount')}</p>
                                    </div>
                                    <div className="p-2 custom-form">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="firstname">{t('auth.firstName')}</label>
                                                <input type="text" className="form-control" id="firstname" placeholder={t('auth.firstName')} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">{t('auth.email')}</label>
                                                <input type="email" className="form-control" id="email" placeholder={t('auth.enterEmail')} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="userpassword">{t('auth.password')}</label>
                                                <input type="password" className="form-control" id="userpassword" placeholder={t('auth.enterPassword')} />
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customControlInline" />&nbsp;
                                                <label className="custom-control-label" htmlFor="customControlInline">{t('auth.rememberMe')}</label>
                                            </div>
                                            <div className="mt-3">
                                                <button type="submit" className="btn btn-primary btn-block w-100">{t('auth.signUp')}</button>
                                            </div>
                                            <div className="mt-4 mb-0 text-center">
                                                <p className="mb-0">{t('auth.alreadyHaveAccount')} <Link href="/login" className="text-success">{t('auth.signIn')}</Link></p>
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