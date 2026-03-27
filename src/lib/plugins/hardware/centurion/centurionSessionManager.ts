import { ControllableDevice } from './centurionTypes';
import { centurionLogger } from './centurionLogger';

export class CenturionSessionManager {
  private activeDevices: Map<string, ControllableDevice> = new Map();

  startSession() {
    centurionLogger.log('Physical sovereignty session active.');
  }

  logDevice(device: ControllableDevice) {
    this.activeDevices.set(device.id, device);
    centurionLogger.log(`Asset ${device.id} logged in current session range. Status: ${device.status}.`);
  }

  getDevice(id: string): ControllableDevice | undefined {
    return this.activeDevices.get(id);
  }
}
