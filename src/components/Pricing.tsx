'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import Nouislider from "nouislider-react";
import "nouislider-react/node_modules/nouislider/distribute/nouislider.min.css";
import { Col, Container, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import Link from 'next/link';
import { useTranslation } from '@/i18n';

const Pricing = () => {
  const [value, setValue] = useState(200);
  const [value1, setValue1] = useState(600);
  const [value2, setValue2] = useState(800);
  const { t } = useTranslation();
  return (
    <section className="section pb-5" id="pricing">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <p className="title-sub-heading text-primary f-18">{t('pricing.subtitle')}</p>
              <h2 className="title-heading">{t('pricing.title')}</h2>
              <p className="title-desc text-muted mt-2">{t('pricing.description')}</p>
            </div>
          </Col>
        </Row>
        <Row className=" mt-5 pt-4">
          <Col lg={12}>
            <TabContainer defaultActiveKey='1'>
              <div className="text-center">
                <Nav className="nav-pills rounded justify-content-center d-inline-block pricing-tab-border py-1 px-2" id="pills-tab" role="tablist">
                  <NavItem className="d-inline-block">
                    <NavLink eventKey='1' className=" px-3 rounded monthly" id="Monthly" data-toggle="pill" href="#Month" role="tab" aria-controls="Month" aria-selected="true">{t('pricing.monthly')}</NavLink>
                  </NavItem>
                  <NavItem className="d-inline-block">
                    <NavLink eventKey='2' className="px-3 rounded yearly" id="Yearly" data-toggle="pill" href="#Year" role="tab" aria-controls="Year" aria-selected="false">
                      {t('pricing.yearly')} <span className="badge bg-success rounded text-white">{t('pricing.off')}</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <TabContent className="pt-3" id="pills-tabContent">
                <TabPane eventKey='1' className="fade" id="Month" role="tabpanel" aria-labelledby="Monthly">
                  <Row className=" mt-3">
                    <Col lg={4}>
                      <div className="pricing-box shadow mt-4 rounded">
                        <h5>{t('pricing.freelancer')}</h5>
                        <div className="mt-4 text-center pb-2">
                          <h3 className="text-primary mt-4">$199<span className="f-14 text-muted">{t('pricing.perMonth')}</span></h3>
                          <h5 className="f-16 mb-2">{t('pricing.mau1k')}</h5>
                        </div>
                        <div className="mt-4 bg-light p-3">
                          <Nouislider
                            range={{ min: 0, max: 1000 }}
                            start={[value]}
                            connect={[true, false]} 
                            step={10}
                            tooltips={true}
                            format={{
                              to: (val) => `$${Math.round(val)}`,
                              from: (val) => Number(val),
                            }}
                            onSlide={(values) => {
                              setValue(Math.round(values[0]));
                            }}
                          />
                        </div>
                        <div className="mt-4 pt-2">
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.verifiedWork')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.dedicatedManagers')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.unlimitedProposals')}</p>
                          <p className="mb-2"><Icon icon='mdi:close-box-outline' className="text-danger f-18 me-2" />{t('pricing.projectTracking')}</p>
                          <p className="mb-2"><Icon icon='mdi:close-box-outline' className="text-danger f-18 me-2" />{t('pricing.easyPayments')}</p>
                        </div>
                        <div className="mt-4 pt-3 text-center">
                          <Link href='' className="btn btn-outline-primary">{t('pricing.startWithFloaks')}</Link>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="pricing-box shadow mt-4 rounded">
                        <div className="pricing-badge">
                          <span className="badge">{t('pricing.featured')}</span>
                        </div>
                        <h5>{t('pricing.startup')}</h5>
                        <div className="mt-4 text-center pb-2">
                          <h3 className="text-primary mt-4">$299<span className="f-14 text-muted">{t('pricing.perMonth')}</span></h3>
                          <h5 className="f-16 mb-2">{t('pricing.mau5k')}</h5>
                        </div>
                        <div className="mt-4 bg-light p-3">
                          <Nouislider
                            range={{ min: 0, max: 1000 }}
                            start={[value1]}
                            connect={[true, false]} 
                            step={10}
                            tooltips={true}
                            format={{
                              to: (val) => `$${Math.round(val)}`,
                              from: (val) => Number(val),
                            }}
                            onSlide={( values1) => {
                              setValue1(Math.round(values1[0]));
                            }}
                          />
                        </div>
                        <div className="mt-4 pt-2">
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.verifiedWork')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.dedicatedManagers')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.unlimitedProposals')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.projectTracking')}</p>
                          <p className="mb-2"><Icon icon='mdi:close-box-outline' className="text-danger f-18 me-2" />{t('pricing.easyPayments')}</p>
                        </div>
                        <div className="mt-4 pt-3 text-center">
                          <Link href='' className="btn btn-primary">{t('pricing.startWithFloaks')}</Link>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="pricing-box shadow mt-4 rounded">
                        <h5>{t('pricing.enterprise')}</h5>
                        <div className="mt-4 text-center pb-2">
                          <h3 className="text-primary mt-4">$399<span className="f-14 text-muted">{t('pricing.perMonth')}</span></h3>
                          <h5 className="f-16 mb-2">{t('pricing.mau10k')}</h5>
                        </div>
                        <div className="mt-4 bg-light p-3">
                          <Nouislider
                            range={{ min: 0, max: 1000 }}
                            start={[value2]}
                            connect={[true, false]} 
                            step={10}
                            tooltips={true}
                            format={{
                              to: (val) => `$${Math.round(val)}`,
                              from: (val) => Number(val),
                            }}
                            onSlide={( values2) => {
                              setValue2(Math.round(values2[0]));
                            }}
                          />
                        </div>
                        <div className="mt-4 pt-2">
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.verifiedWork')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.dedicatedManagers')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.unlimitedProposals')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.projectTracking')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.easyPayments')}</p>
                        </div>
                        <div className="mt-4 pt-3 text-center">
                          <Link href='' className="btn btn-outline-primary">{t('pricing.startWithFloaks')}</Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane eventKey='2' className="fade" role="tabpanel" aria-labelledby="Yearly">
                  <Row className=" mt-3">
                    <Col lg={4}>
                      <div className="pricing-box shadow mt-4 rounded">
                        <h5>{t('pricing.freelancer')}</h5>
                        <div className="mt-4 text-center pb-2">
                          <h3 className="text-primary mt-4">$599<span className="f-14 text-muted">{t('pricing.perMonth')}</span></h3>
                          <h5 className="f-16 mb-2">{t('pricing.mau1k')}</h5>
                        </div>
                        <div className="mt-4 bg-light p-3">
                          <Nouislider
                            range={{ min: 0, max: 1000 }}
                            start={[value]}
                            connect={[true, false]} 
                            step={10}
                            tooltips={true}
                            format={{
                              to: (val) => `$${Math.round(val)}`,
                              from: (val) => Number(val),
                            }}
                            onSlide={( values) => {
                              setValue(Math.round(values[0]));
                            }}
                          />
                        </div>
                        <div className="mt-4 pt-2">
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.verifiedWork')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.dedicatedManagers')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.unlimitedProposals')}</p>
                          <p className="mb-2"><Icon icon='mdi:close-box-outline' className="text-danger f-18 me-2" />{t('pricing.projectTracking')}</p>
                          <p className="mb-2"><Icon icon='mdi:close-box-outline' className="text-danger f-18 me-2" />{t('pricing.easyPayments')}</p>
                        </div>
                        <div className="mt-4 pt-3 text-center">
                          <Link href='' className="btn btn-outline-primary">{t('pricing.startWithFloaks')}</Link>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="pricing-box shadow mt-4 rounded">
                        <div className="pricing-badge">
                          <span className="badge">{t('pricing.featured')}</span>
                        </div>
                        <h5>{t('pricing.startup')}</h5>
                        <div className="mt-4 text-center pb-2">
                          <h3 className="text-primary mt-4">$799<span className="f-14 text-muted">{t('pricing.perMonth')}</span></h3>
                          <h5 className="f-16 mb-2">{t('pricing.mau5k')}</h5>
                        </div>
                        <div className="mt-4 bg-light p-3">
                          <Nouislider
                            range={{ min: 0, max: 1000 }}
                            start={[value1]}
                            connect={[true, false]} 
                            step={10}
                            tooltips={true}
                            format={{
                              to: (val) => `$${Math.round(val)}`,
                              from: (val) => Number(val),
                            }}
                            onSlide={( values1) => {
                              setValue1(Math.round(values1[0]));
                            }}
                          />
                        </div>
                        <div className="mt-4 pt-2">
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.verifiedWork')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.dedicatedManagers')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.unlimitedProposals')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.projectTracking')}</p>
                          <p className="mb-2"><Icon icon='mdi:close-box-outline' className="text-danger f-18 me-2" />{t('pricing.easyPayments')}</p>
                        </div>
                        <div className="mt-4 pt-3 text-center">
                          <Link href='' className="btn btn-primary">{t('pricing.startWithFloaks')}</Link>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="pricing-box shadow mt-4 rounded">
                        <h5>{t('pricing.enterprise')}</h5>
                        <div className="mt-4 text-center pb-2">
                          <h3 className="text-primary mt-4">$999<span className="f-14 text-muted">{t('pricing.perMonth')}</span></h3>
                          <h5 className="f-16 mb-2">{t('pricing.mau10k')}</h5>
                        </div>
                        <div className="mt-4 bg-light p-3">
                          <Nouislider
                            range={{ min: 0, max: 1000 }}
                            start={[value2]}
                            connect={[true, false]} 
                            step={10}
                            tooltips={true}
                            format={{
                              to: (val) => `$${Math.round(val)}`,
                              from: (val) => Number(val),
                            }}
                            onSlide={( values2) => {
                              setValue2(Math.round(values2[0]));
                            }}
                          />
                        </div>
                        <div className="mt-4 pt-2">
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.verifiedWork')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.dedicatedManagers')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.unlimitedProposals')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.projectTracking')}</p>
                          <p className="mb-2"><Icon icon='mdi:check-box-outline' className="text-primary f-18 me-2" />{t('pricing.easyPayments')}</p>
                        </div>
                        <div className="mt-4 pt-3 text-center">
                          <Link href='' className="btn btn-outline-primary">{t('pricing.startWithFloaks')}</Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </TabContainer>
          </Col>
        </Row>
      </Container>
    </section >

  )
}

export default Pricing
