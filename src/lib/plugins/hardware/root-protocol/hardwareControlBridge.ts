import { rootLogger } from './rootLogger';

export class HardwareControlBridge {
  public async sendCommand(deviceId: string, subsystem: string, command: string): Promise<void> {
    await rootLogger.log(`[ROOT] Bypassing factory software to send raw command to subsystem [${subsystem}] on [${deviceId}]: ${command}`);
  }
}
