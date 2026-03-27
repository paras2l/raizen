import { SecurityEvent } from './types';

export class ActivityLedgerMonitor {
  async trackNetwork(peerId: string, payloadSize: number) {
    console.log(`[GUARDIAN-MONITOR] Tracking network activity for peer ${peerId}: ${payloadSize} bytes.`);
  }

  async trackProcess(procName: string) {
    console.log(`[GUARDIAN-MONITOR] Monitoring process launch: ${procName}`);
  }

  logEvent(event: SecurityEvent) {
    console.log(`[GUARDIAN-LOG] ${event.outcome.toUpperCase()}: ${event.action} by ${event.moduleId}`);
  }
}
