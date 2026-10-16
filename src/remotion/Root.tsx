/*
 * Veechelz Window Blinds - Remotion Composition Root
 * 20-second portrait video ad (1080x1920, 30fps, 600 frames)
 * Source of truth: brag-plan.md storyboard
 */

import { registerRoot, Composition } from 'remotion';
import { PromoSequence } from './Promo';

registerRoot(() => (
  <Composition
    id="VeechelzAd"
    component={PromoSequence}
    durationInFrames={600}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{}}
  />
));