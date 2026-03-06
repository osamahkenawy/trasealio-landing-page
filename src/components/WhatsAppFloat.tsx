'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const WHATSAPP_NUMBER = '971503920037'
const WHATSAPP_MESSAGE = 'Hi! I\'m interested in learning more about traseallo.'

const WhatsAppFloat = () => {
  const [hovered, setHovered] = useState(false)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Icon icon="mdi:whatsapp" width={28} />
        {hovered && <span className="whatsapp-float-label">Chat with us</span>}
      </a>

      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: #fff;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.4);
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
        }
        .whatsapp-float:hover {
          width: auto;
          border-radius: 28px;
          padding: 0 22px;
          background: #20ba5a;
          box-shadow: 0 8px 32px rgba(37, 211, 102, 0.5);
          transform: scale(1.05);
          color: #fff;
        }
        .whatsapp-float-label {
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          font-family: var(--font-poppins), sans-serif;
        }
        @media (max-width: 575px) {
          .whatsapp-float {
            bottom: 18px;
            right: 18px;
            width: 50px;
            height: 50px;
          }
          .whatsapp-float:hover {
            width: 50px;
            padding: 0;
            border-radius: 50%;
          }
          .whatsapp-float-label {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default WhatsAppFloat
