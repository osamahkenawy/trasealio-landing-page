'use client'
import React from 'react'
import Image, { StaticImageData } from "next/image"
import img1 from "@/assets/images/user/img-1.jpg"
import img2 from "@/assets/images/user/img-2.jpg"
import img3 from "@/assets/images/user/img-3.jpg"
import img4 from "@/assets/images/user/img-4.jpg"
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

export type TeamMember = {
    id: number
    name: string
    email: string
    role: string
    img: StaticImageData
}

export const teamData: TeamMember[] = [
    {
        id: 1,
        name: "team.member1Name",
        email: "Zacharyt@gmail.com",
        role: "team.member1Role",
        img: img1,
    },
    {
        id: 2,
        name: "team.member2Name",
        email: "JeremiahE@gmail.com",
        role: "team.member2Role",
        img: img2,
    },
    {
        id: 3,
        name: "team.member3Name",
        email: "ZacharyT@gmail.com",
        role: "team.member3Role",
        img: img3,
    },
    {
        id: 4,
        name: "team.member4Name",
        email: "WilliamA@gmail.com",
        role: "team.member4Role",
        img: img4,
    }
]


const Team = () => {
    const { t } = useTranslation()
    return (
        <section className="section" id="team">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="title-sub-heading text-primary f-18">{t('team.subtitle')}</p>
                            <h2 className="title-heading">{t('team.title')}</h2>
                            <p className="title-desc text-muted mt-2">{t('team.description')}</p>
                        </div>
                    </Col>
                </Row>
                <Row className=" mt-5 pt-5">
                    {
                        teamData.map((item, idx) => (
                            <Col lg={3} key={idx}>
                                <div className="team-box rounded shadow mt-4 bg-white rounded">
                                    <div className="p-4">
                                        <div className="team-img text-center">
                                            <Image src={item.img} className="img-fluid rounded-circle" alt='user-img' />
                                        </div>
                                        <div className="text-center mt-4">
                                            <h5 className="f-18">{t(item.name)}</h5>
                                            <p className="text-muted mb-0 f-14 mt-2">{item.email}</p>
                                        </div>
                                    </div>
                                    <div className="team-border text-center">
                                        <p className="text-muted text-uppercase f-13 mb-0">{t(item.role)}</p>
                                    </div>
                                    <div className="team-social text-center">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <Link href='' className="text-reset">
                                                    <span>
                                                        <Icon icon='mdi:facebook' />
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link href='' className="text-reset">
                                                    <span>
                                                        <Icon icon='mdi:twitter' />
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link href='' className="text-reset">
                                                    <span>
                                                        <Icon icon='mdi:google' />
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link href='' className="text-reset">
                                                    <span>
                                                        <Icon icon='mdi:pinterest' />
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>

    )
}

export default Team