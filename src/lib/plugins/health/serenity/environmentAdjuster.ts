import { serenityLogger } from './serenityLogger';
import { serenityConfig } from './serenityConfig';
import { EnvironmentalState, StressLevel } from './serenityTypes';

export class EnvironmentAdjuster {
  adjustEnvironment(level: StressLevel): EnvironmentalState {
    serenityLogger.log(`Initiating proactive environmental shift for stress level: ${level}...`);

    let mode: EnvironmentalState['lightingMode'] = 'ambient';
    let filter = false;

    if (level === 'High' || level === 'Burnout-Risk') {
      mode = 'relax';
      filter = true;
      serenityLogger.environmentAdjusted('Sovereign-Relax');
    } else if (level === 'Moderate') {
      mode = 'focus';
      serenityLogger.environmentAdjusted('Sovereign-Focus');
    }

    const state: EnvironmentalState = {
      lightingMode: mode,
      soundscapeId: level === 'Burnout-Risk' ? 'nature-delta-waves' : 'white-noise-delta',
      notificationFilterActive: filter,
      temperatureTarget: level === 'High' ? 21.0 : 22.5
    };

    return state;
  }
}

export const environmentAdjuster = new EnvironmentAdjuster();
