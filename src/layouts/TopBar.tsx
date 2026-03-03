'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import { Collapse, Container, Dropdown } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import useScrollEvent from '@/hooks/useScrollEvent'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import { locales, localeNames, type Locale } from '@/i18n/types'

type TopBarType = {
    isLight?: boolean
    buttonVariant?: string
}

const sections = ['home', 'portfolio', 'pricing', 'team', 'testimonial', 'contact']

const TopBar = ({ buttonVariant, isLight }: TopBarType) => {
    const [open, setOpen] = useState(false)
    const { scrollY } = useScrollEvent();
    const [activeSection, setActiveSection] = useState('home')
    const { t, locale, setLocale } = useTranslation()

    const toggleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.6 
            }
        )

        sections.forEach(id => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <nav className={`navbar navbar-expand-lg fixed-top navbar-custom sticky ${isLight && 'navbar-light'} ${scrollY > 100 ? 'nav-sticky' : ''}`}>
            <Container>
                <Link className="navbar-brand logo text-uppercase" href="#home">
                    {
                        isLight ?
                            <>
                                {scrollY > 100
                                    ? <Image src={logoDark} alt='logoDark' height={40} />
                                    : <Image src={logoLight} alt='logoLight' height={40} />}
                            </>
                            :
                            <Image src={logoDark} alt='logoDark' height={40} />
                    }
                </Link>
                <button onClick={toggleOpen} className="navbar-toggler" type="button">
                    <Icon icon='mdi:menu' />
                </button>
                <Collapse in={open} className="navbar-collapse">
                    <div>
                        <ul className="navbar-nav ms-auto navbar-center" id="mySidenav">
                            {sections.map(section => (
                                <li key={section} className={`nav-item ${activeSection === section ? 'active' : ''}`}>
                                    <a href={`#${section}`} className="nav-link">
                                        {t(`nav.${section}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="navbar-button d-inline-flex align-items-center gap-2">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="link"
                                    className="nav-link lang-dropdown p-1 d-flex align-items-center"
                                    id="lang-dropdown"
                                    style={{ textDecoration: 'none', boxShadow: 'none' }}
                                >
                                    <Icon icon='mdi:web' className="me-1" style={{ fontSize: '18px' }} />
                                    <span className="f-14">{localeNames[locale]}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="lang-dropdown-menu">
                                    {locales.map((loc) => (
                                        <Dropdown.Item
                                            key={loc}
                                            active={locale === loc}
                                            onClick={() => setLocale(loc as Locale)}
                                            className={loc === 'ar' ? 'text-end' : ''}
                                        >
                                            {localeNames[loc]}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="d-none d-lg-inline-block">
                                <Link href='/signup' className={`btn btn-sm btn-round btn-${buttonVariant ? buttonVariant : 'primary'}`}>{t('nav.signUp')}</Link>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </Container>
        </nav>
    )
}

export default TopBar
