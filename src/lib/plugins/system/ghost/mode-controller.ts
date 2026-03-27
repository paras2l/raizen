import { GhostMode } from './types';

export class OfflineModeController {
  private mode: GhostMode = 'INACTIVE';

  activate() {
    this.mode = 'AUTONOMOUS';
    console.log('[GHOST-CONTROLLER] Activating Offline Autonomous Mode. Disabling cloud dependencies.');
  }

  deactivate() {
    this.mode = 'INACTIVE';
    console.log('[GHOST-CONTROLLER] Connectivity restored. Returning to primary cloud workflows.');
  }

  getMode(): GhostMode {
    return this.mode;
  }
}
