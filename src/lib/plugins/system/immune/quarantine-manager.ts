import { QuarantineRecord } from './types';

export class QuarantineManager {
  private records: Map<string, QuarantineRecord> = new Map();

  quarantine(moduleId: string, reason: string) {
    console.log(`[IMMUNE-QUARANTINE] Isolating module ${moduleId} due to: ${reason}`);
    this.records.set(moduleId, {
      moduleId,
      reason,
      timestamp: new Date().toISOString(),
      status: 'isolated'
    });
  }

  getRecords(): QuarantineRecord[] {
    return Array.from(this.records.values());
  }
}
