import { EthicalProfile, MoralDilemma, AlignmentResult, EthicalValue } from './types';

export class EthicsEngine {
  evaluate(dilemma: MoralDilemma, profile: EthicalProfile): AlignmentResult {
    console.log(`[SOUL-ENGINE] Evaluating ethical dilemma: ${dilemma.category}`);

    // Simple weighted calculation for the best aligned option
    let bestOption = dilemma.options[0];
    let maxScore = -Infinity;
    const conflicts: EthicalValue[] = [];

    dilemma.options.forEach(option => {
      let currentScore = 0;
      Object.entries(option.impact).forEach(([val, impact]) => {
        const valueKey = val as EthicalValue;
        const profileValue = profile.values[valueKey];
        if (profileValue) {
          currentScore += impact * profileValue.score * profileValue.weight;
          if (impact < 0 && profileValue.score > 0.8) {
            conflicts.push(valueKey);
          }
        }
      });

      if (currentScore > maxScore) {
        maxScore = currentScore;
        bestOption = option;
      }
    });

    const finalScore = Math.max(0, Math.min(1, (maxScore + 5) / 10)); // Normalized

    return {
      isAligned: finalScore > 0.7,
      score: finalScore,
      recommendation: bestOption.label,
      reasoning: [
        `Option '${bestOption.label}' aligns most closely with your priority for ${profile.values.privacy.score > 0.8 ? 'Privacy' : 'Integrity'}.`,
        `Alternative paths carry higher risks to your established values.`
      ],
      conflicts: Array.from(new Set(conflicts))
    };
  }
}
