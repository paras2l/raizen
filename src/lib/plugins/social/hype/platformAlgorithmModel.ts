import { AlgorithmFactor } from './hypeTypes';
import { hypeLogger } from './hypeLogger';

export class PlatformAlgorithmModel {
  getFactors(platform: string): AlgorithmFactor[] {
    hypeLogger.log(`Retrieving algorithmic ranking signals for ${platform}...`);
    
    const base = [
      { metric: 'Watch Time', weight: 0.4, description: 'Duration of viewer attention' },
      { metric: 'Share Frequency', weight: 0.3, description: 'Viral propagation potential' }
    ];

    if (platform === 'TikTok') {
      base.push({ metric: 'Re-watch Rate', weight: 0.3, description: 'Loopability score' });
    }

    return base;
  }
}
