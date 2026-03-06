'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Col, Container, Row } from 'react-bootstrap'
import { Icon } from '@iconify/react/dist/iconify.js'
import TopBar from '@/layouts/TopBar'
import Footer from '@/layouts/Footer'
import { useTranslation } from '@/i18n'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'

interface Opening {
  id: number
  title: string
  department: string
  location: string
  employment_type: string
  description: string
  requirements: string
  salary_range: string | null
  icon: string
}

const CareerApplyPage = () => {
  const { t } = useTranslation()
  const params = useParams()
  const id = params?.id as string
  const fileRef = useRef<HTMLInputElement>(null)

  const [opening, setOpening] = useState<Opening | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
  })
  const [resume, setResume] = useState<File | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`${API_BASE}/api/public/careers/${id}`, { signal: AbortSignal.timeout(5000) })
      .then(r => r.json())
      .then(d => { if (d.success) setOpening(d.opening) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name || !form.email) {
      setError('Please fill in your name and email.')
      return
    }
    setError('')
    setSubmitting(true)

    try {
      const fd = new FormData()
      fd.append('opening_id', id)
      fd.append('full_name', form.full_name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('cover_letter', form.cover_letter)
      if (resume) fd.append('resume', resume)

      const res = await fetch(`${API_BASE}/api/public/careers/apply`, {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.message || 'Something went wrong.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <TopBar hideNav solidBg ctaLabel="Explore Trasealio" ctaHref="/" />

      <section className="page-hero page-hero--compact">
        <div className="page-hero-decor">
          <div className="decor-circle" />
          <div className="decor-circle" />
          <div className="decor-circle" />
        </div>
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <span className="page-hero-tag">APPLICATION</span>
              {loading ? (
                <h1 className="page-hero-title">Loading position...</h1>
              ) : opening ? (
                <>
                  <h1 className="page-hero-title">{opening.title}</h1>
                  <p className="page-hero-subtitle">
                    <Icon icon="mdi:briefcase-outline" /> {opening.department}&nbsp;&nbsp;
                    <Icon icon="mdi:map-marker-outline" /> {opening.location}&nbsp;&nbsp;
                    <Icon icon="mdi:clock-outline" /> {opening.employment_type}
                  </p>
                </>
              ) : (
                <h1 className="page-hero-title">Position Not Found</h1>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {!loading && opening && !success && (
        <section className="section apply-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <Row className="gy-4">
                  {/* Left — Job Details */}
                  <Col lg={5}>
                    <div className="apply-details-card">
                      <div className="apply-details-icon">
                        <Icon icon={opening.icon || 'mdi:briefcase-outline'} />
                      </div>
                      <h3>{opening.title}</h3>
                      <div className="apply-meta">
                        <span><Icon icon="mdi:briefcase-outline" /> {opening.department}</span>
                        <span><Icon icon="mdi:map-marker-outline" /> {opening.location}</span>
                        <span><Icon icon="mdi:clock-outline" /> {opening.employment_type}</span>
                        {opening.salary_range && (
                          <span><Icon icon="mdi:currency-usd" /> {opening.salary_range}</span>
                        )}
                      </div>
                      {opening.description && (
                        <div className="apply-section-block">
                          <h5>About the Role</h5>
                          <p>{opening.description}</p>
                        </div>
                      )}
                      {opening.requirements && (
                        <div className="apply-section-block">
                          <h5>Requirements</h5>
                          <p>{opening.requirements}</p>
                        </div>
                      )}
                    </div>
                  </Col>

                  {/* Right — Application Form */}
                  <Col lg={7}>
                    <div className="apply-form-card">
                      <h3>
                        <Icon icon="mdi:file-document-edit-outline" /> Submit Your Application
                      </h3>
                      <p className="apply-form-subtitle">
                        Fill in the form below. Fields marked with <span className="required-star">*</span> are required.
                      </p>

                      {error && (
                        <div className="apply-alert apply-alert--error">
                          <Icon icon="mdi:alert-circle-outline" /> {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="apply-form-grid">
                          <div className="apply-field">
                            <label>Full Name <span className="required-star">*</span></label>
                            <div className="apply-input-wrap">
                              <Icon icon="mdi:account-outline" />
                              <input
                                type="text"
                                placeholder="John Doe"
                                value={form.full_name}
                                onChange={e => setForm({ ...form, full_name: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                          <div className="apply-field">
                            <label>Email <span className="required-star">*</span></label>
                            <div className="apply-input-wrap">
                              <Icon icon="mdi:email-outline" />
                              <input
                                type="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                          <div className="apply-field">
                            <label>Phone</label>
                            <div className="apply-input-wrap">
                              <Icon icon="mdi:phone-outline" />
                              <input
                                type="tel"
                                placeholder="+971 50 123 4567"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="apply-field">
                            <label>Resume / CV</label>
                            <div
                              className={`apply-file-drop ${resume ? 'has-file' : ''}`}
                              onClick={() => fileRef.current?.click()}
                            >
                              <input
                                ref={fileRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={e => setResume(e.target.files?.[0] || null)}
                                style={{ display: 'none' }}
                              />
                              {resume ? (
                                <div className="apply-file-info">
                                  <Icon icon="mdi:file-check-outline" />
                                  <span>{resume.name}</span>
                                  <button
                                    type="button"
                                    className="apply-file-remove"
                                    onClick={e => { e.stopPropagation(); setResume(null) }}
                                  >
                                    <Icon icon="mdi:close" />
                                  </button>
                                </div>
                              ) : (
                                <div className="apply-file-placeholder">
                                  <Icon icon="mdi:cloud-upload-outline" />
                                  <span>Click to upload PDF, DOC, or DOCX (max 5MB)</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="apply-field full-width">
                            <label>Cover Letter</label>
                            <textarea
                              rows={5}
                              placeholder="Tell us why you're a great fit for this role..."
                              value={form.cover_letter}
                              onChange={e => setForm({ ...form, cover_letter: e.target.value })}
                            />
                          </div>
                        </div>

                        <button className="btn btn-primary btn-lg apply-submit" type="submit" disabled={submitting}>
                          {submitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Icon icon="mdi:send" /> Submit Application
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Success State */}
      {success && (
        <section className="section apply-success-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} className="text-center">
                <div className="apply-success-card">
                  <div className="apply-success-icon">
                    <Icon icon="mdi:check-circle-outline" />
                  </div>
                  <h2>Application Submitted!</h2>
                  <p>
                    Thank you for applying for the <strong>{opening?.title}</strong> position.
                    We've sent a confirmation to your email. Our team will review your application and get back to you soon.
                  </p>
                  <div className="apply-success-actions">
                    <Link href="/careers" className="btn btn-outline-primary">
                      <Icon icon="mdi:arrow-left" /> Back to Careers
                    </Link>
                    <Link href="/" className="btn btn-primary">
                      Explore Trasealio
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Not Found */}
      {!loading && !opening && (
        <section className="section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} className="text-center py-5">
                <Icon icon="mdi:alert-circle-outline" style={{ fontSize: 64, color: '#787a7d' }} />
                <h3 className="mt-3">Position Not Found</h3>
                <p className="text-muted">This job posting may have been removed or is no longer available.</p>
                <Link href="/careers" className="btn btn-primary mt-3">View Open Positions</Link>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      <Footer />
    </>
  )
}

export default CareerApplyPage
