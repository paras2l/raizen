import { WorkflowStep, WorkflowPattern } from './types';

export class PatternAnalyzer {
  private patterns: Map<string, WorkflowPattern> = new Map();

  analyze(history: WorkflowStep[]): WorkflowPattern[] {
    if (history.length < 3) return [];
    
    console.log('[MITOSIS-ANALYSER] Scanning history for behavioral patterns...');
    
    // Simple 3-step sequence detection
    for (let i = 0; i <= history.length - 3; i++) {
      const sequence = history.slice(i, i + 3).map(s => s.actionId).join('->');
      const existing = this.patterns.get(sequence);
      
      if (existing) {
        existing.frequency++;
        existing.lastDetected = new Date().toISOString();
      } else {
        this.patterns.set(sequence, {
          id: `pattern_${Math.random().toString(36).substr(2, 9)}`,
          steps: history.slice(i, i + 3).map(s => s.actionId),
          frequency: 1,
          category: 'general',
          lastDetected: new Date().toISOString()
        });
      }
    }

    return Array.from(this.patterns.values()).filter(p => p.frequency >= 3);
  }
}
