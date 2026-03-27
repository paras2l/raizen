import { RiskScore, IntentClassification, ManipulativeSignal } from './types';

export class RiskScoringSystem {
  calculateScore(intent: IntentClassification, signals: ManipulativeSignal[]): RiskScore {
    console.log('[NEURAL-FIREWALL] Aggregating signals into threat score...');
    let score = intent.intent === 'exploitation' ? 0.8 : 0.1;
    score += signals.length * 0.2;
    score = Math.min(score, 1.0);

    return {
      score,
      level: score > 0.7 ? 'high' : 'low',
      indicators: signals.map(s => s.type)
    };
  }
}
