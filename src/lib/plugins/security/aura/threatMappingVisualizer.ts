import { ThreatMap, EMSignature } from './auraTypes';
import { auraLogger } from './auraLogger';

export class ThreatMappingVisualizer {
  generateMap(signatures: EMSignature[]): ThreatMap {
    auraLogger.log('Synthesizing 3D threat map from electronic signatures...');
    
    const hasCritical = signatures.some(s => s.category === 'Camera' || s.category === 'Microphone');
    const threatLevel = hasCritical ? 'CRITICAL' : signatures.length > 5 ? 'High' : 'Low';

    const map: ThreatMap = {
      timestamp: Date.now(),
      signals: signatures,
      threatLevel,
    };

    auraLogger.success(`Threat map generated. Environment Status: ${threatLevel}`);
    return map;
  }
}
