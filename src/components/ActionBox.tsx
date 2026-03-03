'use client'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

const ActionBox = () => {
  const { t } = useTranslation()
  return (
    <section className="section bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center">
              <h2>{t('actionBox.titlePart1')}<span className="text-primary">{t('actionBox.titleHighlight')}</span>{t('actionBox.titlePart2')}</h2>
              <div className="search-form mt-5">
                <form action="#">
                  <input type="text" placeholder={t('actionBox.placeholder')} />
                  <button type="submit" className="btn btn-primary">{t('actionBox.sendNow')}</button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

  )
}

export default ActionBox