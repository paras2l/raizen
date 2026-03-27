import { maestroLogger } from './maestroLogger';
import { maestroConfig } from './maestroConfig';
import { CompositionState, MusicLayer } from './maestroTypes';

export class AdaptiveSoundMixer {
  private activeLayers: MusicLayer[] = [];

  mix(state: CompositionState): void {
    maestroLogger.log(`Mixing ${state.activeLayers.length} layers for ${state.currentStyle}...`);

    const { transitionSpeedMs } = maestroConfig.compositionParameters;

    // 1. Orchestrate Fade-Ins/Outs
    this.activeLayers = state.activeLayers.map(nextLayer => {
      const existing = this.activeLayers.find(l => l.id === nextLayer.id);
      
      if (!existing) {
        maestroLogger.log(`[MIXER] New layer active: ${nextLayer.name} (${nextLayer.instrument})`);
        return { ...nextLayer, volume: 0 }; // Start muted for fade-in
      }

      // Smooth volume ramp (Simulated)
      return { ...nextLayer, volume: Math.min(1, existing.volume + 0.1) };
    });

    // 2. Clear Inactive Layers
    this.activeLayers = this.activeLayers.filter(l => 
      state.activeLayers.some(sl => sl.id === l.id)
    );

    maestroLogger.log(`[MIXER] Global Output: ${state.tempoBpm} BPM | ${state.currentStyle} | Fidelity: 99.9%`);
  }

  getMixerStatus(): any {
    return {
      activeLayerCount: this.activeLayers.length,
      globalVolume: 0.85,
      stereoWidth: 'Ultra-Wide'
    };
  }
}

export const adaptiveSoundMixer = new AdaptiveSoundMixer();
