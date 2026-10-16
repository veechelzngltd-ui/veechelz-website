import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from 'remotion';
import { playfair, inter, stone, brass, useRise, usePop } from './theme';

// ── Scene 1 — Hero Introduction (0–150 / 0–5s) ──────────────────────────
const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineScale = spring({ frame, fps, config: { damping: 20, stiffness: 90 } });
  const badge = useRise(frame, fps, 8, 18);
  const h1a = useRise(frame, fps, 20, 22);
  const h1b = useRise(frame, fps, 32, 22);
  const sub = useRise(frame, fps, 48, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: stone[900], justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: brass,
          opacity: 0.08,
          filter: 'blur(120px)',
        }}
      />

      <div style={{ maxWidth: 880, padding: '0 64px', textAlign: 'center' }}>
        <div style={{ height: 3, width: 160, background: brass, margin: '0 auto 36px', transformOrigin: 'center', transform: `scaleX(${interpolate(lineScale, [0, 1], [0, 1])})` }} />

        <div style={{ ...badge, display: 'inline-block' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '9px 20px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontFamily: inter,
              fontSize: 15,
              letterSpacing: 0.5,
              marginBottom: 34,
            }}
          >
            Established 2015 · Nigeria&apos;s Premier Window Treatment Specialists
          </span>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: 6 }}>
          <h1 style={{ ...h1a, fontFamily: playfair, fontWeight: 500, fontSize: 54, color: '#fff', margin: 0, letterSpacing: -0.5, lineHeight: 1.1 }}>
            Veechelz Window Blind
          </h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 30 }}>
          <h1 style={{ ...h1b, fontFamily: playfair, fontWeight: 300, fontSize: 54, color: '#fff', margin: 0, letterSpacing: -0.5, lineHeight: 1.1 }}>
            Bespoke Interior Finishing
          </h1>
        </div>

        <p style={{ ...sub, fontFamily: inter, fontSize: 19, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, maxWidth: 620, margin: '0 auto' }}>
          Precision-engineered interior solutions for luxury residential, corporate
          fit-outs, and B2B contract supply — across Nigeria.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2 — Solutions Stack Reveal (150–390 / 5–13s) ──────────────────
const categories = [
  { name: 'Day & Night Blinds', features: ['Dual-Layer System', 'Adjustable Privacy'] },
  { name: 'Blackout Roller Blinds', features: ['Total Light Block', 'Thermal Insulation'] },
  { name: 'Venetian & Wooden Blinds', features: ['25–50mm Slats', 'Cordless Safety'] },
];

const Card: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardDelay = 26 + index * 9;
  const card = useRise(frame, fps, cardDelay, 30);
  const chips = usePop(frame, fps, cardDelay + 14);

  return (
    <div
      style={{
        ...card,
        background: '#fff',
        borderRadius: 4,
        border: `1px solid ${stone[200]}`,
        boxShadow: '0 20px 45px rgba(28,25,23,0.06)',
        padding: 30,
        width: 760,
      }}
    >
      <h3 style={{ fontFamily: playfair, fontWeight: 500, fontSize: 26, color: stone[900], margin: '0 0 14px' }}>
        {categories[index].name}
      </h3>
      <div style={{ ...chips, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories[index].features.map((f) => (
          <span
            key={f}
            style={{
              fontFamily: inter,
              fontSize: 13,
              fontWeight: 500,
              color: stone[700],
              background: stone[100],
              border: `1px solid ${stone[200]}`,
              borderRadius: 999,
              padding: '6px 14px',
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
};

const SceneSolutions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const header = useRise(frame, fps, 0, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: stone[50], justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: 880, padding: '0 60px', textAlign: 'center' }}>
        <div style={header}>
          <span
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: 999,
              background: stone[100],
              color: stone[700],
              fontFamily: inter,
              fontSize: 14,
              letterSpacing: 0.5,
              marginBottom: 20,
            }}
          >
            Our Specializations
          </span>
          <h2 style={{ fontFamily: playfair, fontWeight: 500, fontSize: 40, color: stone[900], margin: '0 0 44px', letterSpacing: -0.5 }}>
            Premium Interior Collections
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center' }}>
          <Card index={0} />
          <Card index={1} />
          <Card index={2} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3 — Consultation Modal (390–540 / 13–18s) ─────────────────────
const fields = ['Full name', 'Email address', 'Phone number', 'Project type'];

const SceneModal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const modal = useRise(frame, fps, 0, 44);
  const floatCard = usePop(frame, fps, 66);
  const glow = spring({ frame: frame - 88, fps, config: { damping: 16, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: stone[100], justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 760 }}>
        {/* Floating "Free Site Survey" pill, now docked above the modal so it never clips off-canvas */}
        <div
          style={{
            ...floatCard,
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 10,
            background: stone[900],
            borderRadius: 6,
            padding: '16px 24px',
            marginBottom: 20,
            boxShadow: '0 24px 50px rgba(28,25,23,0.2)',
          }}
        >
          <span style={{ fontFamily: inter, fontSize: 11, letterSpacing: 1, color: brass }}>
            SITE SURVEYS FROM
          </span>
          <span style={{ fontFamily: playfair, fontSize: 26, fontWeight: 500, color: '#fff' }}>Free</span>
        </div>

        <div
          style={{
            ...modal,
            background: '#fff',
            borderRadius: 6,
            width: '100%',
            padding: 48,
            boxShadow: '0 30px 70px rgba(28,25,23,0.15)',
          }}
        >
          <h2 style={{ fontFamily: playfair, fontWeight: 500, fontSize: 30, color: stone[900], margin: '0 0 8px' }}>
            Schedule Your Site Survey
          </h2>
          <p style={{ fontFamily: inter, fontSize: 15, color: stone[500], margin: '0 0 28px' }}>
            Free consultation. In-home measure. No obligation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {fields.map((label, i) => {
              const f = useRise(frame, fps, 20 + i * 8, 12);
              return (
                <div key={label} style={f}>
                  <div style={{ fontFamily: inter, fontSize: 12, fontWeight: 500, color: stone[500], marginBottom: 5 }}>
                    {label}
                  </div>
                  <div
                    style={{
                      height: 44,
                      borderRadius: 3,
                      border: `1px solid ${stone[300]}`,
                      background: stone[50],
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 26,
              height: 50,
              borderRadius: 3,
              background: stone[900],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 ${interpolate(glow, [0, 1], [0, 26])}px ${brass}55`,
            }}
          >
            <span style={{ fontFamily: inter, fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: 0.5 }}>
              SCHEDULE SITE SURVEY
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Outro — Logo + Tagline (540–600 / 18–20s) ───────────────────────────
const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mark = usePop(frame, fps, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <div style={mark}>
        <Img src={staticFile('logo.svg')} style={{ height: 100 }} />
      </div>
    </AbsoluteFill>
  );
};

// ── Assembly ──────────────────────────────────────────────────────────
export const PromoPortrait: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={150} from={0}>
        <SceneHero />
      </Sequence>
      <Sequence durationInFrames={240} from={150}>
        <SceneSolutions />
      </Sequence>
      <Sequence durationInFrames={150} from={390}>
        <SceneModal />
      </Sequence>
      <Sequence durationInFrames={60} from={540}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
