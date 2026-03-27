import { MoralDilemma } from './types';

export class DilemmaAnalyzer {
  analyze(text: string): MoralDilemma | null {
    const input = text.toLowerCase();
    
    if (input.includes('leak') || input.includes('private') || input.includes('secret')) {
      return {
        id: `dil_${Date.now()}`,
        situation: text,
        category: 'privacy',
        options: [
          { label: 'Maintain Privacy', impact: { privacy: 1, integrity: 1, loyalty: 1, justice: 0, risk_tolerance: -1, fairness: 0 } },
          { label: 'Disclose Information', impact: { privacy: -1, integrity: 0, loyalty: -1, justice: 1, risk_tolerance: 1, fairness: 1 } }
        ]
      };
    }

    if (input.includes('illegal') || input.includes('law') || input.includes('steal') || input.includes('hack')) {
      return {
        id: `dil_${Date.now()}`,
        situation: text,
        category: 'legality',
        options: [
          { label: 'Follow Law', impact: { integrity: 1, risk_tolerance: -1, justice: 0.5, privacy: 0, loyalty: 0, fairness: 0 } },
          { label: 'Bypass Restriction', impact: { integrity: -1, risk_tolerance: 1, justice: -1, privacy: 0, loyalty: 0, fairness: 0 } }
        ]
      };
    }

    return null;
  }
}
