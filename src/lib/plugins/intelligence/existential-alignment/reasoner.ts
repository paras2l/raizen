import { AlignmentResult } from './types';

export class MoralReasoner {
  explain(result: AlignmentResult): string {
    const base = `Decision Alignment: ${(result.score * 100).toFixed(1)}%.\n\n`;
    const guidance = `Recommendation: ${result.recommendation}.\n\n`;
    const rationale = `Rationale:\n- ${result.reasoning.join('\n- ')}`;
    
    const warning = result.conflicts.length > 0 
      ? `\n\n⚠️ CAUTION: This path conflicts with your high preference for: ${result.conflicts.join(', ')}.`
      : '';

    return base + guidance + rationale + warning;
  }
}
