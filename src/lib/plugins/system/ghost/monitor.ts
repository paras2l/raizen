import { ConnectivityStatus } from './types';

export class ConnectivityMonitor {
  private status: ConnectivityStatus = 'ONLINE';

  getStatus(): ConnectivityStatus {
    // In a real Electron app, this uses navigator.onLine or ping heuristics
    return this.status;
  }

  setMockStatus(status: ConnectivityStatus) {
    this.status = status;
    console.log(`[GHOST-MONITOR] Network status shifted to: ${status}`);
  }
}
