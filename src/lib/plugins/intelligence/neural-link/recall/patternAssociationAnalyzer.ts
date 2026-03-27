import { ExperienceEntry, AssociationLink } from './memoryTypes';
import { MemoryRecallConfig } from './memoryConfig';

export class PatternAssociationAnalyzer {
  public analyze(entries: ExperienceEntry[]): AssociationLink[] {
    const associations: AssociationLink[] = [];
    
    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            const a = entries[i];
            const b = entries[j];
            
            let strength = 0;
            if (a.metadata.topic && a.metadata.topic === b.metadata.topic) strength += 0.4;
            if (a.type === 'WEB' && b.type === 'NOTE') strength += 0.2; // Common flow
            
            if (strength > MemoryRecallConfig.ANALYSIS.MIN_ASSOCIATION_STRENGTH) {
                associations.push({
                    sourceId: a.id,
                    targetId: b.id,
                    strength,
                    commonality: a.metadata.topic || 'Implicit Connection'
                });
            }
        }
    }
    
    return associations;
  }
}
