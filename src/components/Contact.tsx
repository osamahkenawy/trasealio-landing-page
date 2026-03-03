"use client";

import Image from "next/image";
import React, { useState } from "react";
import image from "@/assets/images/img-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Col, Container, Row } from "react-bootstrap";
import { sendMessage } from "./SendMessage";
import { useTranslation } from '@/i18n';

const Contact = () => {
  const [status, setStatus] = useState<string | null>(null);
  const { t } = useTranslation();

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
                    <Icon icon="mdi:phone" className="me-2 text-primary" /> {t('contact.phone1')}
                  </p>
                  <p className="text-muted">
                    <Icon icon="mdi:phone" className="me-2 text-primary" /> {t('contact.phone2')}
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
          </Col>

          {/* Right: Form */}
          <Col lg={6}>
            <div className="mt-4">
              <div className="custom-form mt-4">
                <form
                  action={async (formData) => {
                    const res = await sendMessage(formData);
                    setStatus(res.success ? t('contact.messageSent') : t('contact.messageFailed'));
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
                        <input name="lastname" className="form-control" type="text" required />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.emailAddress')}</label>
                        <input name="email" className="form-control" type="email" required />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.subject')}</label>
                        <input name="subject" className="form-control" type="text" required />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="form-group mt-1">
                        <label className="contact-lable">{t('contact.yourMessage')}</label>
                        <textarea name="comments" rows={5} className="form-control" required />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12} className="mt-3 text-right">
                      <button type="submit" className="submitBnt btn btn-primary btn-round">
                        {t('contact.sendMessage')}
                      </button>
                    </Col>
                  </Row>
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
