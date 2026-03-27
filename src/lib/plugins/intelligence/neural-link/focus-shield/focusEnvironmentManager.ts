import { FocusConfig } from './focusConfig';
import { FocusState } from './focusTypes';
import { focusLogger } from './focusLogger';

export class FocusEnvironmentManager {
  private activeMode: 'STABLE' | 'DEEP_FOCUS' | 'CLUTTER_FREE' = 'STABLE';

  public async adaptEnvironment(state: FocusState): Promise<string> {
    let newMode: 'STABLE' | 'DEEP_FOCUS' | 'CLUTTER_FREE' = 'STABLE';

    if (state === 'DEEP_FOCUS' || state === 'CRITICAL_OVERLOAD') {
        newMode = 'DEEP_FOCUS';
    } else if (state === 'ELEVATED') {
        newMode = 'CLUTTER_FREE';
    }

    if (newMode !== this.activeMode) {
        this.activeMode = newMode;
        const msg = `Workspace environment transitioning to ${newMode} mode.`;
        await focusLogger.log(msg, { dimming: FocusConfig.UI.DIM_PERCENTAGE });
        
        // This would perform window blurring or CSS class addition in the real app
        // window.raizen.ui.setAura(FocusConfig.UI.AURA_MODE);
    }

    return newMode;
  }
}
