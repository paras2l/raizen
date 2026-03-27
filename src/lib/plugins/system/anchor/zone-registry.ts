import { SafeZone } from './types';

export class SafeZoneRegistry {
  private zones: SafeZone[] = [];

  registerZone(zone: SafeZone) {
    this.zones.push(zone);
    console.log(`[ANCHOR-REG] Registered safe zone: ${zone.name} (${zone.radiusMeters}m radius)`);
  }

  getZones(): SafeZone[] {
    return this.zones;
  }
}
