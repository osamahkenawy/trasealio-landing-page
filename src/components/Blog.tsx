'use client'
import React from 'react'
import blogImg1 from '@/assets/images/blog/img-1.jpg'
import blogImg2 from '@/assets/images/blog/img-2.jpg'
import blogImg3 from '@/assets/images/blog/img-3.jpg'
import userImg1 from '@/assets/images/user/img-1.jpg'
import userImg2 from '@/assets/images/user/img-2.jpg'
import userImg3 from '@/assets/images/user/img-3.jpg'
import Image, { StaticImageData } from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useTranslation } from '@/i18n'

type BlogType = {
    id: number
    titleKey: string
    comments: number
    views: number
    image: StaticImageData
    authorImage: StaticImageData
}

const blogPosts: BlogType[] = [
    {
        id: 1,
        titleKey: "blog.post1Title",
        comments: 45,
        views: 256,
        image: blogImg1,
        authorImage: userImg1,
    },
    {
        id: 2,
        titleKey: "blog.post2Title",
        comments: 63,
        views: 265,
        image: blogImg2,
        authorImage: userImg2,
    },
    {
        id: 3,
        titleKey: "blog.post3Title",
        comments: 76,
        views: 451,
        image: blogImg3,
        authorImage: userImg3,
    }
]


const Blog = () => {
    const { t } = useTranslation()
    return (
        <section className="section bg-light" id="blog">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="text-center">
                            <p className="title-sub-heading text-primary f-18">{t('blog.subtitle')}</p>
                            <h2 className="title-heading">{t('blog.title')}</h2>
                            <p className="title-desc text-muted mt-2">{t('blog.description')}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5 pt-3">
                    {
                        blogPosts.map((item, idx) => (
                            <Col lg={4} key={idx}>
                                <div className="blog-box mt-4 bg-white">
                                    <Image src={item.image} className="img-fluid rounded" alt='blog' />
                                    <div className="blog-contain p-4">
                                        <div className="blog-user-box bg-white rounded">
                                            <div className="media">
                                                <div className="blog-user">
                                                    <Image src={item.authorImage} className="img-fluid rounded" alt='user' />
                                                </div>
                                                <div className="media-body ms-3">
                                                    <h5 className="f-13 mb-1">{t('blog.author')}</h5>
                                                    <p className="text-primary f-10 mb-0 font-weight-600"><Icon icon='mdi:calender' />{t('blog.date')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="mt-4"><Link href='' className="text-dark f-18">{t(item.titleKey)}</Link></h5>
                                        <div className="mt-4 f-14">
                                            <p className="mb-0">
                                                <Link href='' className="text-dark"><Icon icon='mdi:forum-outline' className="ms-2 text-primary me-2 f-16" />{item.comments} {t('blog.comment')}</Link>
                                                <Link href='' className="text-dark ms-4"><Icon icon='mdi:eye-outline' className="ms-2 text-primary me-2 f-16" />{item.views} {t('blog.views')}</Link>
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <Link href='' className="btn btn-primary btn-sm">{t('blog.readMore')} <Icon icon='mdi-arrow-right' className="ms-2" /></Link>
                                        </div>
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

export default Blog