import { MaturityScore, KnowledgeTopic } from './types';

export class KnowledgeEvaluator {
  private topics: Map<string, KnowledgeTopic> = new Map();
  private docCount: number = 0;
  private memoryThreshold: number;

  constructor(threshold: number) {
    this.memoryThreshold = threshold;
  }

  recordObservation(topicLabels: string[], sourceIsDoc: boolean) {
    if (sourceIsDoc) this.docCount++;
    
    topicLabels.forEach(label => {
      const existing = this.topics.get(label);
      if (existing) {
        existing.hitCount++;
        existing.lastEncountered = new Date().toISOString();
      } else {
        this.topics.set(label, {
          label,
          confidence: 0.8,
          lastEncountered: new Date().toISOString(),
          hitCount: 1
        });
      }
    });
  }

  calculateMaturity(totalMemories: number): MaturityScore {
    const ratio = Math.min(totalMemories / this.memoryThreshold, 1.0);
    
    return {
      totalMemories,
      topicsLearned: this.topics.size,
      documentsIndexed: this.docCount,
      knowledgeRatio: ratio
    };
  }

  isParoReady(score: MaturityScore): boolean {
    return score.knowledgeRatio >= 1.0;
  }
}
