import { GeoPoint } from './types';

export class LocationMonitor {
  async getCurrentPosition(): Promise<GeoPoint> {
    console.log('[ANCHOR-GPS] Sampling GPS/Wi-Fi/IP location signal...');
    return { lat: 0, lng: 0 }; // Mock origin
  }
}
