export const directorConfig = {
  profiles: {
    'noir': { resolution: '4K', fps: 24, style: 'monochrome' },
    'epic': { resolution: '8K', fps: 60, style: 'cinematic-widescreen' },
    'sci-fi': { resolution: '4K', fps: 30, style: 'neon-gradient' },
    'blueprint': { resolution: '1080p', fps: 15, style: 'technical' },
  },
  maxSceneDuration: 300, // 5 minutes
  audioFidelity: '96kHz',
  renderEndpoints: [
    'https://render.director.ai/v1',
    'https://compute.sovereign.mesh',
  ],
};
