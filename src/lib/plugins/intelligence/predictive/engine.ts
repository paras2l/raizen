import { ContextSignal, AnticipatedNeed, PredictionType } from './types';

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
        predictions.push({
          id: `pred_${Date.now()}_${topic}`,
          type,
          title: `Anticipated: ${signals[0].topic}`,
          confidence: maxPriority,
          signals: signals.map(s => s.id),
          reasons: [`Linked to relevant ${signals[0].source} activity.`]
        });
      }
    });

    return predictions;
  }

  private determineType(signals: ContextSignal[]): PredictionType {
    const source = signals[0].source;
    if (source === 'calendar') return 'meeting_brief';
    if (source === 'email') return 'email_draft';
    if (source === 'file') return 'research';
    return 'task_suggestion';
  }
}
