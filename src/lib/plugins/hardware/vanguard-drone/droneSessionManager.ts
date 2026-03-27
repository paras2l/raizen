import { Drone, FlightPath } from './vanguardTypes';
import { vanguardLogger } from './vanguardLogger';

export class DroneSessionManager {
  private activeDrones: Map<string, Drone> = new Map();
  private missionHistory: FlightPath[] = [];

  public async trackDrone(drone: Drone): Promise<void> {
    this.activeDrones.set(drone.id, drone);
    if (drone.status === 'FLIGHT') {
        await vanguardLogger.log(`Drone [${drone.id}] in transit at Alt: ${drone.location.alt}m`);
    }
  }

  public getFleet(): Drone[] {
    return Array.from(this.activeDrones.values());
  }

  public reportMission(path: FlightPath): void {
    this.missionHistory.push(path);
  }
}
