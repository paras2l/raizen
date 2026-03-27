import { MusicStyle } from './maestroTypes';

export const maestroConfig = {
  masterProfiles: {
    'da-vinci': { focus: 'anatomy-precision', medium: 'art' },
    'jobs': { focus: 'minimalist-elegance', medium: 'design' },
    'linus': { focus: 'kernel-optimization', medium: 'code' },
    'sagan': { focus: 'cosmic-wonder', medium: 'narrative' },
  },
  fidelityThreshold: 0.98,
  dnaAnalysisDepth: 'Deep-Neural',

  brainStateMapping: {
    'Ambient-Focus': { alphaMin: 0.6, betaMax: 0.4 },
    'Epic-Triumph': { gammaMin: 0.7, auraMin: 0.8 },
    'Harmonic-Flow': { alphaMin: 0.4, gammaMin: 0.3 },
    'Pulsing-Alert': { betaMin: 0.6 }
  },

  compositionParameters: {
    minBpm: 60,
    maxBpm: 180,
    transitionSpeedMs: 5000,
    maxLayers: 8,
    defaultStyle: 'Ambient-Focus' as MusicStyle
  }
};
