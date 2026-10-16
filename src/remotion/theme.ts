import { spring, interpolate } from 'remotion';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

export const { fontFamily: playfair } = loadPlayfair();
export const { fontFamily: inter } = loadInter();

// ── Design tokens, pulled verbatim from tailwind.config.ts / globals.css ──
export const stone = {
  50: '#FAFAF9',
  100: '#F5F5F4',
  200: '#E7E5E4',
  300: '#D6D3D1',
  400: '#A8A29E',
  500: '#78716C',
  600: '#57534E',
  700: '#44403C',
  800: '#292524',
  900: '#1C1917',
};
export const brass = '#B38F5B';

// ── Motion helpers: spring-driven fade + rise / pop, GPU-safe (transform/opacity only) ──
export const useRise = (localFrame: number, fps: number, delay = 0, distance = 28) => {
  const s = spring({ frame: localFrame - delay, fps, config: { damping: 18, stiffness: 140, mass: 0.9 } });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
  };
};

export const usePop = (localFrame: number, fps: number, delay = 0) => {
  const s = spring({ frame: localFrame - delay, fps, config: { damping: 14, stiffness: 170, mass: 0.8 } });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `scale(${interpolate(s, [0, 1], [0.92, 1])})`,
  };
};
