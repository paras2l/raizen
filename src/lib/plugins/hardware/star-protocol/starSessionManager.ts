import { ConnectivityState, GlobalRelay } from './starTypes';
import { StarConfig } from './starConfig';

export class StarSessionManager {
  private state: ConnectivityState = {
    isBridged: false,
    activeRelayId: null,
    footprintLevel: 'ZERO',
    availableRelays: []
  };

  public initiateBridge(relay: GlobalRelay) {
    this.state.isBridged = true;
    this.state.activeRelayId = relay.id;
    this.state.footprintLevel = StarConfig.STEALTH_MODES.ZERO_FOOTPRINT ? 'ZERO' : 'MINIMAL';
  }

  public updateRelays(relays: GlobalRelay[]) {
    this.state.availableRelays = relays;
  }

  public getState(): ConnectivityState {
    return { ...this.state };
  }

  public closeBridge() {
    this.state.isBridged = false;
    this.state.activeRelayId = null;
  }
}
