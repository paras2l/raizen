import { EnvironmentState, TerraformingTarget } from './gaiaXTypes';
import { gaiaXLogger } from './gaiaXLogger';

export class TerraformingSessionManager {
  private currentState: EnvironmentState | null = null;
  private currentTarget: TerraformingTarget | null = null;

  public async trackState(state: EnvironmentState): Promise<void> {
    this.currentState = state;
    await gaiaXLogger.log('Current room environment state synchronized.');
  }

  public setTarget(target: TerraformingTarget): void {
    this.currentTarget = target;
    gaiaXLogger.log(`Environmental target set to [${target.mode}] mode.`);
  }

  public getCurrentState(): EnvironmentState | null {
    return this.currentState;
  }
}
