import { maestroLogger } from './maestroLogger';
import { maestroConfig } from './maestroConfig';
import { MusicStyle, CompositionState, MusicLayer } from './maestroTypes';

export class DynamicComposerEngine {
  private currentState: CompositionState = {
    currentStyle: maestroConfig.compositionParameters.defaultStyle,
    tempoBpm: 80,
    complexity: 0.5,
    activeLayers: [],
    lastUpdate: Date.now()
  };

  generateComposition(style: MusicStyle, complexity: number): CompositionState {
    maestroLogger.log(`Generating ${style} composition (Complexity: ${complexity.toFixed(2)})...`);

    const tempo = this.calculateTempo(style, complexity);
    const layers = this.selectLayers(style, complexity);

    this.currentState = {
      currentStyle: style,
      tempoBpm: tempo,
      complexity,
      activeLayers: layers,
      lastUpdate: Date.now()
    };

    return this.currentState;
  }

  private calculateTempo(style: MusicStyle, complexity: number): number {
    const { minBpm, maxBpm } = maestroConfig.compositionParameters;
    
    switch (style) {
      case 'Epic-Triumph': return Math.min(maxBpm, 120 + (complexity * 40));
      case 'Pulsing-Alert': return Math.min(maxBpm, 110 + (complexity * 50));
      case 'Ambient-Focus': return Math.max(minBpm, 60 + (complexity * 20));
      default: return 85;
    }
  }

  private selectLayers(style: MusicStyle, complexity: number): MusicLayer[] {
    const layers: MusicLayer[] = [
      { id: 'l1', name: 'Foundation', instrument: 'Sub-Pad', volume: 0.8, active: true }
    ];

    if (complexity > 0.3) {
      layers.push({ id: 'l2', name: 'Melodic-Lead', instrument: style === 'Epic-Triumph' ? 'Brass' : 'Piano', volume: 0.7, active: true });
    }

    if (complexity > 0.6 || style === 'Pulsing-Alert') {
      layers.push({ id: 'l3', name: 'Rhythm', instrument: 'Percussion', volume: 0.6, active: true });
    }

    return layers;
  }

  getCurrentState(): CompositionState {
    return this.currentState;
  }
}

export const dynamicComposerEngine = new DynamicComposerEngine();
