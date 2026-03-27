import { AuditEvent, CommandRisk, AuthMethod } from './anchorTypes';
import { anchorLogger } from './anchorLogger';

export class AuditLogger {
  private ledger: AuditEvent[] = [];

  logAttempt(commandId: string, risk: CommandRisk, authorized: boolean, method?: AuthMethod): void {
    const event: AuditEvent = {
      id: `AUDIT-${Date.now()}`,
      commandId,
      risk,
      authorized,
      method,
      timestamp: Date.now()
    };
    
    this.ledger.push(event);
    anchorLogger.audit(`${authorized ? 'APPROVED' : 'BLOCKED'} ${commandId} (Method: ${method || 'None'})`);
    
    if (!authorized) {
      anchorLogger.alert(`Unauthorized attempt on critical command: ${commandId}`);
    }
  }

  getLedger(): AuditEvent[] {
    return [...this.ledger];
  }
}
