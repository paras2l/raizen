import { EMSignature } from './auraTypes';
import { auraLogger } from './auraLogger';
import { auraConfig } from './auraConfig';

export class AlertManager {
  checkThreats(signatures: EMSignature[]) {
    for (const sig of signatures) {
      if (sig.confidence >= auraConfig.alertThreshold) {
        if (sig.category === 'Camera' || sig.category === 'Microphone' || sig.category === 'GPS Tracker') {
          auraLogger.alert(`CRITICAL: Hidden ${sig.category} detected at coordinates [${sig.coordinates.x}, ${sig.coordinates.y}, ${sig.coordinates.z}]`);
        }
      }
    }
  }
}
