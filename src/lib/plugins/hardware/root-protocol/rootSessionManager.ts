import { RootSession, OverrideDevice } from './rootTypes';
import { rootLogger } from './rootLogger';

export class RootSessionManager {
  private activeSessions: Map<string, RootSession> = new Map();
  private devices: Map<string, OverrideDevice> = new Map();

  public async trackSession(session: RootSession): Promise<void> {
    this.activeSessions.set(session.id, session);
    await rootLogger.log(`Root session [${session.id}] initiated for device [${session.deviceId}].`);
  }

  public getOverriddenDevices(): OverrideDevice[] {
    return Array.from(this.devices.values());
  }

  public registerDevice(device: OverrideDevice): void {
    this.devices.set(device.id, device);
  }
}
