import { InteractionPattern } from './synapseTypes';

export class InteractionPatternAnalyzer {
  private history: string[] = [];
  private patterns: InteractionPattern[] = [];

  public recordAction(action: string) {
    this.history.push(action);
    if (this.history.length > 50) this.history.shift();
    
    // Simulate pattern detection logic
    const sequence = this.history.slice(-3);
    if (sequence.length === 3) {
        this.patterns.push({
            trigger: sequence[0],
            sequence: sequence.slice(1),
            frequency: 1
        });
    }
  }

  public getLikelySequence(trigger: string): string[] {
    const pattern = this.patterns.find(p => p.trigger === trigger);
    return pattern ? pattern.sequence : [];
  }
}
