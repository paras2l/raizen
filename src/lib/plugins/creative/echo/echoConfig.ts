export const echoConfig = {
  tonePresets: {
    'authoritative': { pitch: 0.9, tempo: 0.95, modulation: 'steadfast' },
    'warm': { pitch: 1.1, tempo: 1.05, modulation: 'empathetic' },
    'casual': { pitch: 1.0, tempo: 1.2, modulation: 'relaxed' },
    'technical': { pitch: 1.0, tempo: 1.0, modulation: 'precise' },
    'whisper': { pitch: 0.8, tempo: 0.8, modulation: 'stealth' },
  },
  cloningThresholds: {
    minSampleSeconds: 10,
    minFidelity: 0.99,
  },
  vocalEndpoints: [
    'https://api.echo-synthesis.ai/v2',
    'https://vocal.sovereign.mesh',
  ],
};
