'use client'
import GlightBox from '@/components/GlightBox'
import { Icon } from '@iconify/react/dist/iconify.js'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const Hero = () => {
    const [init, setInit] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        initParticlesEngine(async engine => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <section
            className="bg-home-7 align-items-center position-relative"
            id="home"
            style={{ minHeight: '100vh', overflow: 'hidden' }}
        >
            <div className="bg-overlay" />
            {init && (
                <Particles
                    id="tsparticles"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                    }}
                    options={{
                        fpsLimit: 60,
                        interactivity: {
                            events: {
                                onClick: { enable: true, mode: 'push' },
                                onHover: { enable: true, mode: 'repulse' },
                            },
                            modes: {
                                push: { quantity: 4 },
                                repulse: { distance: 200, duration: 0.4 },
                            },
                        },
                        particles: {
                            color: { value: '#ffffff' },
                            links: {
                                color: '#ffffff',
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            move: {
                                enable: true,
                                speed: 2,
                                outModes: { default: 'bounce' },
                            },
                            number: {
                                density: { enable: true },
                                value: 80,
                            },
                            opacity: { value: 0.5 },
                            shape: { type: 'circle' },
                            size: { value: { min: 1, max: 5 } },
                        },
                        detectRetina: true,
                    }}
                />
            )}
            <Container className="container particels-slidero position-relative" style={{ zIndex: 2 }}>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="home-contact text-white mt-4">
                            <p className="text-primary fw-bold">{t('hero.subtitle')}</p>
                            <h1 className="home-title mt-3">{t('hero.title')}</h1>
                            <p className="text-white-50 mt-4">
                                {t('hero.description')}
                            </p>
                            <div className="mt-4 pt-3">
                                <Link href='' className="btn btn-primary me-3">{t('hero.estimateProject')}</Link>
                                <Link href='' className="btn btn-outline-primary">{t('hero.ourPortfolio')}</Link>
                            </div>
                            <div className="watch-video pt-5">
                                <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                    <div className='play-icon-circle play play-iconbar'>
                                        <Icon icon='mdi:play' />
                                    </div>
                                    <span className="text-white">{t('hero.watchVideo')}</span>
                                </GlightBox>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}></Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero
