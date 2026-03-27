import { ControllableDevice, OrchestrationState } from './orchestrationTypes';
import { OrchestrationConfig } from './orchestrationConfig';

export class OrchestrationSessionManager {
  private state: OrchestrationState = {
    activeSession: null,
    seizedDevices: [],
    lastScanTimestamp: 0,
    scanRadius: OrchestrationConfig.RADIUS
  };

  public initiateSession() {
    this.state.activeSession = `GHOST_${Date.now()}`;
    return this.state.activeSession;
  }

  public trackDevice(device: ControllableDevice) {
    if (!this.state.seizedDevices.find(d => d.id === device.id)) {
        this.state.seizedDevices.push(device);
    }
  }

  public getState() {
    return { ...this.state };
  }

  public clearSession() {
    this.state.activeSession = null;
    this.state.seizedDevices = [];
  }
}
