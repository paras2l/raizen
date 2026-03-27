import { RoutingMode } from './types';

export class RouteManager {
  private activeMode: RoutingMode = 'direct';

  async setMode(mode: RoutingMode) {
    this.activeMode = mode;
    console.log(`[GHOST-ROUTE] Routing mode switched to: ${mode}`);
  }

  getMode(): RoutingMode {
    return this.activeMode;
  }
}
