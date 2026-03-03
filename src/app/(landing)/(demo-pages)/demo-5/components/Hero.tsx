'use client'
import GlightBox from '@/components/GlightBox';
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useTranslation } from '@/i18n'

const Hero = () => {
    const { t } = useTranslation()
    const containerRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({
        width: 0,
        height: 0,
        marginTop: 0,
        marginLeft: 0,
    });

    const calculateVideoSize = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const winWidth = container.clientWidth;
        const winHeight = container.clientHeight;

        const margin = 24;
        const overprint = 100;

        let vidWidth = winWidth + (winWidth * margin) / 100;
        let vidHeight = Math.ceil((9 * winWidth) / 16);
        let marginTop = -((vidHeight - winHeight) / 2);
        let marginLeft = -((winWidth * margin) / 200);

        if (vidHeight < winHeight) {
            vidHeight = winHeight + (winHeight * margin) / 100;
            vidWidth = Math.floor((16 * winHeight) / 9);
            marginTop = -((winHeight * margin) / 200);
            marginLeft = -((vidWidth - winWidth) / 2);
        }

        vidWidth += overprint;
        vidHeight += overprint;
        marginTop -= overprint / 2;
        marginLeft -= overprint / 2;

        setStyle({
            width: vidWidth,
            height: vidHeight,
            marginTop,
            marginLeft,
        });
    };

    useEffect(() => {
        calculateVideoSize();
        window.addEventListener('resize', calculateVideoSize);
        return () => window.removeEventListener('resize', calculateVideoSize);
    }, []);

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            start: 0,
            enablejsapi: 1,
            playlist: 'dwfjayxRvqw',
        },
    };

    return (
        <section
            className="bg-home align-items-center"
            style={{ overflow: 'hidden' }}
            id="home"
            ref={containerRef}
        >
            <div className="bg-overlay" />

            <YouTube
                videoId="dwfjayxRvqw"
                opts={opts}
                className="home-10-vid"
                onReady={(event) => {
                    event.target.mute();
                    event.target.playVideo();
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: style.width,
                    height: style.height,
                    marginLeft: style.marginLeft,
                    marginTop: style.marginTop,
                    opacity: 1,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <Container className="position-relative" style={{ zIndex: 1 }}>
                <Row className="justify-content-center align-items-center">
                    <Col lg={9}>
                        <div className="home-contact text-white text-center mt-4">
                            <h1 className="home-title mt-3">
                                {t('hero5.title')}
                            </h1>
                            <p className="text-white-50 mt-4">
                                {t('hero5.description')}
                            </p>
                            <div className="mt-4 pt-3">
                                <Link href='' className="btn btn-primary me-3">{t('hero5.estimateProject')}</Link>
                                <Link href='' className="btn btn-outline-primary mt-lg-0 mt-3">{t('hero5.ourPortfolio')}</Link>
                            </div>
                            <div className="watch-video pt-5">
                                <GlightBox href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                    <div className='play-icon-circle play play-iconbar'>
                                        <Icon icon='mdi:play' />
                                    </div>
                                    <span className="text-white">{t('hero5.watchVideo')}</span>
                                </GlightBox>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero;
