import { ManipulationEvent, BehavioralVector } from './shieldTypes';
import { shieldLogger } from './shieldLogger';
import { shieldConfig } from './shieldConfig';

export class ManipulationDetector {
  detectManipulation(vectors: BehavioralVector[]): ManipulationEvent | null {
    shieldLogger.log('Analyzing behavioral vectors for psychological influence patterns...');
    
    const combinedConfidence = vectors.reduce((acc, v) => acc + (v.toneShift > 0.3 ? 0.4 : 0.1), 0);
    
    if (combinedConfidence >= shieldConfig.detectionSensitivity) {
      const event: ManipulationEvent = {
        id: `THREAT-${Date.now()}`,
        type: 'Gaslighting',
        confidence: combinedConfidence,
        targets: ['User'],
        vectors,
        timestamp: Date.now(),
      };
      shieldLogger.threat(`${event.type} detected with ${Math.round(event.confidence * 100)}% confidence.`);
      return event;
    }

    return null;
  }
}
