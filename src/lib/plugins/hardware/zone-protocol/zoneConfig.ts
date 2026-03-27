import { AudioZoneMode } from './zoneTypes';

export const ZoneConfig = {
  MODES: {
    CONFIDENCE: { freq: 432, type: 'BINAURAL' },
    CALM_SHIELD: { freq: 7.83, type: 'SUBWAV' },
    NEGOTIATION_EDGE: { freq: 110, type: 'MONAURAL' },
    DEEP_FOCUS: { freq: 14, type: 'BINAURAL' }
  } as Record<AudioZoneMode, any>,
  SAMPLING_RATE: 96000, // Studio Quality
  BEAM_WIDTH: 0, // Laser-Precision (Atomic Point)
  PHASE_CANCELLATION_STRENGTH: 1.0, // Absolute Silence
  UNAUDIBLE_INFLUENCE_GAIN: 1.0, // Maximum Subtle Influence
  ZONE_VERSION: '4.0.0-PRO-MAX'
};
