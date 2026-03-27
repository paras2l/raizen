import { maestroLogger } from './maestroLogger';
import { maestroConfig } from './maestroConfig';
import { BrainStateProfile, MusicStyle } from './maestroTypes';

export class NeuralMusicAnalyzer {
  analyzeBrainState(profile: BrainStateProfile): MusicStyle {
    maestroLogger.log(`Analyzing Neural Aura [A:${profile.alpha} B:${profile.beta} G:${profile.gamma}]...`);

    const { brainStateMapping } = maestroConfig;

    // 1. Epic-Triumph (High Gamma + High Aura)
    if (profile.gamma >= brainStateMapping['Epic-Triumph'].gammaMin! && 
        profile.auraIntensity >= brainStateMapping['Epic-Triumph'].auraMin!) {
      return 'Epic-Triumph';
    }

    // 2. Pulsing-Alert (High Beta)
    if (profile.beta >= brainStateMapping['Pulsing-Alert'].betaMin!) {
      return 'Pulsing-Alert';
    }

    // 3. Ambient-Focus (High Alpha + Low Beta)
    if (profile.alpha >= brainStateMapping['Ambient-Focus'].alphaMin! && 
        profile.beta <= brainStateMapping['Ambient-Focus'].betaMax!) {
      return 'Ambient-Focus';
    }

    // Default to Harmonic-Flow or Config Default
    return 'Harmonic-Flow';
  }

  calculateComplexity(profile: BrainStateProfile): number {
    // Complexity scales with Gamma and Alpha synergy
    return (profile.gamma * 0.7) + (profile.alpha * 0.3);
  }
}

export const neuralMusicAnalyzer = new NeuralMusicAnalyzer();
