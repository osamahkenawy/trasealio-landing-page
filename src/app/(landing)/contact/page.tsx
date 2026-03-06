'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'
import { sendMessage } from '@/components/SendMessage'

const CONTACT_CARDS = [
  { icon: 'mdi:email-outline', key: 'email', color: '#3b82f6' },
  { icon: 'mdi:phone-outline', key: 'phone', color: '#10b981' },
  { icon: 'mdi:map-marker-outline', key: 'office', color: '#f59e0b' },
  { icon: 'mdi:clock-outline', key: 'hours', color: '#8b5cf6' },
]

const SOCIAL_LINKS = [
  { icon: 'mdi:facebook', href: 'https://www.facebook.com/profile.php?id=61582271193231', label: 'Facebook' },
  { icon: 'mdi:instagram', href: 'https://www.instagram.com/trasealla/', label: 'Instagram' },
  { icon: 'mdi:linkedin', href: 'https://www.linkedin.com/company/110608503/', label: 'LinkedIn' },
  { icon: 'mdi:whatsapp', href: 'https://wa.me/971503920037', label: 'WhatsApp' },
]

const ContactPage = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <>
      <TopBar hideNav solidBg ctaLabel="Explore Trasealio" ctaHref="/" />

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="page-hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
        </div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-hero-tag">{t('contactPage.heroTag')}</span>
              <h1 className="page-hero-title">{t('contactPage.heroTitle')}</h1>
              <p className="page-hero-subtitle">{t('contactPage.heroSubtitle')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Contact Cards ── */}
      <section className="section contact-info-section">
        <Container>
          <Row className="gy-4">
            {CONTACT_CARDS.map((card, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div className="contact-info-card">
                  <div className="contact-info-icon" style={{ background: `${card.color}12`, color: card.color }}>
                    <Icon icon={card.icon} />
                  </div>
                  <h4>{t(`contactPage.${card.key}Title`)}</h4>
                  <p>{t(`contactPage.${card.key}Line1`)}</p>
                  <p>{t(`contactPage.${card.key}Line2`)}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Form + Map Section ── */}
      <section className="section bg-light contact-form-section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={7} className="text-center">
              <span className="page-section-tag">{t('contactPage.formTag')}</span>
              <h2 className="page-section-title">{t('contactPage.formTitle')}</h2>
              <p className="page-section-subtitle mx-auto">{t('contactPage.formSubtitle')}</p>
            </Col>
          </Row>

          <Row className="gy-5">
            {/* Form */}
            <Col lg={7}>
              <div className="contact-form-card">
                {status === 'success' ? (
                  <div className="contact-success">
                    <div className="contact-success-icon">
                      <Icon icon="mdi:check-circle" />
                    </div>
                    <h3>{t('contactPage.successTitle')}</h3>
                    <p>{t('contactPage.successText')}</p>
                    <button className="btn btn-outline-primary mt-3" onClick={() => { setStatus('idle'); setStatusMsg(''); }}>
                      {t('contactPage.sendAnother')}
                    </button>
                  </div>
                ) : (
                  <form
                    action={async (formData) => {
                      const email = formData.get('email') as string
                      setEmailError('')

                      if (!email || !validateEmail(email)) {
                        setEmailError(t('contact.emailRequired'))
                        return
                      }

                      setStatus('sending')
                      setStatusMsg('')
                      try {
                        const res = await sendMessage(formData)
                        if (res.success) {
                          setStatus('success')
                          setStatusMsg(t('contact.messageSent'))
                        } else {
                          setStatus('error')
                          setStatusMsg(res.message || t('contact.messageFailed'))
                        }
                      } catch {
                        setStatus('error')
                        setStatusMsg(t('contact.messageFailed'))
                      }
                    }}
                  >
                    <div className="contact-form-grid">
                      <div className="contact-field">
                        <label>{t('contactPage.firstName')} <span className="required-star">*</span></label>
                        <div className="contact-input-wrap">
                          <Icon icon="mdi:account-outline" width={18} />
                          <input name="firstname" type="text" placeholder={t('contactPage.firstNamePH')} required />
                        </div>
                      </div>
                      <div className="contact-field">
                        <label>{t('contactPage.lastName')}</label>
                        <div className="contact-input-wrap">
                          <Icon icon="mdi:account-outline" width={18} />
                          <input name="lastname" type="text" placeholder={t('contactPage.lastNamePH')} />
                        </div>
                      </div>
                      <div className="contact-field full-width">
                        <label>{t('contactPage.email')} <span className="required-star">*</span></label>
                        <div className={`contact-input-wrap ${emailError ? 'has-error' : ''}`}>
                          <Icon icon="mdi:email-outline" width={18} />
                          <input
                            name="email"
                            type="email"
                            placeholder={t('contactPage.emailPH')}
                            required
                            onChange={() => emailError && setEmailError('')}
                          />
                        </div>
                        {emailError && <span className="contact-error-msg">{emailError}</span>}
                      </div>
                      <div className="contact-field">
                        <label>{t('contactPage.phone')}</label>
                        <div className="contact-input-wrap">
                          <Icon icon="mdi:phone-outline" width={18} />
                          <input name="phone" type="tel" placeholder={t('contactPage.phonePH')} />
                        </div>
                      </div>
                      <div className="contact-field">
                        <label>{t('contactPage.subject')}</label>
                        <div className="contact-input-wrap">
                          <Icon icon="mdi:tag-outline" width={18} />
                          <input name="subject" type="text" placeholder={t('contactPage.subjectPH')} />
                        </div>
                      </div>
                      <div className="contact-field full-width">
                        <label>{t('contactPage.message')} <span className="required-star">*</span></label>
                        <textarea name="comments" rows={5} placeholder={t('contactPage.messagePH')} required />
                      </div>
                    </div>

                    {statusMsg && status === 'error' && (
                      <div className="contact-alert contact-alert--error">
                        <Icon icon="mdi:alert-circle" width={18} /> {statusMsg}
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <><span className="spinner-border spinner-border-sm me-2" />{t('contactPage.sending')}</>
                      ) : (
                        <><Icon icon="mdi:send" width={18} /> {t('contactPage.sendMessage')}</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Col>

            {/* Sidebar */}
            <Col lg={5}>
              <div className="contact-sidebar">
                {/* FAQ Quick Links */}
                <div className="contact-sidebar-card">
                  <div className="contact-sidebar-icon">
                    <Icon icon="mdi:frequently-asked-questions" />
                  </div>
                  <h4>{t('contactPage.faqTitle')}</h4>
                  <p>{t('contactPage.faqText')}</p>
                  <ul className="contact-faq-list">
                    <li><Icon icon="mdi:chevron-right" width={16} /> {t('contactPage.faq1')}</li>
                    <li><Icon icon="mdi:chevron-right" width={16} /> {t('contactPage.faq2')}</li>
                    <li><Icon icon="mdi:chevron-right" width={16} /> {t('contactPage.faq3')}</li>
                    <li><Icon icon="mdi:chevron-right" width={16} /> {t('contactPage.faq4')}</li>
                  </ul>
                </div>

                {/* Social */}
                <div className="contact-sidebar-card">
                  <h4>{t('contactPage.followUs')}</h4>
                  <p>{t('contactPage.followText')}</p>
                  <div className="contact-social-links">
                    {SOCIAL_LINKS.map((s, i) => (
                      <a key={i} href={s.href} className="contact-social-btn" title={s.label} target="_blank" rel="noopener noreferrer">
                        <Icon icon={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Response time */}
                <div className="contact-sidebar-card contact-sidebar-card--accent">
                  <Icon icon="mdi:lightning-bolt" style={{ fontSize: 28, color: '#f59e0b' }} />
                  <h4>{t('contactPage.responseTitle')}</h4>
                  <p>{t('contactPage.responseText')}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Map Section ── */}
      <section className="contact-map-section">
        <Container fluid className="px-0">
          <div className="contact-map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.168!2d55.3781!3d25.1172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzAyLjAiTiA1NcKwMjInNDEuMiJF!5e0!3m2!1sen!2sae!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Trasealio Office Location"
            />
            <div className="contact-map-overlay">
              <div className="contact-map-card">
                <Icon icon="mdi:map-marker" style={{ fontSize: 24, color: '#ef4444' }} />
                <div>
                  <strong>{t('contactPage.officeTitle')}</strong>
                  <span>{t('contactPage.officeAddress')}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="page-cta section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className="page-cta-title">{t('contactPage.ctaTitle')}</h2>
              <p className="page-cta-text">{t('contactPage.ctaText')}</p>
              <div className="page-cta-buttons">
                <Link href="/#pricing" className="btn btn-primary btn-lg">{t('contactPage.ctaButton1')}</Link>
                <Link href="/careers" className="btn btn-outline-primary btn-lg">{t('contactPage.ctaButton2')}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default ContactPage
