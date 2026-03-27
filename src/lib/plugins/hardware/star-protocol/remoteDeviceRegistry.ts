import { RemoteDevice } from './starTypes';
import { starLogger } from './starLogger';

export class RemoteDeviceRegistry {
  private devices: Map<string, RemoteDevice> = new Map();

  public register(device: RemoteDevice) {
    this.devices.set(device.id, device);
    starLogger.log(`Remote asset indexed: ${device.alias} [${device.globalLocation}]`);
  }

  public getDevice(id: string): RemoteDevice | undefined {
    return this.devices.get(id);
  }

  public listDevices(): RemoteDevice[] {
    return Array.from(this.devices.values());
  }

  public purge(id: string) {
    this.devices.delete(id);
    starLogger.log(`Asset link purged: ${id}`);
  }
}
