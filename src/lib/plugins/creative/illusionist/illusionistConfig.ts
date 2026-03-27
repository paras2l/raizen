export const illusionistConfig = {
  renderTargets: {
    'real-time': { latency: 16, quality: 'high' },
    'cinematic': { latency: 100, quality: 'ultra' },
    'fantasy': { latency: 33, quality: 'epic' },
  },
  capturePresets: {
    'primary-vision': { source: 'vision-link', res: '4K' },
    'aux-feed': { source: 'drone-mesh', res: '1080p' },
  },
  synthesisEndpoints: [
    'https://reality.illusionist.ai/v1',
    'https://visual.sovereign.mesh',
  ],
};
