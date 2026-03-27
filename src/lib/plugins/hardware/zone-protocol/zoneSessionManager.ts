import { AudioZone, AudioZoneMode } from './zoneTypes';
import { zoneLogger } from './zoneLogger';

export class ZoneSessionManager {
  private activeZones: Map<string, AudioZone> = new Map();

  public createZone(name: string, mode: AudioZoneMode, x: number, y: number, z: number): AudioZone {
    const zone: AudioZone = {
        id: `ZONE_${Date.now()}`,
        name,
        mode,
        coordinates: { x, y, z },
        radius: 1.5,
        activeSignals: []
    };

    this.activeZones.set(zone.id, zone);
    zoneLogger.log(`New Audio Zone established: ${name} [Mode: ${mode}]`);
    return zone;
  }

  public listActiveZones(): AudioZone[] {
    return Array.from(this.activeZones.values());
  }

  public closeAll() {
    this.activeZones.clear();
    zoneLogger.log('All spatial audio zones terminated. Room acoustics normalized.');
  }
}
