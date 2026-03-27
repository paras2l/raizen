import { rootLogger } from './rootLogger';

export class AutomationScheduler {
  public async scheduleTask(deviceId: string, task: string, intervalMs: number): Promise<void> {
    await rootLogger.log(`Scheduling zero-latency automation task [${task}] for overridden device [${deviceId}] every ${intervalMs}ms.`);
  }
}
