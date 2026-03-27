export const shieldConfig = {
  detectionSensitivity: 0.85,
  advisoryMode: 'Whisper' as 'Whisper' | 'Silent' | 'Alert',
  analysisWindowMs: 5000,
  autoNeutralize: false,
  threatWeights: {
    gaslighting: 1.2,
    coercion: 1.5,
    deception: 1.0,
  },
};
