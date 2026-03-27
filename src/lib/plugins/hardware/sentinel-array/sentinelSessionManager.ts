import { PerimeterStatus, SecurityEvent } from './sentinelTypes';
import { sentinelLogger } from './sentinelLogger';

export class SentinelSessionManager {
  private currentStatus: PerimeterStatus = 'SECURE';
  private events: SecurityEvent[] = [];

  public updateStatus(status: PerimeterStatus) {
    this.currentStatus = status;
    sentinelLogger.log(`System Status Transition: ${status}`);
  }

  public logEvent(event: SecurityEvent) {
    this.events.push(event);
  }

  public getStatus(): PerimeterStatus {
    return this.currentStatus;
  }

  public getRecentEvents() {
    return this.events.slice(-5);
  }
}
