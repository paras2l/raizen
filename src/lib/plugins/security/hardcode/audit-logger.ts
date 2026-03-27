import { AuditRecord } from './types';

export class OverrideAuditLogger {
  private ledger: AuditRecord[] = [];

  log(record: AuditRecord) {
    this.ledger.push(record);
    console.log(`[HARDCODE-AUDIT] [${record.authorityLevel}] ${record.action} -> ${record.status}`);
  }

  getHistory(): AuditRecord[] {
    return [...this.ledger];
  }
}
