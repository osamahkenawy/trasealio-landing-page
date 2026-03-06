"use client";

import Image from "next/image";
import React, { useState } from "react";
import image from "@/assets/images/trasealio_contact_screen.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Col, Container, Row } from "react-bootstrap";
import { sendMessage } from "./SendMessage";
import { useTranslation } from '@/i18n';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section className="section" id="contact">
      <Container>
        {/* Title */}
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <p className="title-sub-heading text-primary f-18">{t('contact.subtitle')}</p>
              <h2 className="title-heading">{t('contact.title')}</h2>
              <p className="title-desc text-muted mt-2">
                {t('contact.description')}
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 pt-5">
          {/* Left: Info */}
          <Col lg={6}>
            <div className="mt-4">
              <Image src={image} className="img-fluid" alt="image" />
            </div>

            <Row className="mt-3">
              <Col lg={6}>
                <div className="mt-4">
                  <h5 className="f-18">{t('contact.onlineServices')}</h5>
                  <p className="mb-2 mt-3 text-muted">
                    <Icon icon="mdi:email" className="me-2 text-primary" />
                    {t('contact.email1')}
                  </p>
                  <p className="text-muted">
                    <Icon icon="mdi:email" className="me-2 text-primary" />
                    {t('contact.email2')}
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mt-4">
                  <h5 className="f-18">{t('contact.onlineContact')}</h5>
                  <p className="mb-2 mt-3 text-muted">
                    <Icon icon="mdi:whatsapp" className="me-2 text-primary" /> {t('contact.phone1')}
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col lg={12}>
                <h5 className="f-18">{t('contact.officeAddress')}</h5>
                <p className="mb-2 mt-3 text-muted">
                  <Icon icon="mdi:map-marker" className="me-2 text-primary" />
                  {t('contact.address')}
                </p>
              </Col>
            </Row>

            {/* Social Icons */}
            <Row className="mt-4">
              <Col lg={12}>
                <h5 className="f-18">{t('footer.followUs')}</h5>
                <div className="d-flex gap-3 mt-3">
                  <a href="https://www.facebook.com/profile.php?id=61582271193231" target="_blank" rel="noopener noreferrer"
                     className="d-flex align-items-center justify-content-center rounded-circle"
                     style={{ width: 42, height: 42, background: '#1877f2', color: '#fff', fontSize: 20, transition: 'opacity 0.2s' }}
                     title="Facebook">
                    <Icon icon="mdi:facebook" />
                  </a>
                  <a href="https://www.instagram.com/trasealla/" target="_blank" rel="noopener noreferrer"
                     className="d-flex align-items-center justify-content-center rounded-circle"
                     style={{ width: 42, height: 42, background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: '#fff', fontSize: 20, transition: 'opacity 0.2s' }}
                     title="Instagram">
                    <Icon icon="mdi:instagram" />
                  </a>
                  <a href="https://www.linkedin.com/company/110608503/" target="_blank" rel="noopener noreferrer"
                     className="d-flex align-items-center justify-content-center rounded-circle"
                     style={{ width: 42, height: 42, background: '#0a66c2', color: '#fff', fontSize: 20, transition: 'opacity 0.2s' }}
                     title="LinkedIn">
                    <Icon icon="mdi:linkedin" />
                  </a>
                  <a href="https://wa.me/971503920037" target="_blank" rel="noopener noreferrer"
                     className="d-flex align-items-center justify-content-center rounded-circle"
                     style={{ width: 42, height: 42, background: '#25d366', color: '#fff', fontSize: 20, transition: 'opacity 0.2s' }}
                     title="WhatsApp">
                    <Icon icon="mdi:whatsapp" />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Right: Form */}
          <Col lg={6}>
            <div className="mt-4">
              <div className="custom-form mt-4">
                <form
                  action={async (formData) => {
                    const email = formData.get("email") as string;
                    setEmailError('');

                    if (!email || !validateEmail(email)) {
                      setEmailError(t('contact.emailRequired'));
                      return;
                    }

                    setStatus('sending');
                    setStatusMsg('');
                    try {
                      const res = await sendMessage(formData);
                      if (res.success) {
                        setStatus('success');
                        setStatusMsg(t('contact.messageSent'));
                        // Reset form fields
                        const form = document.querySelector('#contact form') as HTMLFormElement;
                        if (form) form.reset();
                        // Auto-clear success status after 5s so form is clearly ready for re-use
                        setTimeout(() => {
                          setStatus('idle');
                          setStatusMsg('');
                        }, 5000);
                      } else {
                        setStatus('error');
                        setStatusMsg(res.message || t('contact.messageFailed'));
                      }
                    } catch {
                      setStatus('error');
                      setStatusMsg(t('contact.messageFailed'));
                    }
                  }}
                >
                  <Row>
                    <Col lg={6}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.firstName')}</label>
                        <input name="firstname" className="form-control" type="text" required />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.lastName')}</label>
                        <input name="lastname" className="form-control" type="text" />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">
                          {t('contact.emailAddress')} <span style={{ color: '#e74c3c' }}>*</span>
                        </label>
                        <input
                          name="email"
                          className={`form-control ${emailError ? 'is-invalid' : ''}`}
                          type="email"
                          required
                          onChange={() => emailError && setEmailError('')}
                        />
                        {emailError && (
                          <div className="invalid-feedback" style={{ display: 'block' }}>
                            {emailError}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.subject')}</label>
                        <input name="subject" className="form-control" type="text" />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.yourMessage')}</label>
                        <textarea name="comments" rows={5} className="form-control" />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12} className="mt-3 text-right">
                      <button
                        type="submit"
                        className="submitBnt btn btn-primary btn-round"
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? (
                          <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{t('contact.sending')}</>
                        ) : t('contact.sendMessage')}
                      </button>
                    </Col>
                  </Row>

                  {statusMsg && (
                    <Row className="mt-3">
                      <Col lg={12}>
                        <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'} py-2`} role="alert">
                          <Icon icon={status === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'} className="me-2" />
                          {statusMsg}
                          {status === 'success' && (
                            <small className="d-block mt-1 text-muted">{t('contact.confirmationNote')}</small>
                          )}
                        </div>
                      </Col>
                    </Row>
                  )}
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
