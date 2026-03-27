import { ZoneAuditEvent } from './sanctuaryTypes';
import { sanctuaryLogger } from './sanctuaryLogger';

export class ZoneAuditLogger {
  private ledger: ZoneAuditEvent[] = [];

  logEvent(zoneId: string, action: ZoneAuditEvent['action'], details: string): void {
    const event: ZoneAuditEvent = {
      id: `AUDIT-${Date.now()}`,
      zoneId,
      action,
      details,
      timestamp: Date.now()
    };
    
    this.ledger.push(event);
    sanctuaryLogger.audit(`${action}: ${details}`);
    
    if (action === 'Breach-Attempt') {
      sanctuaryLogger.alert(`Unauthorized privacy breach attempt detected in zone ${zoneId}`);
    }
  }

  getLedger(): ZoneAuditEvent[] {
    return [...this.ledger];
  }
}
