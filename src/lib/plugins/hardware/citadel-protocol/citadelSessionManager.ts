import { GridStatus, NavigationRoute, UrbanEvent } from './citadelTypes';
import { citadelLogger } from './citadelLogger';

export class CitadelSessionManager {
  private status: GridStatus = {
    currentPosition: { lat: 34.0522, lng: -118.2437 },
    activeRisk: { score: 0, dominantThreat: null, timestamp: Date.now() },
    activeRoute: null
  };
  private alertHistory: UrbanEvent[] = [];

  public updatePosition(lat: number, lng: number) {
    this.status.currentPosition = { lat, lng };
  }

  public setRoute(route: NavigationRoute) {
    this.status.activeRoute = route;
  }

  public registerAlert(event: UrbanEvent) {
    this.alertHistory.push(event);
    citadelLogger.log(`Urban alert registered: ${event.type} @ ${event.description}`);
  }

  public getStatus(): GridStatus {
    return { ...this.status };
  }

  public getActiveAlerts(): UrbanEvent[] {
    return this.alertHistory.slice(-10);
  }
}
