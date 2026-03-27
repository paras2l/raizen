import { EMSignature, DeviceCategory } from './auraTypes';
import { auraLogger } from './auraLogger';

export class DeviceIdentifierEngine {
  private signatures = new Map<number, DeviceCategory>([
    [2400, 'Smartphone'],
    [5000, 'Router'],
    [900, 'Microphone'],
    [1200, 'GPS Tracker'],
    [450, 'Camera'],
  ]);

  identify(signature: EMSignature): EMSignature {
    auraLogger.log(`Analyzing signal pulse ${signature.id} (${signature.frequency} MHz)...`);
    
    const category = this.signatures.get(signature.frequency) || 'Unknown';
    const confidence = category === 'Unknown' ? 0.3 : 0.92;

    const refined: EMSignature = {
      ...signature,
      category,
      confidence,
    };

    if (refined.category === 'Camera' || refined.category === 'Microphone') {
      auraLogger.threat(`Identified potential surveillance device: ${refined.category} at [${refined.coordinates.x}, ${refined.coordinates.y}]`);
    }

    return refined;
  }
}
