export class ConfidenceEvaluator {
  evaluate(userEdits: string, twinOutput: string): number {
    const editWeight = 1 - (userEdits.length / Math.max(twinOutput.length, 1));
    console.log(`[TWIN-EVALUATOR] Decision match score: ${editWeight.toFixed(2)}`);
    return Math.max(0, Math.min(1, editWeight));
  }
}
