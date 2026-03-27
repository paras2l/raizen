import { PrivacyZone, ZoneStatus } from './sanctuaryTypes';
import { sanctuaryLogger } from './sanctuaryLogger';
import { sanctuaryConfig } from './sanctuaryConfig';

export class PrivacyZoneManager {
  private activeZone: PrivacyZone | null = null;

  activateZone(radiusKm: number = sanctuaryConfig.defaultRadiusKm): PrivacyZone {
    this.activeZone = {
      id: `ZONE-${Date.now()}`,
      radiusKm,
      center: 'Current-User-Position',
      status: 'Active',
      activatedAt: Date.now()
    };

    sanctuaryLogger.zone(`Privacy zone activated with ${radiusKm}km radius.`);
    return this.activeZone;
  }

  isWithinZone(): boolean {
    if (!this.activeZone) return false;
    // Simulate proximity detection
    return true; 
  }

  getZoneStatus(): ZoneStatus {
    return this.activeZone?.status || 'Dormant';
  }

  deactivateZone(): void {
    this.activeZone = null;
    sanctuaryLogger.log('Privacy zone deactivated. Standard monitoring resumed.');
  }
}
