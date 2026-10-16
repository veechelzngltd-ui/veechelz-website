'use client'

import Image from 'next/image'
import {
  INK,
  LINEN,
  BRASS,
  COMPANY_NAME,
  TAGLINE,
  RC_NUMBER,
  ADDRESS,
  WHATSAPP_NUMBER,
  INSTAGRAM_HANDLE,
  HEADLINE,
  SUB_HEADLINE,
  SERVICES_LINE,
  OFFER_LINE,
  TRUST_LINE,
  CTA_TEXT,
  FONT_DISPLAY,
  FONT_BODY,
  CANVAS_W,
  CANVAS_H,
  SAFE_MARGIN,
} from './constants'

// ============================================
// FLIER COMPONENT
// ============================================

export default function FlierPage() {
  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
        backgroundColor: LINEN,
        fontFamily: FONT_BODY,
        color: INK,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative brass accent line - top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${BRASS}, transparent)`,
        }}
      />

      {/* Main content wrapper with safe margins */}
      <div
        style={{
          position: 'absolute',
          top: SAFE_MARGIN,
          left: SAFE_MARGIN,
          right: SAFE_MARGIN,
          bottom: SAFE_MARGIN,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* ===== TOP SECTION: LOGO + HEADLINE ===== */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>

          {/* Logo lockup - icon tile + live wordmark + tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Icon tile from logo.svg */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ flexShrink: 0 }}>
              <rect width="80" height="80" rx="14" fill="#ECEAE5" />
              <rect width="80" height="80" rx="14" stroke={INK} strokeOpacity={0.15} strokeWidth="1.5" />
              <g transform="translate(8, 8)">
                <polygon points="0,0 26,64 38,64 12,0" fill={INK} />
                <polygon points="26,0 52,64 64,64 38,0" fill={BRASS} />
                <line x1="8" y1="30" x2="56" y2="30" stroke="#ECEAE5" strokeWidth="2.5" />
              </g>
            </svg>

            {/* Wordmark + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: LINEN,
                  textShadow: `0 0 0 ${INK}, 2px 2px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}`,
                  lineHeight: 1,
                }}
              >
                VEECHELZ
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 60, height: 2, background: BRASS }} />
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: INK,
                    opacity: 0.6,
                  }}
                >
                  {TAGLINE} • {RC_NUMBER}
                </span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginTop: 8 }}>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 56,
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: INK,
                margin: 0,
                maxWidth: '100%',
              }}
            >
              {HEADLINE}
            </h1>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.5,
                color: INK,
                opacity: 0.7,
                marginTop: 12,
                marginBottom: 0,
                maxWidth: '85%',
              }}
            >
              {SUB_HEADLINE}
            </p>
          </div>
        </div>

        {/* ===== MIDDLE SECTION: WINDOW VISUAL WITH MEASUREMENT ===== */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 400 }}>
          {/* Window frame */}
          <div
            style={{
              width: '100%',
              maxWidth: 580,
              aspectRatio: '4/3',
              border: `8px solid ${INK}`,
              borderRadius: 8,
              position: 'relative',
              background: INK,
              overflow: 'hidden',
              boxShadow: `0 0 0 1px ${INK}, 0 20px 40px -10px rgba(24, 24, 27, 0.4)`,
            }}
          >
            {/* Window glass / background */}
            <div style={{ position: 'absolute', inset: 8, background: '#1a1a1a' }} />

            {/* Half-raised blind (slats) */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                right: 8,
                bottom: '55%',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: `linear-gradient(180deg, ${BRASS} 0%, #9a7a4a 50%, ${BRASS} 100%)`,
                    borderRadius: 1,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    transform: `translateX(${i % 2 === 0 ? '-2px' : '2px'})`,
                  }}
                />
              ))}
            </div>

            {/* Raised portion - open window */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                height: '50%',
                background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
                borderTop: `2px solid ${BRASS}40`,
              }}
            />

            {/* Laser measurement dimension line - horizontal at bottom of blind */}
            <div
              style={{
                position: 'absolute',
                left: 32,
                right: 32,
                top: 'calc(45% + 8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pointerEvents: 'none',
              }}
            >
              {/* Left extension line */}
              <div
                style={{
                  width: 20,
                  height: 1,
                  background: LINEN,
                  opacity: 0.8,
                }}
              />
              {/* Dimension line with arrows */}
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: LINEN,
                  opacity: 0.8,
                  position: 'relative',
                }}
              >
                {/* Left arrow */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: -6,
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '8px solid ' + LINEN,
                    opacity: 0.8,
                  }}
                />
                {/* Right arrow */}
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: -6,
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '8px solid ' + LINEN,
                    opacity: 0.8,
                  }}
                />
              </div>
              {/* Right extension line */}
              <div
                style={{
                  width: 20,
                  height: 1,
                  background: LINEN,
                  opacity: 0.8,
                }}
              />
            </div>

            {/* Measurement label */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 'calc(45% + 8px)',
                transform: 'translateX(-50%) translateY(-32px)',
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: LINEN,
                whiteSpace: 'nowrap',
                textShadow: `0 0 0 ${INK}, 1px 1px 0 ${INK}, -1px -1px 0 ${INK}`,
              }}
            >
              1247 mm
            </div>
          </div>

          {/* Offer callout - positioned near window */}
          <div
            style={{
              position: 'absolute',
              bottom: -80,
              left: 0,
              right: 0,
              textAlign: 'center',
              padding: '0 40px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 28px',
                background: INK,
                borderRadius: 9999,
                boxShadow: '0 8px 24px rgba(24,24,27,0.25)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRASS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 22,
                  fontWeight: 500,
                  color: LINEN,
                  lineHeight: 1.3,
                }}
              >
                {OFFER_LINE}
              </span>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM SECTION: SERVICES + TRUST + CTA ===== */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>

          {/* Services line */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.5,
              color: INK,
              opacity: 0.6,
              margin: 0,
              maxWidth: '90%',
            }}
          >
            {SERVICES_LINE}
          </p>

          {/* Trust line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRASS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 22,
                fontWeight: 500,
                color: INK,
                letterSpacing: '0.01em',
              }}
            >
              {TRUST_LINE}
            </span>
          </div>

          {/* CTA Button - no event handlers, just a styled link */}
          <a
            href={`https://wa.me/234${WHATSAPP_NUMBER.replace(/\D/g, '').replace(/^0/, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '20px 40px',
              background: INK,
              color: LINEN,
              fontFamily: FONT_BODY,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: '0.02em',
              borderRadius: 0,
              textDecoration: 'none',
              boxShadow: `0 4px 0 ${BRASS}, 0 8px 24px rgba(24,24,27,0.2)`,
            }}
          >
            {CTA_TEXT}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: INK, opacity: 0.5, fontSize: 20, fontFamily: FONT_BODY }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              <span>{WHATSAPP_NUMBER}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: INK, opacity: 0.5, fontSize: 20, fontFamily: FONT_BODY }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>{INSTAGRAM_HANDLE}</span>
            </div>
          </div>

          {/* Footer address + RC */}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${INK}20`, width: '100%', maxWidth: 600, textAlign: 'center' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: INK, opacity: 0.5, margin: '0 0 4 0', lineHeight: 1.5 }}>
              {ADDRESS}
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: INK, opacity: 0.4, margin: 0, lineHeight: 1.5 }}>
              Serving Abuja, Lagos & Port Harcourt
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: INK, opacity: 0.35, margin: '8 0 0 0', lineHeight: 1.5 }}>
              {COMPANY_NAME} • {RC_NUMBER}
            </p>
          </div>
        </div>

        {/* Decorative brass accent line - bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${BRASS}, transparent)`,
          }}
        />
      </div>
    </div>
  )
}