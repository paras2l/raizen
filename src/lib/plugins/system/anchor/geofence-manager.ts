import { GeoPoint, SafeZone } from './types';

export class GeofenceManager {
  isInsideZone(pos: GeoPoint, zone: SafeZone): boolean {
    const distance = this.calculateDistance(pos, zone.center);
    return distance <= zone.radiusMeters;
  }

  private calculateDistance(p1: GeoPoint, p2: GeoPoint): number {
    // Simple mock haversine/planar distance
    return 0;
  }
}
