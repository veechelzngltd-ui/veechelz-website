/*
 * Veechelz Window Blinds - Remotion Promo Sequence
 * 20-second portrait video (1080x1920, 30fps, 600 frames)
 * 
 * Source of truth: brag-plan.md storyboard
 * - Scene 1: Hero Introduction — 5s (0-149 frames) — Deep Zinc, tape measure click → headline/subhead
 * - Scene 2: Solutions Grid Reveal — 8s (150-389 frames) — Light bg, 3 cards stagger in, hover reveals
 * - Scene 3: Consultation Modal — 5s (390-539 frames) — Modal slides up, fields stagger, free card, CTA glow
 * - Scene 4: Outro / Punchline — 2s (540-599 frames) — Deep Zinc, logo + tagline
 * 
 * Motion constraints:
 * - Spring physics only (no linear fades)
 * - GPU-safe properties (transform, opacity)
 * - Staggered reveals (30-80ms = 1-2 frames at 30fps)
 * - Cinzel headlines, Inter body
 * - Palette: Deep Zinc #18181B, Warm Travertine Linen #F7F5F0, Muted Brass #B38F5B
 */

import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import React from 'react';

// ============ CONSTANTS ============

const FPS = 30;
const DURATION_FRAMES = 600;

// Scene frame ranges (from brag-plan.md)
const SCENE_1_START = 0;
const SCENE_1_DURATION = 5 * FPS; // 150 frames
const SCENE_2_START = SCENE_1_START + SCENE_1_DURATION; // 150
const SCENE_2_DURATION = 8 * FPS; // 240 frames
const SCENE_3_START = SCENE_2_START + SCENE_2_DURATION; // 390
const SCENE_3_DURATION = 5 * FPS; // 150 frames
const SCENE_4_START = SCENE_3_START + SCENE_3_DURATION; // 540
const SCENE_4_DURATION = 2 * FPS; // 60 frames

// Palette
const DEEP_ZINC = '#18181B';
const TRAVERTINE_LINEN = '#F7F5F0';
const MUTED_BRASS = '#B38F5B';

// Spring configs (Emil Kowalski style - critically damped for UI, slight bounce for momentum)
// Using Remotion spring() which takes {frame, fps, config, ...}
const SPRING_ENTER = { damping: 20, stiffness: 180, mass: 1 };
const SPRING_CARD = { damping: 22, stiffness: 200, mass: 1 };
const SPRING_MODAL = { damping: 18, stiffness: 160, mass: 1 };
const SPRING_DELICATE = { damping: 25, stiffness: 220, mass: 1 };
const SPRING_TAPE = { damping: 25, stiffness: 300, mass: 0.5 };

// ============ HELPER HOOKS ============

/**
 * Spring-based entrance animation - starts from scale(0.95) + opacity: 0
 * Per emil-design-eng: never animate from scale(0)
 * Remotion's spring() takes {frame, fps, config} and returns a value 0→1
 */
const useSpringEnter = (startFrame: number, delayFrames = 0, config = SPRING_ENTER, enterDuration = 20) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame - delayFrames;
  
  // Clamp localFrame to valid range
  const clampedFrame = Math.max(0, localFrame);
  
  // Remotion spring() returns value 0→1 over the spring duration
  // We need to scale the frame to the enterDuration
  const springFrame = clampedFrame / enterDuration * 100; // arbitrary scaling for spring
  
  const springVal = spring({
    frame: springFrame,
    fps: FPS,
    config,
    from: 0,
    to: 1,
  });
  
  return {
    opacity: springVal,
    scale: interpolate(springVal, [0, 1], [0.95, 1]),
  };
};

/**
 * Spring-based slide up entrance
 */
const useSpringSlideUp = (startFrame: number, delayFrames = 0, distance = 40, config = SPRING_MODAL, enterDuration = 25) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame - delayFrames;
  
  const clampedFrame = Math.max(0, localFrame);
  const springFrame = clampedFrame / enterDuration * 100;
  
  const springVal = spring({
    frame: springFrame,
    fps: FPS,
    config,
    from: 0,
    to: 1,
  });
  
  return {
    opacity: springVal,
    translateY: interpolate(springVal, [0, 1], [distance, 0]),
  };
};

/**
 * Stagger helper - returns delay in frames for index
 */
const staggerFrames = (index: number, baseDelay = 0, gap = 2) => baseDelay + index * gap;

// ============ SCENE 1: HERO INTRODUCTION (0-149) ============

const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  // Tape measure click animation (0-30 frames)
  // Use spring directly on frame for the tape measure
  const tapeSpring = spring({
    frame: frame,
    fps: FPS,
    config: SPRING_TAPE,
    from: 0,
    to: 1,
  });
  const tapeWidth = interpolate(tapeSpring, [0, 1], [width * 0.6, width * 0.05]);
  
  // Headline entrance (starts ~45 frames = 1.5s)
  const headlineAnim = useSpringEnter(45, 0, SPRING_DELICATE);
  
  // Subhead entrance (starts ~66 frames = 2.2s)
  const subheadAnim = useSpringEnter(66, 0, SPRING_DELICATE);

  return (
    <AbsoluteFill style={{ backgroundColor: DEEP_ZINC, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
      {/* Tape measure - clicks to precise millimeter */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${tapeWidth}px`,
          height: '2px',
          backgroundColor: MUTED_BRASS,
          borderRadius: '1px',
        }}
      />
      
      <div style={{ textAlign: 'center', maxWidth: '900px', zIndex: 1 }}>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: TRAVERTINE_LINEN,
            marginBottom: '24px',
            opacity: headlineAnim.opacity,
            transform: `scale(${headlineAnim.scale})`,
            transformOrigin: 'center',
          }}
        >
          Veechelz Window Blind Bespoke Interior Finishing
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 400,
            color: 'rgba(247, 245, 240, 0.85)',
            maxWidth: '700px',
            margin: '0 auto',
            opacity: subheadAnim.opacity,
            transform: `scale(${subheadAnim.scale})`,
            transformOrigin: 'center',
          }}
        >
          From luxury residential window treatments to corporate office fit-outs and B2B general contracting supplies — Veechelz Nigeria Limited delivers precision-engineered interior solutions across Nigeria.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: SOLUTIONS GRID REVEAL (150-389) ============

const CATEGORIES = [
  {
    id: 'day-night',
    name: 'Day & Night Blinds',
    shortName: 'Day & Night',
    features: ['Dual-Layer System', 'Adjustable Privacy', 'Modern Aesthetic'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  },
  {
    id: 'blackout-roller',
    name: 'Blackout Roller Blinds',
    shortName: 'Blackout Roller',
    features: ['Total Light Block', 'Thermal Insulation', 'Motorized Option'],
    image: 'https://images.unsplash.com/photo-1505843513577-22bbc9b4e96a?w=600&q=80',
  },
  {
    id: 'venetian-wooden',
    name: 'Venetian & Wooden Blinds',
    shortName: 'Venetian & Wooden',
    features: ['25–50mm Slats', 'Real & Faux Wood', 'Cordless Safety'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
];

const SolutionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - SCENE_2_START;
  
  // Section header entrance
  const headerAnim = useSpringEnter(localFrame, 0, SPRING_DELICATE);
  
  // Cards stagger in (3 cards, 2 frame gaps = ~66ms each)
  const cardAnims = CATEGORIES.map((_, i) => 
    useSpringEnter(localFrame, staggerFrames(i, 10), SPRING_CARD)
  );
  
  // Feature badges appear on simulated hover (later in scene)
  const badgeProgress = interpolate(localFrame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: TRAVERTINE_LINEN, color: DEEP_ZINC, padding: '60px 40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', opacity: headerAnim.opacity, transform: `scale(${headerAnim.scale})` }}>
          <span style={{
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: 'rgba(24, 24, 27, 0.08)',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '24px',
          }}>
            Our Specializations
          </span>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: DEEP_ZINC,
            marginBottom: '16px',
          }}>
            Premium Interior Collections
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: 'rgba(24, 24, 27, 0.6)',
            lineHeight: 1.6,
          }}>
            Four core specializations engineered for discerning residential and corporate clients across Nigeria.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {CATEGORIES.map((cat, i) => {
            const anim = cardAnims[i];
            return (
              <article
                key={cat.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(24, 24, 27, 0.08)',
                  transform: `scale(${anim.scale})`,
                  opacity: anim.opacity,
                  transformOrigin: 'center',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${interpolate(badgeProgress, [0, 1], [1, 1.05])})`,
                      transition: 'transform 0.3s ease-out',
                    }}
                  />
                  {/* Overlay with feature badges - appears on "hover" simulation */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(24,24,27,0.8), transparent)',
                    opacity: badgeProgress,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '24px',
                  }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {cat.features.map((feat, fi) => (
                        <span
                          key={feat}
                          style={{
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#fff',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '9999px',
                            opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
                            transform: `translateY(${interpolate(badgeProgress, [0, 1], [10, 0])}px)`,
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '22px',
                    fontWeight: 500,
                    color: DEEP_ZINC,
                    marginBottom: '12px',
                  }}>
                    {cat.shortName}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: 'rgba(24, 24, 27, 0.6)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {cat.name === 'Day & Night Blinds' ? 'Dual-layer fabric systems for adjustable light filtering and modern elegance.' :
                     cat.name === 'Blackout Roller Blinds' ? 'Heavy-duty light-blocking systems perfect for bedrooms and corporate conference rooms.' :
                     'Classic 25mm to 50mm horizontal slat systems optimized for executive spaces.'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '6px 14px',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: DEEP_ZINC,
                      backgroundColor: '#F5F5F4',
                      border: '1px solid #E7E5E4',
                    }}>
                      Custom Quote
                    </span>
                    <span style={{ fontSize: '14px', color: 'rgba(24,24,27,0.5)' }}>per window</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: CONSULTATION MODAL (390-539) ============

const FORM_FIELDS = [
  { name: 'name', label: 'Full Name', placeholder: 'John Smith' },
  { name: 'email', label: 'Email', placeholder: 'john@example.com' },
  { name: 'phone', label: 'Phone', placeholder: '(503) 555-0187' },
  { name: 'projectType', label: 'Project Type', placeholder: 'Select project type', isSelect: true },
  { name: 'address', label: 'Installation Address', placeholder: '123 Main Street, City, State ZIP', isTextarea: true },
  { name: 'preferredDate', label: 'Preferred Date', isDate: true },
];

const ModalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const localFrame = frame - SCENE_3_START;
  
  // Modal slide up entrance
  const modalAnim = useSpringSlideUp(localFrame, 0, 60, SPRING_MODAL);
  
  // Form fields stagger in (6 fields, 3 frame gaps = ~100ms each)
  const fieldAnims = FORM_FIELDS.map((_, i) =>
    useSpringEnter(localFrame, staggerFrames(i, 20, 3), SPRING_DELICATE)
  );
  
  // Free Site Survey card (appears after fields)
  const surveyCardAnim = useSpringSlideUp(localFrame, 50, 30, SPRING_DELICATE);
  
  // CTA button glow - use spring on local frame
  const ctaSpring = spring({
    frame: Math.max(0, localFrame - 70),
    fps: FPS,
    config: SPRING_DELICATE,
    from: 0,
    to: 1,
  });
  const ctaGlow = interpolate(ctaSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: TRAVERTINE_LINEN, color: DEEP_ZINC, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'rgba(247, 245, 240, 0.98)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${MUTED_BRASS}40`,
          borderRadius: '24px',
          padding: '40px',
          transform: `translateY(${modalAnim.translateY}px)`,
          opacity: modalAnim.opacity,
          transformOrigin: 'center bottom',
        }}
      >
        {/* Header */}
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(28px, 4vw, 36px)',
          fontWeight: 700,
          textAlign: 'center',
          color: DEEP_ZINC,
          marginBottom: '32px',
        }}>
          Get a Free Site Survey
        </h2>
        
        {/* Form Fields */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {FORM_FIELDS.map((field, i) => {
            const anim = fieldAnims[i];
            return (
              <div key={field.name} style={{ opacity: anim.opacity, transform: `scale(${anim.scale})` }}>
                <label style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(24, 24, 27, 0.7)',
                  marginBottom: '8px',
                }}>
                  {field.label}
                </label>
                {field.isSelect ? (
                  <select style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: DEEP_ZINC,
                    color: TRAVERTINE_LINEN,
                    border: `1px solid rgba(179, 143, 91, 0.3)`,
                    borderRadius: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                  }}>
                    <option value="">Select project type</option>
                    <option value="survey-abuja-free">On-Site Survey (Abuja Municipal - Free)</option>
                    <option value="survey-interstate-rebated">Interstate / Outskirts Survey (100% Rebated on Order)</option>
                    <option value="b2b-tender">Commercial / B2B Tender</option>
                  </select>
                ) : field.isTextarea ? (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      backgroundColor: DEEP_ZINC,
                      color: TRAVERTINE_LINEN,
                      border: `1px solid rgba(179, 143, 91, 0.3)`,
                      borderRadius: '10px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      resize: 'none',
                    }}
                  />
                ) : field.isDate ? (
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      backgroundColor: DEEP_ZINC,
                      color: TRAVERTINE_LINEN,
                      border: `1px solid rgba(179, 143, 91, 0.3)`,
                      borderRadius: '10px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                    }}
                  />
                ) : (
                  <input
                    type={field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      backgroundColor: DEEP_ZINC,
                      color: TRAVERTINE_LINEN,
                      border: `1px solid rgba(179, 143, 91, 0.3)`,
                      borderRadius: '10px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                    }}
                  />
                )}
              </div>
            );
          })}
          
          {/* Free Site Survey floating card */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: MUTED_BRASS,
              borderRadius: '16px',
              textAlign: 'center',
              fontFamily: "'Cinzel', serif",
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: DEEP_ZINC,
              opacity: surveyCardAnim.opacity,
              transform: `translateY(${surveyCardAnim.translateY}px)`,
              transformOrigin: 'center bottom',
            }}
          >
            Free Site Survey
          </div>
          
          {/* CTA Button */}
          <button
            style={{
              padding: '18px 32px',
              backgroundColor: MUTED_BRASS,
              color: DEEP_ZINC,
              fontFamily: "'Cinzel', serif",
              fontSize: '16px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: `0 0 ${interpolate(ctaGlow, [0, 1], [0, 20])}px ${interpolate(ctaGlow, [0, 1], [0, 8])}px rgba(179, 143, 91, ${interpolate(ctaGlow, [0, 1], [0, 0.4])})`,
              transform: `scale(${interpolate(ctaGlow, [0, 1], [1, 1.02])})`,
            }}
          >
            Schedule Consultation
          </button>
        </form>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: OUTRO / PUNCHLINE (540-599) ============

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - SCENE_4_START;
  
  // Logo reveal
  const logoAnim = useSpringEnter(localFrame, 0, SPRING_DELICATE);
  
  // Tagline fade in (follows logo by ~10 frames = 333ms)
  const taglineAnim = useSpringEnter(localFrame, 10, SPRING_DELICATE);

  return (
    <AbsoluteFill style={{ backgroundColor: DEEP_ZINC, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', textAlign: 'center' }}>
      <div style={{ maxWidth: '700px' }}>
        {/* Logo - Muted Brass rectangle as placeholder */}
        <div
          style={{
            width: '180px',
            height: '56px',
            backgroundColor: MUTED_BRASS,
            borderRadius: '12px',
            margin: '0 auto 24px',
            opacity: logoAnim.opacity,
            transform: `scale(${logoAnim.scale})`,
            transformOrigin: 'center',
          }}
        />
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: TRAVERTINE_LINEN,
            opacity: taglineAnim.opacity,
            transform: `scale(${taglineAnim.scale})`,
            transformOrigin: 'center',
          }}
        >
          Custom-fabricated to the millimeter. 5-Year Guarantee.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN SEQUENCE ============

export const PromoSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DEEP_ZINC, color: TRAVERTINE_LINEN }}>
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_DURATION}>
        <HeroScene />
      </Sequence>
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
        <SolutionsScene />
      </Sequence>
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
        <ModalScene />
      </Sequence>
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_DURATION}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export { DURATION_FRAMES, FPS };