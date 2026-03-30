import { ContextSignal, AnticipatedNeed, PredictionType, OracleSet, OracleSolution } from './types';

export class PredictionEngine {
  private threshold: number;

  constructor(threshold: number) {
    this.threshold = threshold;
  }

  generatePredictions(clusters: Record<string, ContextSignal[]>): AnticipatedNeed[] {
    const predictions: AnticipatedNeed[] = [];

    Object.entries(clusters).forEach(([topic, signals]) => {
      const maxPriority = Math.max(...signals.map(s => s.priority));
      
      if (maxPriority >= this.threshold) {
        const type = this.determineType(signals);
        const oracleSet = this.precomputeOracleSet(topic, type, signals);

        predictions.push({
          id: `pred_${Date.now()}_${topic}`,
          type,
          title: `Anticipated: ${signals[0].topic}`,
          confidence: maxPriority,
          signals: signals.map(s => s.id),
          reasons: [`Linked to relevant ${signals[0].source} activity.`],
          oracleSet
        });
      }
    });

    return predictions;
  }

  private precomputeOracleSet(topic: string, type: PredictionType, signals: ContextSignal[]): OracleSet {
    const source = signals[0].source;
    
    // Primary Solution (Most optimal)
    const primary: OracleSolution = {
      id: `sol_pri_${Date.now()}`,
      label: 'Optimal Path',
      content: `Drafting complete ${type} for ${topic} based on ${source} context.`,
      confidence: 0.95,
      isOptimal: true
    };

    // Alternative 1 (Conservative)
    const alt1: OracleSolution = {
      id: `sol_alt1_${Date.now()}`,
      label: 'Concise Summary',
      content: `High-level briefing of ${topic} with key bullet points.`,
      confidence: 0.85,
      isOptimal: false
    };

    // Alternative 2 (Comprehensive)
    const alt2: OracleSolution = {
      id: `sol_alt2_${Date.now()}`,
      label: 'Deep Research',
      content: `Exhaustive analysis including historical ${source} signals and related links.`,
      confidence: 0.75,
      isOptimal: false
    };

    return {
      primary,
      alternatives: [alt1, alt2],
      risk: 'NORMAL' // Initial default, refined by Arbiter in Service layer
    };
  }

  private determineType(signals: ContextSignal[]): PredictionType {
    const source = signals[0].source;
    if (source === 'calendar') return 'meeting_brief';
    if (source === 'email') return 'email_draft';
    if (source === 'file') return 'research';
    return 'task_suggestion';
  }
}
