import { ContextType } from './types';

export class ContextDetector {
  detect(input: string): { type: ContextType; subject: string; confidence: number } {
    console.log(`[CONTEXT-DETECTOR] Analyzing input for semantic markers...`);
    
    const text = input.toLowerCase();
    
    if (text.includes('quantum') || text.includes('physics') || text.includes('computing')) {
      return { type: 'topic', subject: 'Quantum Computing', confidence: 0.95 };
    }
    
    if (text.includes('budget') || text.includes('financial') || text.includes('spreadsheet')) {
      return { type: 'mission', subject: 'Financial Planning', confidence: 0.88 };
    }

    if (text.includes('meeting') || text.includes('discussion') || text.includes('agenda')) {
      return { type: 'conversation', subject: 'Strategic Sync', confidence: 0.82 };
    }

    return { type: 'topic', subject: 'General Intelligence', confidence: 0.5 };
  }
}
