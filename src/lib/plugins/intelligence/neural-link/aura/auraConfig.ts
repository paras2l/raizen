import { VoiceTone, UIProfile, InteractionMode } from './auraTypes';

export const AuraConfig = {
  MODES: {
    DEEP_WORK: { threshold: 0.8, tone: 'TECHNICAL' as VoiceTone, density: 'HIGH' },
    EXPLORATION: { threshold: 0.5, tone: 'CASUAL' as VoiceTone, density: 'MEDIUM' },
    REST: { threshold: 0.2, tone: 'SUPPORTIVE' as VoiceTone, density: 'LOW' }
  },
  UI_PROFILES: {
    FOCUS: { palette: '#00ccff', animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)', density: 0.9 },
    CALM: { palette: '#77ddbb', animationEasing: 'ease-in-out', density: 0.5 }
  },
  TRANSITION_DELAY_MS: 3000
};
