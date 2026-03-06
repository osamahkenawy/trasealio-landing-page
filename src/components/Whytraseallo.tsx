'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from '@/i18n'

type LayerKey = 'clients' | 'dispatchers' | 'drivers' | 'recipients'

const layers: LayerKey[] = ['clients', 'dispatchers', 'drivers', 'recipients']

// Y positions for the highlighted blue diamond per layer (index)
const diamondY = [8, 97, 200, 277]
// Y positions for the ghost/outline diamonds
const ghostPositions = [8, 32, 56, 97, 137, 177, 200, 277]

const Whytraseallo = () => {
    const { t, dir } = useTranslation()
    const [active, setActive] = useState<LayerKey>('clients')
    const [isAutoPlay, setIsAutoPlay] = useState(true)

    const activeIndex = layers.indexOf(active)

    // Auto-rotate every 4 seconds
    useEffect(() => {
        if (!isAutoPlay) return
        const interval = setInterval(() => {
            setActive(prev => {
                const idx = layers.indexOf(prev)
                return layers[(idx + 1) % layers.length]
            })
        }, 4000)
        return () => clearInterval(interval)
    }, [isAutoPlay])

    const handleClick = useCallback((layer: LayerKey) => {
        setActive(layer)
        setIsAutoPlay(false)
        // Resume auto-play after 12s of inactivity
        setTimeout(() => setIsAutoPlay(true), 12000)
    }, [])

    const features: Record<LayerKey, { title: string; items: string[] }> = {
        clients: {
            title: t('whytraseallo.clients.title'),
            items: [
                t('whytraseallo.clients.item1'),
                t('whytraseallo.clients.item2'),
                t('whytraseallo.clients.item3'),
            ],
        },
        dispatchers: {
            title: t('whytraseallo.dispatchers.title'),
            items: [
                t('whytraseallo.dispatchers.item1'),
                t('whytraseallo.dispatchers.item2'),
                t('whytraseallo.dispatchers.item3'),
            ],
        },
        drivers: {
            title: t('whytraseallo.drivers.title'),
            items: [
                t('whytraseallo.drivers.item1'),
                t('whytraseallo.drivers.item2'),
                t('whytraseallo.drivers.item3'),
            ],
        },
        recipients: {
            title: t('whytraseallo.recipients.title'),
            items: [
                t('whytraseallo.recipients.item1'),
                t('whytraseallo.recipients.item2'),
                t('whytraseallo.recipients.item3'),
            ],
        },
    }

    const isRtl = dir === 'rtl'

    return (
        <section className="why-traseallo-section" id="why-traseallo">
            <Container>
                {/* Header */}
                <div className="why-traseallo-header text-center">
                    <p className="why-traseallo-subtitle">{t('whytraseallo.subtitle')}</p>
                    <h2 className="why-traseallo-title">{t('whytraseallo.title')}</h2>
                </div>

                {/* Interactive 3-column layout */}
                <div className="why-traseallo-content">
                    {/* Left: Layer buttons */}
                    <div className={`why-traseallo-labels ${isRtl ? 'rtl-labels' : ''}`}>
                        {layers.map((layer, idx) => {
                            const isActive = active === layer
                            return (
                                <div key={layer} className="label-row">
                                    <button
                                        type="button"
                                        className={`layer-btn ${isActive ? 'active' : ''}`}
                                        onClick={() => handleClick(layer)}
                                    >
                                        <span className="layer-label">
                                            {t(`whytraseallo.layers.${layer}`)}
                                        </span>
                                    </button>
                                    <div className={`connector-line ${isActive ? 'active' : ''}`}>
                                        <span className="connector-dot" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Center: SVG Diamond Stack */}
                    <div className="why-traseallo-diagram">
                        <svg viewBox="0 0 276 420" width="276" role="img" aria-hidden="true">
                            <defs>
                                <linearGradient id="active-diamond-gradient" x1="138" y1="0" x2="138" y2="140" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#3A6090" />
                                    <stop offset="1" stopColor="#244066" />
                                </linearGradient>
                            </defs>

                            {/* Ghost/outline diamonds */}
                            {ghostPositions.map((y, i) => {
                                // Determine if this ghost diamond is "above" the active one
                                const activeY = diamondY[activeIndex]
                                const isAbove = y < activeY
                                const isBelow = y > activeY + 70
                                const isNearActive = Math.abs(y - activeY) < 50
                                return (
                                    <path
                                        key={`ghost-${i}`}
                                        d="M137.229 0.686C137.721 0.438 138.279 0.438 138.771 0.686L274.291 68.815C275.136 69.24 275.5 70.167 275.5 71C275.5 71.833 275.136 72.76 274.291 73.185L138.771 141.314C138.279 141.562 137.721 141.562 137.229 141.314L1.709 73.185C0.864 72.76 0.5 71.833 0.5 71C0.5 70.167 0.864 69.24 1.709 68.815L137.229 0.686Z"
                                        transform={`translate(0 ${y})`}
                                        fill={isNearActive ? 'none' : '#F4F6FA'}
                                        fillOpacity={isNearActive ? 0 : 0.4}
                                        stroke={isNearActive ? 'none' : '#DCE2EE'}
                                        className="ghost-diamond"
                                        style={{
                                            opacity: isNearActive ? 0 : (isAbove || isBelow) ? 0.6 : 1,
                                            transition: 'opacity 0.4s ease',
                                        }}
                                    />
                                )
                            })}

                            {/* Active blue diamond */}
                            <g style={{ mixBlendMode: 'multiply' }}>
                                <path
                                    d="M137.453 0.133C137.804 -0.044 138.196 -0.044 138.547 0.133L274.067 68.262C275.311 68.888 275.311 71.113 274.067 71.738L138.547 139.867C138.196 140.044 137.804 140.044 137.453 139.867L1.933 71.738C0.689 71.113 0.689 68.888 1.933 68.262L137.453 0.133Z"
                                    fill="url(#active-diamond-gradient)"
                                    className="active-diamond"
                                    style={{
                                        transform: `translateY(${diamondY[activeIndex]}px)`,
                                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transformBox: 'fill-box',
                                        transformOrigin: '0 0',
                                    }}
                                />
                            </g>
                        </svg>
                    </div>

                    {/* Right: Feature descriptions */}
                    <div className={`why-traseallo-features ${isRtl ? 'rtl-features' : ''}`}>
                        {layers.map((layer) => {
                            const isActive = active === layer
                            const data = features[layer]
                            return (
                                <div
                                    key={layer}
                                    className={`feature-panel ${isActive ? 'active' : ''}`}
                                >
                                    {data.items.map((item, i) => (
                                        <span key={i} className="feature-item">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Whytraseallo
